// Arquivo: src/screens/App/ProfileScreen/ProfileScreen.tsx

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components/native';

import { useAuth } from '../../../context/AuthContext';
import { Button, TextInput, useToast } from '../../../components';
import * as S from './ProfileScreen.styles';

// --- HELPERS ---
const onlyDigits = (s: string) => s.replace(/\D/g, '');
const formatCPF = (v: string) => v.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
const formatCNPJ = (v: string) => v.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2");
const formatPhone = (v: string) => v.replace(/\D/g, "").replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d)(\d{4})$/, "$1-$2");
const formatCEP = (v: string) => v.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme(); 
  const [permissionStatus, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const { showToast } = useToast();

  const [clientType, setClientType] = useState<'individual' | 'company' | null>(null);
  const [clientId, setClientId] = useState<number | null>(null);
  const [addressId, setAddressId] = useState<number | null>(null);

  // Estados de Dados
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  // Estados Endereço
  const [postalCode, setPostalCode] = useState('');
  const [addressName, setAddressName] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [complement, setComplement] = useState('');

  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cepData, setCepData] = useState<{ city: string; state: string; neighborhood?: string } | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) return;
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'https://berta-journalish-outlandishly.ngrok-free.dev/api/v1';

      const response = await fetch(`${apiUrl}/clients/me`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setClientId(data.id);
        setClientType(data.type);
        setEmail(data.user?.email || '');
        setPhone(formatPhone(data.phone || ''));
        
        // Constrói URL completa do avatar
        if (data.avatarUrl) {
          let fullAvatarUrl = data.avatarUrl;
          if (!fullAvatarUrl.startsWith('http')) {
            const baseUrl = apiUrl.replace('/api/v1', '');
            fullAvatarUrl = `${baseUrl}${fullAvatarUrl.startsWith('/') ? '' : '/'}${fullAvatarUrl}`;
          }
          console.log('Avatar carregado:', fullAvatarUrl);
          setAvatarUri(fullAvatarUrl);
        }

        if (data.type === 'individual' && data.individual) {
          setFirstName(data.individual.firstName || '');
          setLastName(data.individual.lastName || '');
          setCpf(formatCPF(data.individual.cpf || ''));
        } else if (data.type === 'company' && data.company) {
          setCompanyName(data.company.companyName || '');
          setTradeName(data.company.tradeName || '');
          setCnpj(formatCNPJ(data.company.cnpj || ''));
        }

        if (data.address) {
          setAddressId(data.address.id);
          setPostalCode(formatCEP(data.address.postalCode || ''));
          setAddressName(data.address.addressName || '');
          setNumber(data.address.number || '');
          setNeighborhood(data.address.neighborhood || '');
          setCity(data.address.city || '');
          setState(data.address.state || '');
          setComplement(data.address.additionalInfo || '');
        }
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  const fetchAddressByCEP = async (cep: string) => {
    const digits = onlyDigits(cep);
    if (digits.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      if (response.ok) {
        const data = await response.json();
        if (data.erro) {
          showToast('error', 'CEP não encontrado.');
          setCepData(null);
          return;
        }
        
        // Preenche automaticamente os campos
        if (data.localidade) setCity(data.localidade);
        if (data.uf) setState(data.uf.toUpperCase());
        if (data.bairro) setNeighborhood(data.bairro);
        if (data.logradouro) setAddressName(data.logradouro);
        
        // Armazena dados do CEP para validação posterior
        setCepData({
          city: data.localidade || '',
          state: data.uf?.toUpperCase() || '',
          neighborhood: data.bairro || undefined,
        });
        
        showToast('success', 'Endereço preenchido automaticamente!');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const handlePickImage = async () => {
    if (!permissionStatus) return;
    if (permissionStatus.status !== ImagePicker.PermissionStatus.GRANTED) {
      const newPermission = await requestPermission();
      if (newPermission.status !== ImagePicker.PermissionStatus.GRANTED) return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], // Fix: usar array ao invés de MediaTypeOptions (deprecated)
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        // Mostra preview local imediatamente
        setAvatarUri(uri);
        // Salva no servidor
        await handleSaveAvatar(uri);
      }
    } catch (error) { console.error(error); }
  };

  const handleSaveAvatar = async (uri: string) => {
    if (!uri || !clientId) return;
    
    try {
      const token = await AsyncStorage.getItem('authToken');
      const rawBase = process.env.EXPO_PUBLIC_API_URL || '';
      const apiUrl = rawBase.replace(/\/$/,'') || 'https://berta-journalish-outlandishly.ngrok-free.dev/api/v1';
      
      // Prepara FormData
      const formData = new FormData();
      const filename = uri.split('/').pop() || 'avatar.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';
      
      formData.append('avatar', {
        uri,
        name: filename,
        type,
      } as any);

      const response = await fetch(`${apiUrl}/clients/${clientId}/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        
        // Constrói URL completa do avatar
        let fullAvatarUrl = data.avatarUrl;
        if (fullAvatarUrl && !fullAvatarUrl.startsWith('http')) {
          // Se for caminho relativo, adiciona base URL
          const baseUrl = apiUrl.replace('/api/v1', '');
          fullAvatarUrl = `${baseUrl}${fullAvatarUrl.startsWith('/') ? '' : '/'}${fullAvatarUrl}`;
        }
        setAvatarUri(fullAvatarUrl);
        showToast('success', 'Avatar atualizado!');
        
        // Recarrega dados para atualizar no HomeScreen
        await loadUserData();
      } else {
        const errorData = await response.json().catch(() => ({}));
        showToast('error', errorData.message || 'Falha ao enviar avatar.');
      }
    } catch (error) {
      console.error('Erro ao salvar avatar:', error);
      showToast('error', 'Erro de conexão ao salvar avatar.');
    }
  };

  /**
   * Salva o perfil do usuário com validações abrangentes
   * Valida:
   * - Campos obrigatórios por tipo (PF: nome/sobrenome, PJ: razão social)
   * - Telefone (min 10 dígitos)
   * - CEP (8 dígitos exatos)
   * - UF (27 estados válidos)
   * - Endereço completo (nome, número, bairro, cidade)
   * - Consistência CEP x Cidade/UF (se dados ViaCEP disponíveis)
   */
  const handleSaveProfile = async () => {
    setIsProfileLoading(true);
    setErrors({});
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token || !clientId || !clientType) return;
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || '';

      // Validações locais essenciais
      const phoneDigits = onlyDigits(phone);
      const cepDigits = onlyDigits(postalCode);
      const uf = (state || '').trim().toUpperCase();
      const tFirstName = (firstName || '').trim();
      const tLastName = (lastName || '').trim();
      const tTradeName = (tradeName || '').trim();
      const tCompanyName = (companyName || '').trim();
      const tAddressName = (addressName || '').trim();
      const tNeighborhood = (neighborhood || '').trim();
      const tCity = (city || '').trim();
      const addressNumberDigits = onlyDigits(number || '');

      const validUF = [
        'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
        'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
      ];

      // Obrigatórios por tipo de cliente
      if (clientType === 'individual') {
        if (!tFirstName || tFirstName.length < 2 || !tLastName || tLastName.length < 2) {
          setErrors((e) => ({
            ...e,
            firstName: !tFirstName || tFirstName.length < 2 ? 'Informe seu nome (mín. 2 caracteres).' : '',
            lastName: !tLastName || tLastName.length < 2 ? 'Informe seu sobrenome (mín. 2 caracteres).' : '',
          }));
          showToast('error', 'Preencha nome e sobrenome válidos.');
          setIsProfileLoading(false);
          return;
        }
      } else if (clientType === 'company') {
        if (!tTradeName && !tCompanyName) {
          setErrors((e) => ({
            ...e,
            tradeName: 'Informe nome fantasia ou razão social.',
            companyName: 'Informe razão social ou nome fantasia.',
          }));
          showToast('error', 'Preencha nome fantasia ou razão social.');
          setIsProfileLoading(false);
          return;
        }
      }

      if (!phoneDigits || phoneDigits.length < 10) {
        setErrors((e) => ({ ...e, phone: 'Informe um telefone válido (DDD + número).' }));
        showToast('error', 'Telefone inválido.');
        setIsProfileLoading(false);
        return;
      }

      if (!cepDigits || cepDigits.length !== 8) {
        setErrors((e) => ({ ...e, postalCode: 'Informe um CEP válido (8 dígitos).' }));
        showToast('error', 'CEP inválido.');
        setIsProfileLoading(false);
        return;
      }

      if (!/^[A-Z]{2}$/.test(uf) || !validUF.includes(uf)) {
        setErrors((e) => ({ ...e, state: 'Informe uma UF válida (ex: SP, RJ).' }));
        showToast('error', 'UF inválida.');
        setIsProfileLoading(false);
        return;
      }

      // Validações de endereço
      if (!tAddressName || tAddressName.length < 3) {
        setErrors((e) => ({ ...e, addressName: 'Informe o logradouro (mín. 3 caracteres).' }));
        showToast('error', 'Logradouro inválido.');
        setIsProfileLoading(false);
        return;
      }
      if (!addressNumberDigits) {
        setErrors((e) => ({ ...e, number: 'Informe o número do endereço.' }));
        showToast('error', 'Número do endereço inválido.');
        setIsProfileLoading(false);
        return;
      }
      if (!tNeighborhood || tNeighborhood.length < 2) {
        setErrors((e) => ({ ...e, neighborhood: 'Informe o bairro (mín. 2 caracteres).' }));
        showToast('error', 'Bairro inválido.');
        setIsProfileLoading(false);
        return;
      }
      if (!tCity || tCity.length < 2 || !/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(tCity)) {
        setErrors((e) => ({ ...e, city: 'Informe uma cidade válida.' }));
        showToast('error', 'Cidade inválida.');
        setIsProfileLoading(false);
        return;
      }

      // Validação de consistência CEP x Cidade/UF
      if (cepData) {
        const cityMatch = tCity.toLowerCase().trim() === cepData.city.toLowerCase().trim();
        const stateMatch = uf === cepData.state;
        
        if (!cityMatch || !stateMatch) {
          const wrongFields: string[] = [];
          if (!cityMatch) {
            setErrors((e) => ({ ...e, city: `Cidade não corresponde ao CEP (esperado: ${cepData.city}).` }));
            wrongFields.push('cidade');
          }
          if (!stateMatch) {
            setErrors((e) => ({ ...e, state: `UF não corresponde ao CEP (esperado: ${cepData.state}).` }));
            wrongFields.push('UF');
          }
          showToast('error', `${wrongFields.join(' e ')} não corresponde${wrongFields.length > 1 ? 'm' : ''} ao CEP informado.`);
          setIsProfileLoading(false);
          return;
        }
      }

      let payload: any = {
        phone: phoneDigits,
        address: {
          postalCode: cepDigits,
          addressName: tAddressName,
          number: addressNumberDigits,
          neighborhood: tNeighborhood,
          city: tCity,
          state: uf,
          additionalInfo: (complement || '').trim(),
        },
      };

      let endpoint = '';
      if (clientType === 'individual') {
        endpoint = `/clients/individual/${clientId}`;
        payload.firstName = tFirstName;
        payload.lastName = tLastName;
      } else if (clientType === 'company') {
        endpoint = `/clients/company/${clientId}`;
        payload.companyName = tCompanyName;
        payload.tradeName = tTradeName;
      }

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showToast('success', 'Dados atualizados!');
        loadUserData();
      } else {
        const errorData = await response.json().catch(() => ({}));
        // Se houver erros de validação por campo, mapeia
        const fieldErrors: Record<string, string> = {};
        const map = (obj: any, prefix: string = '') => {
          if (!obj || typeof obj !== 'object') return;
          Object.keys(obj).forEach((k) => {
            const key = prefix ? `${prefix}.${k}` : k;
            const val = obj[k];
            if (typeof val === 'string') fieldErrors[key] = val;
            else if (typeof val === 'object') map(val, key);
          });
        };
        if (errorData.errors) map(errorData.errors);

        setErrors({
          firstName: fieldErrors['firstName'] || '',
          lastName: fieldErrors['lastName'] || '',
          companyName: fieldErrors['companyName'] || '',
          tradeName: fieldErrors['tradeName'] || '',
          phone: fieldErrors['phone'] || '',
          postalCode: fieldErrors['address.postalCode'] || fieldErrors['postalCode'] || '',
          addressName: fieldErrors['address.addressName'] || fieldErrors['addressName'] || '',
          number: fieldErrors['address.number'] || fieldErrors['number'] || '',
          neighborhood: fieldErrors['address.neighborhood'] || fieldErrors['neighborhood'] || '',
          city: fieldErrors['address.city'] || fieldErrors['city'] || '',
          state: fieldErrors['address.state'] || fieldErrors['state'] || '',
          complement: fieldErrors['address.additionalInfo'] || fieldErrors['additionalInfo'] || '',
        });

        showToast('error', errorData.message || 'Corrija os campos destacados.');
      }
    } catch (error) {
      showToast('error', 'Erro de conexão.');
    } finally {
      setIsProfileLoading(false);
    }
  };

  return (
    <S.Container>
      <S.ContentContainer showsVerticalScrollIndicator={false}>
        
        <View style={{ position: 'relative' }}>
          <S.HeaderBackground>
            <S.HeaderTitle>Meu Perfil</S.HeaderTitle>
          </S.HeaderBackground>
          
          <S.MenuButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MaterialCommunityIcons name="menu" size={24} color={theme.colors.white} />
          </S.MenuButton>
        </View>

        <S.AvatarWrapper>
          <S.AvatarImage
            key={avatarUri || 'default-avatar'}
            source={avatarUri ? { uri: avatarUri } : require('../../../../assets/images/avatar.png')}
          />
          <S.EditIconContainer onPress={handlePickImage} activeOpacity={0.8}>
            <MaterialCommunityIcons name="camera" size={20} color={theme.colors.white} />
          </S.EditIconContainer>
        </S.AvatarWrapper>

        <S.FormCard>
          <S.SectionTitle>
            {clientType === 'company' ? 'Dados da Empresa' : 'Dados Pessoais'}
          </S.SectionTitle>

          {clientType === 'company' ? (
            <>
              <TextInput placeholder="Nome Fantasia" value={tradeName} onChangeText={(t)=>{setTradeName(t); setErrors((e)=>({...e, tradeName:''}));}} error={errors.tradeName} autoCapitalize="words" rightIcon={<MaterialCommunityIcons name="office-building" size={20} color={theme.colors.textLight} />} />
              <TextInput placeholder="Razão Social" value={companyName} onChangeText={(t)=>{setCompanyName(t); setErrors((e)=>({...e, companyName:''}));}} error={errors.companyName} autoCapitalize="words" />
              <TextInput 
                placeholder="CNPJ" value={cnpj} editable={false} 
                style={{ backgroundColor: theme.colors.background, opacity: 0.7 }}
                rightIcon={<MaterialCommunityIcons name="card-account-details-outline" size={20} color={theme.colors.textLight} />} 
              />
            </>
          ) : (
            <>
              <TextInput placeholder="Nome" value={firstName} onChangeText={(t)=>{setFirstName(t); setErrors((e)=>({...e, firstName:''}));}} error={errors.firstName} autoCapitalize="words" rightIcon={<MaterialCommunityIcons name="account-outline" size={20} color={theme.colors.textLight} />} />
              <TextInput placeholder="Sobrenome" value={lastName} onChangeText={(t)=>{setLastName(t); setErrors((e)=>({...e, lastName:''}));}} error={errors.lastName} autoCapitalize="words" />
              <TextInput 
                placeholder="CPF" value={cpf} editable={false}
                style={{ backgroundColor: theme.colors.background, opacity: 0.7 }}
                rightIcon={<MaterialCommunityIcons name="card-account-details-outline" size={20} color={theme.colors.textLight} />} 
              />
            </>
          )}

          <TextInput 
            placeholder="E-mail" value={email} editable={false}
            style={{ backgroundColor: theme.colors.background, opacity: 0.7 }}
            rightIcon={<MaterialCommunityIcons name="email-outline" size={20} color={theme.colors.textLight} />} 
          />
          <TextInput placeholder="Telefone" value={phone} onChangeText={(t) => {setPhone(formatPhone(t)); setErrors((e)=>({...e, phone:''}));}} error={errors.phone} keyboardType="phone-pad" maxLength={15} rightIcon={<MaterialCommunityIcons name="phone-outline" size={20} color={theme.colors.textLight} />} />
        </S.FormCard>

        <S.FormCard>
          <S.SectionTitle>Endereço de Coleta</S.SectionTitle>
          <TextInput 
            placeholder="CEP" 
            value={postalCode} 
            onChangeText={(t) => {
              const formatted = formatCEP(t);
              setPostalCode(formatted);
              setErrors((e)=>({...e, postalCode:''}));
              // Busca endereço quando CEP estiver completo
              if (onlyDigits(formatted).length === 8) {
                fetchAddressByCEP(formatted);
              }
            }} 
            error={errors.postalCode} 
            keyboardType="numeric" 
            maxLength={9} 
            rightIcon={<MaterialCommunityIcons name="map-marker-radius-outline" size={20} color={theme.colors.textLight} />} 
          />
          <S.Row>
            <S.Col flex={3}><TextInput placeholder="Rua" value={addressName} onChangeText={(t)=>{setAddressName(t); setErrors((e)=>({...e, addressName:''}));}} error={errors.addressName} autoCapitalize="words" /></S.Col>
            <S.Col flex={1}><TextInput placeholder="Nº" value={number} onChangeText={(t)=>{setNumber(onlyDigits(t)); setErrors((e)=>({...e, number:''}));}} error={errors.number} keyboardType="numeric" maxLength={6} /></S.Col>
          </S.Row>
          <TextInput placeholder="Bairro" value={neighborhood} onChangeText={(t)=>{setNeighborhood(t); setErrors((e)=>({...e, neighborhood:''}));}} error={errors.neighborhood} autoCapitalize="words" />
          <TextInput placeholder="Complemento" value={complement} onChangeText={(t)=>{setComplement(t); setErrors((e)=>({...e, complement:''}));}} error={errors.complement} />
          <S.Row>
            <S.Col flex={3}><TextInput placeholder="Cidade" value={city} onChangeText={(t)=>{setCity(t); setErrors((e)=>({...e, city:''}));}} error={errors.city} autoCapitalize="words" /></S.Col>
            <S.Col flex={1}><TextInput placeholder="UF" value={state} onChangeText={(t)=>{setState(t); setErrors((e)=>({...e, state:''}));}} error={errors.state} maxLength={2} autoCapitalize="characters" /></S.Col>
          </S.Row>
          <View style={{ marginTop: 15 }}>
            <Button title="SALVAR DADOS" onPress={handleSaveProfile} isLoading={isProfileLoading} />
          </View>
        </S.FormCard>
      </S.ContentContainer>
    </S.Container>
  );
};

export default ProfileScreen;