// Arquivo: src/screens/App/HomeScreen/HomeScreen.tsx

import React, { useState, useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect, DrawerActions } from '@react-navigation/native'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as S from './HomeScreen.styles';
import { COLORS } from '../../../constants/colors'; 

import { GamificationCard } from '../../../components/GamificationCard';
import { InfoCard } from '../../../components/InfoCard';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  
  const [userName, setUserName] = useState('Usuário');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  
  const gamificationData = {
    level: 7,
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

      const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://berta-journalish-outlandishly.ngrok-free.dev/api/v1';
      
      const response = await fetch(`${BASE_URL}/clients/${userId}`, { // Ajuste da rota se necessário
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
    }
  };

  const handleNavigate = (screen: string) => {
    if (screen === 'Profile') {
      navigation.navigate('Profile');
    } else if (screen === 'Registrar') {
      navigation.navigate('Disposal'); 
    } else {
      console.log(`Navegar para ${screen} (Em breve)`);
    }
  };

  const openMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <S.Container>
      
      <S.Header style={{ paddingTop: insets.top + 10 }}>
        <S.HeaderTop>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <S.AvatarContainer onPress={() => handleNavigate('Profile')}>
               <S.AvatarImage 
                 source={
                   userAvatar 
                     ? { uri: userAvatar } 
                     : require('../../../../assets/images/avatar.png') 
                 } 
               />
            </S.AvatarContainer>
            
            <S.WelcomeContainer>
              <S.HeaderTitle style={{ textAlign: 'left', fontSize: 18 }}>
                Olá, {userName.split(' ')[0]}!
              </S.HeaderTitle>
              <S.HeaderSubtitle>
                Vamos reciclar hoje?
              </S.HeaderSubtitle>
            </S.WelcomeContainer>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <S.HeaderIconButton onPress={() => console.log('Notificações')}>
              <MaterialCommunityIcons name="bell-outline" size={24} color={COLORS.white} />
            </S.HeaderIconButton>
            
            <S.HeaderIconButton onPress={openMenu} style={{ marginLeft: 8 }}>
              <MaterialCommunityIcons name="menu" size={24} color={COLORS.white} />
            </S.HeaderIconButton>
          </View>
        </S.HeaderTop>
      </S.Header>

      <ScrollView 
        style={{ flex: 1, zIndex: 10 }} 
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        
        <GamificationCard 
          level={gamificationData.level} 
          currentXp={gamificationData.xpCurrent} 
          nextXp={gamificationData.xpNext} 
        />

        <S.ActionContainer>
          <S.MainActionButton onPress={() => handleNavigate('Registrar')} activeOpacity={0.9}>
            <S.IconBox>
              <MaterialCommunityIcons name="recycle" size={32} color={COLORS.white} />
            </S.IconBox>
            <S.ActionContent>
              <S.ActionTitle>Registrar Descarte</S.ActionTitle>
              <S.ActionSubtitle>Ganhe pontos e ajude o planeta</S.ActionSubtitle>
            </S.ActionContent>
            <MaterialCommunityIcons name="chevron-right" size={32} color="rgba(255,255,255,0.6)" />
          </S.MainActionButton>
        </S.ActionContainer>

        <S.TipsSection>
          <S.SectionTitle>O que reciclar? (Linhas)</S.SectionTitle>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingBottom: 20 }}>
            <InfoCard icon="laptop" iconColor={COLORS.lines.green} title="Linha Verde" description="Informática: Notebooks, mouses, teclados e tablets." />
            <InfoCard icon="television-classic" iconColor={COLORS.lines.brown} title="Linha Marrom" description="Monitores, televisores, projetores e áudio." />
            <InfoCard icon="blender" iconColor={COLORS.lines.blue} title="Linha Azul" description="Portáteis: Liquidificadores, secadores e ferros." />
            <InfoCard icon="fridge" iconColor={COLORS.lines.white} title="Linha Branca" description="Geladeiras, fogões e máquinas de lavar." />
             <View style={{ width: 20 }} />
          </ScrollView>
        </S.TipsSection>

      </ScrollView>

    </S.Container>
  );
};

export default HomeScreen;