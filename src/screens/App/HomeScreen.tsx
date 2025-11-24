// Arquivo: src/screens/App/HomeScreen/HomeScreen.tsx

import React, { useState, useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect, DrawerActions } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as S from './HomeScreen.styles';

// Componentes
import { GamificationCard } from '../../components/GamificationCard';
import { InfoCard } from '../../components/InfoCard';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [userName, setUserName] = useState('Usuário');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  // Dados de Gamificação
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
    }
  };

  const handleNavigate = (screen: string) => {
    if (screen === 'Profile') {
      navigation.navigate('Profile');
    } else {
      console.log(`Navegar para ${screen} (Em breve)`);
    }
  };

  const openMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
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

          <View style={{ flexDirection: 'row' }}>
            <S.HeaderIconButton onPress={() => console.log('Notificações')}>
              <MaterialCommunityIcons name="bell-outline" size={24} color="white" />
            </S.HeaderIconButton>

            <S.HeaderIconButton onPress={openMenu} style={{ marginLeft: 8 }}>
              <MaterialCommunityIcons name="menu" size={24} color="white" />
            </S.HeaderIconButton>
          </View>

        </S.HeaderTop>
      </S.Header>

      {/* === CONTEÚDO === */}
      <ScrollView
        style={{ flex: 1, zIndex: 10 }}
        contentContainerStyle={{ paddingBottom: 40 }}
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
              <MaterialCommunityIcons name="recycle" size={32} color="white" />
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
            <InfoCard
              icon="laptop"
              iconColor="#4CAF50"
              title="Linha Verde"
              description="Informática: Notebooks, mouses, teclados e tablets."
            />

            <InfoCard
              icon="television-classic"
              iconColor="#8D6E63"
              title="Linha Marrom"
              description="Monitores, televisores, projetores e áudio."
            />

            <InfoCard
              icon="blender"
              iconColor="#42A5F5"
              title="Linha Azul"
              description="Portáteis: Liquidificadores, secadores e ferros."
            />

            <InfoCard
              icon="fridge"
              iconColor="#9E9E9E"
              title="Linha Branca"
              description="Geladeiras, fogões e máquinas de lavar."
            />

            <View style={{ width: 20 }} />
          </ScrollView>
        </S.TipsSection>

      </ScrollView>
    </S.Container>
  );
};

export default HomeScreen;