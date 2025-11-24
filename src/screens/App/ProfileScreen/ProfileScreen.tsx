// Arquivo: src/screens/App/ProfileScreen/ProfileScreen.tsx

import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext';
import { Button, TextInput } from '../../../components';
import * as S from './ProfileScreen.styles';

const ProfileScreen = () => {
  const navigation = useNavigation();

  // Estados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Carregar dados iniciais 
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setName("Caio");
    setEmail("caiocesar.vec@gmail.com");
    setPhone("(11) 99999-9999");
  };

  // Função para escolher foto
  const handlePickImage = async () => {
    // Pede permissão e abre a galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], 
      quality: 0.5,  
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulação de envio para API
      await new Promise(resolve => setTimeout(resolve, 1500));



      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair da conta?", [
      { text: "Cancelar", style: "cancel" },
    ]);
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
            source={
              avatarUri
                ? { uri: avatarUri } 
                : require('../../../../assets/images/avatar.png') 
            }
          />
          <S.EditIconContainer onPress={handlePickImage}>
            <MaterialCommunityIcons name="camera" size={20} color="white" />
          </S.EditIconContainer>
        </S.AvatarWrapper>

        <S.FormCard>
          <S.SectionTitle>Dados da Conta</S.SectionTitle>

          <TextInput
            placeholder="Nome Completo"
            value={name}
            onChangeText={setName}
            rightIcon={<MaterialCommunityIcons name="pencil" size={18} color="#ccc" />}
          />

          <TextInput
            placeholder="E-mail"
            value={email}
            editable={false}
            selectTextOnFocus={false}
            style={{ opacity: 0.6, backgroundColor: '#f0f0f0' }}
            rightIcon={<MaterialCommunityIcons name="lock" size={18} color="#ccc" />}
          />

          <TextInput
            placeholder="Telefone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            rightIcon={<MaterialCommunityIcons name="pencil" size={18} color="#ccc" />}
          />

          <View style={{ marginTop: 10 }}>
            <Button title="SALVAR ALTERAÇÕES" onPress={handleSave} isLoading={isLoading} />
          </View>
        </S.FormCard>

        <View style={{ height: 40 }} />
      </S.ContentContainer>
    </S.Container>
  );
};

export default ProfileScreen;