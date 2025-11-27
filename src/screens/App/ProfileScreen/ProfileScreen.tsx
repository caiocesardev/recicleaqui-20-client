// Arquivo: src/screens/App/ProfileScreen/ProfileScreen.tsx

import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components/native';

import { useAuth } from '../../../context/AuthContext';
import { Button, TextInput } from '../../../components';
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
  const [addressType, setAddressType] = useState('');
  const [addressName, setAddressName] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [complement, setComplement] = useState('');

  const [isProfileLoading, setIsProfileLoading] = useState(false);

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
        if (data.avatarUrl) setAvatarUri(data.avatarUrl);

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
          setAddressType(data.address.addressType || '');
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

  const handlePickImage = async () => {
    if (!permissionStatus) return;
    if (permissionStatus.status !== ImagePicker.PermissionStatus.GRANTED) {
      const newPermission = await requestPermission();
      if (newPermission.status !== ImagePicker.PermissionStatus.GRANTED) return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.canceled) setAvatarUri(result.assets[0].uri);
    } catch (error) { console.error(error); }
  };

  const handleSaveProfile = async () => {
    setIsProfileLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token || !clientId || !clientType) return;
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || '';

      let payload: any = {
        phone: onlyDigits(phone),
        address: {
          postalCode: onlyDigits(postalCode),
          addressType: addressType || 'Rua',
          addressName, number, neighborhood, city, state, additionalInfo: complement,
        },
      };

      let endpoint = '';
      if (clientType === 'individual') {
        endpoint = `/clients/individual/${clientId}`;
        payload.firstName = firstName;
        payload.lastName = lastName;
      } else if (clientType === 'company') {
        endpoint = `/clients/company/${clientId}`;
        payload.companyName = companyName;
        payload.tradeName = tradeName;
      }

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Dados atualizados!");
        loadUserData();
      } else {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.message || "Erro ao atualizar.");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro de conexão.");
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
              <TextInput placeholder="Nome Fantasia" value={tradeName} onChangeText={setTradeName} rightIcon={<MaterialCommunityIcons name="office-building" size={20} color={theme.colors.textLight} />} />
              <TextInput placeholder="Razão Social" value={companyName} onChangeText={setCompanyName} />
              <TextInput 
                placeholder="CNPJ" value={cnpj} editable={false} 
                style={{ backgroundColor: theme.colors.background, opacity: 0.7 }}
                rightIcon={<MaterialCommunityIcons name="card-account-details-outline" size={20} color={theme.colors.textLight} />} 
              />
            </>
          ) : (
            <>
              <TextInput placeholder="Nome" value={firstName} onChangeText={setFirstName} rightIcon={<MaterialCommunityIcons name="account-outline" size={20} color={theme.colors.textLight} />} />
              <TextInput placeholder="Sobrenome" value={lastName} onChangeText={setLastName} />
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
          <TextInput placeholder="Telefone" value={phone} onChangeText={(t) => setPhone(formatPhone(t))} keyboardType="phone-pad" maxLength={15} rightIcon={<MaterialCommunityIcons name="phone-outline" size={20} color={theme.colors.textLight} />} />
        </S.FormCard>

        <S.FormCard>
          <S.SectionTitle>Endereço de Coleta</S.SectionTitle>
          <TextInput placeholder="CEP" value={postalCode} onChangeText={(t) => setPostalCode(formatCEP(t))} keyboardType="numeric" rightIcon={<MaterialCommunityIcons name="map-marker-radius-outline" size={20} color={theme.colors.textLight} />} />
          <S.Row>
            <S.Col flex={3}><TextInput placeholder="Rua" value={addressName} onChangeText={setAddressName} /></S.Col>
            <S.Col flex={1}><TextInput placeholder="Nº" value={number} onChangeText={setNumber} /></S.Col>
          </S.Row>
          <TextInput placeholder="Bairro" value={neighborhood} onChangeText={setNeighborhood} />
          <TextInput placeholder="Complemento" value={complement} onChangeText={setComplement} />
          <S.Row>
            <S.Col flex={3}><TextInput placeholder="Cidade" value={city} onChangeText={setCity} /></S.Col>
            <S.Col flex={1}><TextInput placeholder="UF" value={state} onChangeText={setState} maxLength={2} autoCapitalize="characters" /></S.Col>
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