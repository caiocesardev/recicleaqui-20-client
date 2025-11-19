// Arquivo: src/screens/App/HomeScreen/HomeScreen.tsx

import React from 'react';
import { TouchableOpacity, ScrollView, View } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as S from './HomeScreen.styles';

// Importar o hook do contexto
import { useAuth } from '../../context/AuthContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  const { signOut } = useAuth();

  const [userName, setUserName] = React.useState('Carregando...');
  const [userEmail, setUserEmail] = React.useState('Carregando...');
  const [userPhone, setUserPhone] = React.useState('Carregando...');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userId = await AsyncStorage.getItem('userId');
      
      if (!token || !userId) {
        await signOut();
        return;
      }

      const BASE_URL = 'https://berta-journalish-outlandishly.ngrok-free.dev';
      const response = await fetch(`${BASE_URL}/api/v1/clients/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}`);
      }

      const data = await response.json();
      setUserName(data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Usuário');
      setUserEmail(data.email || 'Email não disponível');
      setUserPhone(formatPhone(data.phone) || 'Telefone não disponível');
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setUserName('Usuário');
    } finally {
      setIsLoading(false);
    }
  };

  function onlyDigits(value?: string) {
    if (!value) return '';
    return value.replace(/\D/g, '');
  }

  function formatPhone(value?: string) {
    if (!value) return '';
    const digits = onlyDigits(value);
    if (!digits) return '';
    let d = digits;
    if (d.length > 11 && d.startsWith('55')) {
      d = d.slice(2);
    }
    if (d.length === 11) {
      return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
    }
    if (d.length === 10) {
      return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
    }
    if (d.length > 6) return `${d.slice(0, d.length-8)} ${d.slice(-8,-4)}-${d.slice(-4)}`;
    return value;
  }

  const menuItems = [
    { label: 'Home', icon: 'home' },
    { label: 'Pontos', icon: 'map-marker' },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleEditProfile = () => {
    console.log('Editar perfil clicado'); 
  };

  const handleSearchCollectionCompanies = () => {
    console.log('Pesquisar empresas clicado');
  };

  return (
    <S.Container>
      <S.Header style={{ paddingTop: insets.top + 8 }}>
        <S.HeaderTop>
          <View style={{ width: 24 }} />
          <S.HeaderTitle>Dashboard</S.HeaderTitle>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleEditProfile} style={{ marginRight: 8 }}>
              <MaterialCommunityIcons name="account-circle" size={28} color="white" />
            </TouchableOpacity>
            
            <S.HeaderIconButton onPress={handleLogout} activeOpacity={0.7}>
              <MaterialCommunityIcons name="logout" size={20} color="white" />
            </S.HeaderIconButton>
          </View>
        </S.HeaderTop>
      </S.Header>

      <ScrollView 
        style={{ flex: 1 }}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <S.WelcomeSection>
          <S.WelcomeTitle>Bem-vindo, {userName}!</S.WelcomeTitle>
          <S.WelcomeSubtitle>Gerencie seu descarte de eletrônicos</S.WelcomeSubtitle>
        </S.WelcomeSection>

        <S.ProfileCard>
          <S.ProfileHeader>
            <S.ProfileTitle>Perfil</S.ProfileTitle>
          </S.ProfileHeader>

          <S.ProfileInfo>
            <S.ProfileInfoLabel>Nome</S.ProfileInfoLabel>
            <S.ProfileInfoValue>{userName}</S.ProfileInfoValue>
          </S.ProfileInfo>

          <S.ProfileInfo>
            <S.ProfileInfoLabel>Email</S.ProfileInfoLabel>
            <S.ProfileInfoValue>{userEmail}</S.ProfileInfoValue>
          </S.ProfileInfo>

          <S.ProfileInfo>
            <S.ProfileInfoLabel>Telefone</S.ProfileInfoLabel>
            <S.ProfileInfoValue>{userPhone}</S.ProfileInfoValue>
          </S.ProfileInfo>
        </S.ProfileCard>

        <S.ActionButtonsContainer>
          <S.ActionButton onPress={handleSearchCollectionCompanies}>
            <MaterialCommunityIcons name="map-search" size={20} color="white" />
            <S.ActionButtonText>Pesquisar Empresas de Coleta</S.ActionButtonText>
          </S.ActionButton>
        </S.ActionButtonsContainer>

        <View style={{ height: 20 }} />
      </ScrollView>

      <S.BottomNav style={{ paddingBottom: insets.bottom }}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={{ 
              flex: 1, 
              alignItems: 'center', 
              justifyContent: 'center',
              paddingVertical: 8
            }}
          >
            <MaterialCommunityIcons 
              name={item.icon as any} 
              size={26} 
              color="#348e57" 
            />
            <S.BottomNavLabel>{item.label}</S.BottomNavLabel>
          </TouchableOpacity>
        ))}
      </S.BottomNav>
    </S.Container>
  );
};

export default HomeScreen;