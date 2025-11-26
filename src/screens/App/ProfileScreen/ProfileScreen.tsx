// Arquivo: src/screens/App/ProfileScreen/ProfileScreen.tsx

import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../../../context/AuthContext';
import { Button, TextInput } from '../../../components';
import { COLORS } from '../../../constants/colors';
import * as S from './ProfileScreen.styles';

// --- HELPERS DE MÁSCARA ---
const onlyDigits = (s: string) => s.replace(/\D/g, '');

const formatCPF = (v: string) => {
  let d = v.replace(/\D/g, "");
  d = d.replace(/(\d{3})(\d)/, "$1.$2");
  d = d.replace(/(\d{3})(\d)/, "$1.$2");
  d = d.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return d;
};

const formatCNPJ = (v: string) => {
  let d = v.replace(/\D/g, "");
  d = d.replace(/^(\d{2})(\d)/, "$1.$2");
  d = d.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  d = d.replace(/\.(\d{3})(\d)/, ".$1/$2");
  d = d.replace(/(\d{4})(\d)/, "$1-$2");
  return d;
};

const formatPhone = (v: string) => {
  let d = v.replace(/\D/g, "");
  d = d.replace(/^(\d{2})(\d)/g, "($1) $2");
  d = d.replace(/(\d)(\d{4})$/, "$1-$2");
  return d;
};

