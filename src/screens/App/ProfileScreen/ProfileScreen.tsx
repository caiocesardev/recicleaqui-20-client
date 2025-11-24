// Arquivo: src/screens/App/ProfileScreen/ProfileScreen.tsx

import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../../context/AuthContext';
import { Button, TextInput } from '../../../components';
import * as S from './ProfileScreen.styles';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  
  const [permissionStatus, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const [postalCode, setPostalCode] = useState('');
  const [addressName, setAddressName] = useState(''); 
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState(''); 
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [complement, setComplement] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  

  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);


  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    // Dados Mockados
    setFirstName("Caio");
    setLastName("César");
    setEmail("caiocesar.vec@gmail.com");
    setPhone("(11) 99999-9999");
    setCpf("123.456.789-00");
    
    setPostalCode("01001-000");
    setAddressName("Av. Paulista");
    setNumber("1000");
    setNeighborhood("Bela Vista");
    setCity("São Paulo");
    setState("SP");
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Lógica: PUT /clients/me
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleChangePassword = async () => {
    // Validações Locais
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert("Atenção", "Preencha todos os campos de senha.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Atenção", "A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Erro", "A nova senha e a confirmação não conferem.");
      return;
    }

    setIsPasswordLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Lógica: POST /auth/change-password
      
      Alert.alert("Sucesso", "Senha alterada com sucesso!");
      
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      Alert.alert("Erro", "Senha atual incorreta ou falha no servidor.");
    } finally {
      setIsPasswordLoading(false);
    }
  };


  return (
    <S.Container>
      <S.BackButton onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
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
            <MaterialCommunityIcons name="camera" size={20} color="white" />
          </S.EditIconContainer>
        </S.AvatarWrapper>

        <S.FormCard>
          <S.SectionTitle>Dados Pessoais</S.SectionTitle>
          
          <TextInput 
            placeholder="Nome" 
            value={firstName} 
            onChangeText={setFirstName} 
            rightIcon={<MaterialCommunityIcons name="account-outline" size={20} color="#ccc" />}
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
            rightIcon={<MaterialCommunityIcons name="card-account-details-outline" size={20} color="#ccc" />}
          />

          <TextInput 
            placeholder="E-mail" 
            value={email} 
            editable={false}
            style={{ opacity: 0.6, backgroundColor: '#f0f0f0' }}
            rightIcon={<MaterialCommunityIcons name="email-outline" size={20} color="#ccc" />}
          />

          <TextInput 
            placeholder="Telefone" 
            value={phone} 
            onChangeText={setPhone} 
            keyboardType="phone-pad"
            rightIcon={<MaterialCommunityIcons name="phone-outline" size={20} color="#ccc" />}
          />
        </S.FormCard>

        <S.FormCard>
          <S.SectionTitle>Endereço de Coleta</S.SectionTitle>
          
          <TextInput 
            placeholder="CEP" 
            value={postalCode} 
            onChangeText={setPostalCode} 
            keyboardType="numeric"
            rightIcon={<MaterialCommunityIcons name="map-marker-radius-outline" size={20} color="#ccc" />}
          />

          <S.Row>
            <S.Col flex={3}>
              <TextInput placeholder="Rua" value={addressName} onChangeText={setAddressName} />
            </S.Col>
            <S.Col flex={1}>
              <TextInput placeholder="Nº" value={number} onChangeText={setNumber} />
            </S.Col>
          </S.Row>

          <TextInput placeholder="Bairro" value={neighborhood} onChangeText={setNeighborhood} />
          <TextInput placeholder="Complemento (Opcional)" value={complement} onChangeText={setComplement} />

          <S.Row>
            <S.Col flex={3}>
              <TextInput placeholder="Cidade" value={city} onChangeText={setCity} />
            </S.Col>
            <S.Col flex={1}>
              <TextInput placeholder="UF" value={state} onChangeText={setState} maxLength={2} autoCapitalize="characters" />
            </S.Col>
          </S.Row>

          <View style={{ marginTop: 15 }}>
            <Button title="SALVAR DADOS" onPress={handleSaveProfile} isLoading={isProfileLoading} />
          </View>
        </S.FormCard>

        <S.FormCard>
          <S.SectionTitle>Alterar Senha</S.SectionTitle>
          
          <TextInput 
            placeholder="Senha Atual" 
            value={currentPassword} 
            onChangeText={setCurrentPassword} 
            secureTextEntry={!showCurrentPass}
            rightIcon={<MaterialCommunityIcons name={showCurrentPass ? "eye-off" : "eye"} size={20} color="#ccc" />}
            onRightPress={() => setShowCurrentPass(!showCurrentPass)}
          />

          <TextInput 
            placeholder="Nova Senha" 
            value={newPassword} 
            onChangeText={setNewPassword} 
            secureTextEntry={!showNewPass}
            rightIcon={<MaterialCommunityIcons name={showNewPass ? "eye-off" : "eye"} size={20} color="#ccc" />}
            onRightPress={() => setShowNewPass(!showNewPass)}
          />

          <TextInput 
            placeholder="Confirmar Nova Senha" 
            value={confirmNewPassword} 
            onChangeText={setConfirmNewPassword} 
            secureTextEntry={!showConfirmPass}
            rightIcon={<MaterialCommunityIcons name={showConfirmPass ? "eye-off" : "eye"} size={20} color="#ccc" />}
            onRightPress={() => setShowConfirmPass(!showConfirmPass)}
          />

          <View style={{ marginTop: 15 }}>
            <Button 
              title="ATUALIZAR SENHA" 
              onPress={handleChangePassword} 
              isLoading={isPasswordLoading} 
              style={{ backgroundColor: '#555' }} 
            />
          </View>
        </S.FormCard>

        <View style={{ height: 20 }} />
      </S.ContentContainer>
    </S.Container>
  );
};

export default ProfileScreen;