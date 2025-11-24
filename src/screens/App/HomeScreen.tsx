// Arquivo: src/screens/App/HomeScreen/HomeScreen.tsx

import React, { useState, useCallback } from 'react';
import { TouchableOpacity, ScrollView, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as S from './HomeScreen.styles';

// Componentes
import { GamificationCard } from '../../components/GamificationCard';
import { InfoCard } from '../../components/InfoCard';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  
  // --- ESTADOS DINÂMICOS ---
  const [userName, setUserName] = useState('Usuário');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Dados de Gamificação 
  const gamificationData = {
    level: 8,
    xpCurrent: 700,
    xpNext: 1000,
  };


  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) return;

      const BASE_URL = 'https://berta-journalish-outlandishly.ngrok-free.dev';
      
      const response = await fetch(`${BASE_URL}/api/v1/clients/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const fullName = data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim();
        setUserName(fullName || 'Usuário');
        if (data.avatarUrl) {
          setUserAvatar(data.avatarUrl);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar home:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (screen: string) => {
    if (screen === 'Profile') {
      navigation.navigate('Profile');
    } else {
      console.log(`Navegar para ${screen} (Em breve)`);
    }
  };

  return (
    <S.Container>
      
      {/* === HEADER === */}
      <S.Header style={{ paddingTop: insets.top + 10 }}>
        <S.HeaderTop>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <S.AvatarContainer onPress={() => handleNavigate('Profile')}>
               <S.AvatarImage 
                 source={
                   userAvatar 
                     ? { uri: userAvatar } 
                     : require('../../../assets/images/avatar.png') 
                 } 
               />
            </S.AvatarContainer>
            
            <S.WelcomeContainer>
              <S.HeaderTitle style={{ textAlign: 'left', fontSize: 18 }}>
                Olá, {userName.split(' ')[0]}! 
              </S.HeaderTitle>
              <S.HeaderTitle style={{ textAlign: 'left', fontSize: 12, opacity: 0.8, fontFamily: 'Montserrat-Regular' }}>
                Vamos reciclar hoje?
              </S.HeaderTitle>
            </S.WelcomeContainer>
          </View>

          <S.HeaderIconButton onPress={() => console.log('Notificações')}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="white" />
          </S.HeaderIconButton>

        </S.HeaderTop>
      </S.Header>

      {/* === CONTEÚDO PRINCIPAL === */}
      <ScrollView 
        style={{ flex: 1, zIndex: 10 }} 
        contentContainerStyle={{ paddingBottom: 40 }} 
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        
        {/* Card de Gamificação */}
        <GamificationCard 
          level={gamificationData.level} 
          currentXp={gamificationData.xpCurrent} 
          nextXp={gamificationData.xpNext} 
        />

        <S.ActionsGrid>
          <S.BigActionButton onPress={() => handleNavigate('Registrar')}>
             <MaterialCommunityIcons name="plus-circle-outline" size={36} color="white" />
             <S.BigActionText>REGISTRAR DESCARTE</S.BigActionText>
          </S.BigActionButton>

          <S.SmallActionButton onPress={() => handleNavigate('Mapa')}>
             <MaterialCommunityIcons name="map-search-outline" size={32} color="#348e57" />
             <S.SmallActionText>Mapa Completo</S.SmallActionText>
          </S.SmallActionButton>

          <S.SmallActionButton onPress={() => handleNavigate('Denuncia')}>
             <MaterialCommunityIcons name="alert-octagon-outline" size={32} color="#E74C3C" />
             <S.SmallActionText>Denunciar</S.SmallActionText>
          </S.SmallActionButton>
        </S.ActionsGrid>

        <S.TipsSection>
          <S.SectionTitle>Dicas Rápidas</S.SectionTitle>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingBottom: 20 }}>
            <InfoCard icon="battery-alert" iconColor="#FF8A65" title="Baterias" description="Nunca jogue no lixo comum. Risco de fogo." />
            <InfoCard icon="monitor" iconColor="#4DB6AC" title="Monitores" description="Contêm metais pesados. Doe ou recicle." />
            <InfoCard icon="cellphone" iconColor="#9575CD" title="Celulares" description="Apague seus dados antes de descartar." />
             <View style={{ width: 20 }} />
          </ScrollView>
        </S.TipsSection>

      </ScrollView>

      {/* === BARRA INFERIOR === */}
      <S.BottomNav style={{ paddingBottom: insets.bottom + 10 }}>
        <S.BottomNavButton onPress={() => console.log('Home')}>
          <MaterialCommunityIcons name="home" size={28} color="#348e57" />
          <S.BottomNavLabel active>Home</S.BottomNavLabel>
        </S.BottomNavButton>

        <S.BottomNavButton onPress={() => console.log('Pontos')}>
          <MaterialCommunityIcons name="map-marker-radius" size={28} color="#ccc" />
          <S.BottomNavLabel>Pontos</S.BottomNavLabel>
        </S.BottomNavButton>

        <S.BottomNavButton onPress={() => handleNavigate('Profile')}>
          <MaterialCommunityIcons name="account-circle" size={28} color="#ccc" />
          <S.BottomNavLabel>Perfil</S.BottomNavLabel>
        </S.BottomNavButton>
      </S.BottomNav>

    </S.Container>
  );
};

export default HomeScreen;