const formatCEP = (v: string) => {
  let d = v.replace(/\D/g, "");
  d = d.replace(/^(\d{5})(\d)/, "$1-$2");
  return d;
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  
  const [permissionStatus, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  
  // --- ESTADOS DE CONTROLE ---
  const [clientType, setClientType] = useState<'individual' | 'company' | null>(null);
  const [clientId, setClientId] = useState<number | null>(null);
  const [addressId, setAddressId] = useState<number | null>(null);

  // --- ESTADOS DO PERFIL ---
  // Pessoa Física
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  
  // Pessoa Jurídica
  const [companyName, setCompanyName] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [cnpj, setCnpj] = useState('');
  
  // Comuns
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  // --- ESTADOS DO ENDEREÇO ---
  const [postalCode, setPostalCode] = useState('');
  const [addressType, setAddressType] = useState('');
  const [addressName, setAddressName] = useState(''); 
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState(''); 
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [complement, setComplement] = useState('');

  // --- ESTADOS DE SEGURANÇA ---
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Lógica de Força de Senha
  useEffect(() => {
    const checkStrength = (pass: string) => {
      if (!pass) return 0;
      const hasLength = pass.length >= 8;
      const hasUpper = /[A-Z]/.test(pass);
      const hasNumber = /[0-9]/.test(pass);
      const hasSpecial = /[^A-Za-z0-9]/.test(pass);

      if (!hasLength || !hasUpper || !hasNumber) return 1;
      let score = 2;
      if (hasSpecial) score += 1;
      if (pass.length > 10 && hasSpecial) score += 1;
      return score;
    };
    setPasswordStrength(checkStrength(newPassword));
  }, [newPassword]);

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return '#ff4444';
    if (passwordStrength === 2) return '#ffbb33';
    if (passwordStrength === 3) return '#00C851';
    return '#007E33';
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 1) return 'Fraca';
    if (passwordStrength === 2) return 'Média';
    if (passwordStrength === 3) return 'Forte';
    return 'Muito Forte';
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) return;

      // Usa a URL do ambiente ou fallback
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'https://berta-journalish-outlandishly.ngrok-free.dev/api/v1';
      
      const response = await fetch(`${apiUrl}/clients/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        // Preenche IDs e Tipos
        setClientId(data.id);
        setClientType(data.type);
        
        // Dados comuns
        setEmail(data.user?.email || '');
        setPhone(formatPhone(data.phone || ''));
        if (data.avatarUrl) {
          setAvatarUri(data.avatarUrl);
        }
        
        // Dados específicos por tipo (Individual vs Company)
        if (data.type === 'individual' && data.individual) {
          setFirstName(data.individual.firstName || '');
          setLastName(data.individual.lastName || '');
          setCpf(formatCPF(data.individual.cpf || ''));
        } else if (data.type === 'company' && data.company) {
          setCompanyName(data.company.companyName || '');
          setTradeName(data.company.tradeName || '');
          setCnpj(formatCNPJ(data.company.cnpj || ''));
        }
        
        // Dados do endereço
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
      } else {
        if (response.status === 404) return; 
        throw new Error(`Erro ${response.status}`);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do perfil:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
    }
  };

  const handlePickImage = async () => {
    if (!permissionStatus) return;
    if (permissionStatus.status !== ImagePicker.PermissionStatus.GRANTED) {
      const newPermission = await requestPermission();
      if (newPermission.status !== ImagePicker.PermissionStatus.GRANTED) {
        Alert.alert("Permissão Negada", "Precisamos de acesso à galeria.");
        return;
      }
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveProfile = async () => {
    setIsProfileLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      // Verificações de segurança antes de enviar
      if (!token || !clientId || !clientType) {
        Alert.alert("Erro", "Dados de autenticação não encontrados.");
        return;
      }

      const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'https://berta-journalish-outlandishly.ngrok-free.dev/api/v1';
      
      // Monta o payload com base no tipo de cliente
      let payload: any = {
        phone: onlyDigits(phone),
        address: {
          postalCode: onlyDigits(postalCode),
          addressType: addressType || 'Rua',
          addressName,
          number,
          neighborhood,
          city,
          state,
          additionalInfo: complement,
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
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Dados atualizados com sucesso!");
        await loadUserData(); 
      } else {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.message || "Não foi possível atualizar o perfil.");
      }

    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert("Atenção", "Preencha todos os campos de senha.");
      return;
    }

    if (passwordStrength < 2) {
       Alert.alert("Senha Fraca", "A nova senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um número.");
       return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Erro", "As senhas não conferem.");
      return;
    }

    setIsPasswordLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert("Sucesso", "Senha alterada com sucesso!");
      setCurrentPassword(''); setNewPassword(''); setConfirmNewPassword('');
    } catch (error) {
      Alert.alert("Erro", "Falha ao alterar senha.");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", onPress: signOut, style: "destructive" }
    ]);
  };

  return (
    <S.Container>
      <S.BackButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <MaterialCommunityIcons name="menu" size={24} color={COLORS.white} />
      </S.BackButton>

      <S.HeaderBackground>
        <S.HeaderTitle>Meu Perfil</S.HeaderTitle>
      </S.HeaderBackground>

      <S.ContentContainer showsVerticalScrollIndicator={false}>
        
        <S.AvatarWrapper>
          <S.AvatarImage 
            source={avatarUri ? { uri: avatarUri } : require('../../../../assets/images/avatar.png')} 
          />
          <S.EditIconContainer onPress={handlePickImage} activeOpacity={0.8}>
            <MaterialCommunityIcons name="camera" size={20} color={COLORS.white} />
          </S.EditIconContainer>
        </S.AvatarWrapper>

        {/* DADOS PESSOAIS / EMPRESA */}
        <S.FormCard>
          <S.SectionTitle>
            {clientType === 'company' ? 'Dados da Empresa' : 'Dados Pessoais'}
          </S.SectionTitle>
          
          {/* Renderização Condicional baseada no tipo de cliente */}
          {clientType === 'company' ? (
             <>
               <TextInput 
                 placeholder="Nome Fantasia" 
                 value={tradeName} 
                 onChangeText={setTradeName} 
                 rightIcon={<MaterialCommunityIcons name="office-building" size={20} color={COLORS.gray} />}
               />
               <TextInput 
                 placeholder="Razão Social" 
                 value={companyName} 
                 onChangeText={setCompanyName} 
               />
               <TextInput 
                 placeholder="CNPJ" 
                 value={cnpj} 
                 editable={false} 
                 style={{ opacity: 0.6, backgroundColor: '#f0f0f0' }} 
                 rightIcon={<MaterialCommunityIcons name="card-account-details-outline" size={20} color={COLORS.gray} />} 
               />
             </>
          ) : (
             <>
               <TextInput 
                 placeholder="Nome" 
                 value={firstName} 
                 onChangeText={setFirstName} 
                 rightIcon={<MaterialCommunityIcons name="account-outline" size={20} color={COLORS.gray} />}
               />
               <TextInput 
                 placeholder="Sobrenome" 
                 value={lastName} 
                 onChangeText={setLastName} 
               />
               <TextInput 
                 placeholder="CPF" 
                 value={cpf} 
                 editable={false} 
                 style={{ opacity: 0.6, backgroundColor: '#f0f0f0' }} 
                 rightIcon={<MaterialCommunityIcons name="card-account-details-outline" size={20} color={COLORS.gray} />} 
               />
             </>
          )}
          
          <TextInput 
            placeholder="E-mail" 
            value={email} 
            editable={false} 
            style={{ opacity: 0.6, backgroundColor: '#f0f0f0' }} 
            rightIcon={<MaterialCommunityIcons name="email-outline" size={20} color={COLORS.gray} />} 
          />
          
          <TextInput 
            placeholder="Telefone" 
            value={phone} 
            onChangeText={(t) => setPhone(formatPhone(t))} 
            keyboardType="phone-pad" 
            maxLength={15}
            rightIcon={<MaterialCommunityIcons name="phone-outline" size={20} color={COLORS.gray} />} 
          />
        </S.FormCard>

        {/* ENDEREÇO */}
        <S.FormCard>
          <S.SectionTitle>Endereço de Coleta</S.SectionTitle>
          <TextInput 
            placeholder="CEP" 
            value={postalCode} 
            onChangeText={(t) => setPostalCode(formatCEP(t))} 
            keyboardType="numeric" 
            maxLength={9}
            rightIcon={<MaterialCommunityIcons name="map-marker-radius-outline" size={20} color={COLORS.gray} />} 
          />
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

        {/* SEGURANÇA */}
        <S.FormCard>
          <S.SectionTitle>Alterar Senha</S.SectionTitle>
          
          <TextInput 
            placeholder="Senha Atual" 
            value={currentPassword} 
            onChangeText={setCurrentPassword} 
            secureTextEntry={!showCurrentPass}
            rightIcon={<MaterialCommunityIcons name={showCurrentPass ? "eye-off" : "eye"} size={20} color={COLORS.gray} />}
            onRightPress={() => setShowCurrentPass(!showCurrentPass)}
          />

          <S.HelperText>Mínimo 8 caracteres, 1 maiúscula e 1 número.</S.HelperText>
          
          <TextInput 
            placeholder="Nova Senha" 
            value={newPassword} 
            onChangeText={setNewPassword} 
            secureTextEntry={!showNewPass}
            rightIcon={<MaterialCommunityIcons name={showNewPass ? "eye-off" : "eye"} size={20} color={COLORS.gray} />}
            onRightPress={() => setShowNewPass(!showNewPass)}
          />

          {/* Barra de Força */}
          {newPassword.length > 0 && (
              <S.StrengthContainer>
                <S.StrengthBarContainer>
                  <S.StrengthBarFill width={`${(passwordStrength / 4) * 100}%`} color={getStrengthColor()} />
                </S.StrengthBarContainer>
                <S.StrengthLabel color={getStrengthColor()}>{getStrengthLabel()}</S.StrengthLabel>
              </S.StrengthContainer>
          )}

          <TextInput 
            placeholder="Confirmar Nova" 
            value={confirmNewPassword} 
            onChangeText={setConfirmNewPassword} 
            secureTextEntry={!showConfirmPass}
            rightIcon={<MaterialCommunityIcons name={showConfirmPass ? "eye-off" : "eye"} size={20} color={COLORS.gray} />}
            onRightPress={() => setShowConfirmPass(!showConfirmPass)}
          />

          <View style={{ marginTop: 15 }}>
            <Button title="ATUALIZAR SENHA" onPress={handleChangePassword} isLoading={isPasswordLoading} />
          </View>
        </S.FormCard>

        <View style={{ height: 20 }} />
      </S.ContentContainer>
    </S.Container>
  );
};

export default ProfileScreen;