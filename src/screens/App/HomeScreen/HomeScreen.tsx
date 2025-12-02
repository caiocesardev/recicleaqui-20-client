// Arquivo: src/screens/App/HomeScreen/HomeScreen.tsx

import React, { useState, useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect, DrawerActions } from '@react-navigation/native'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as S from './HomeScreen.styles';
import { COLORS } from '../../../constants/colors'; 

import { InfoCard } from '../../../components/InfoCard';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  
  const [userName, setUserName] = useState('Usuário');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  
  // Mock dos últimos 3 descartes (preview compacto)
  const recentDiscards = [
    {
      id: 'd1',
      mode: 'PICKUP',
      status: 'REQUESTED',
      lines: ['VERDE', 'AZUL'],
      date: '2025-11-28T14:23:00Z',
    },
    {
      id: 'd2',
      mode: 'COLLECTION_POINT',
      status: 'COMPLETED',
      lines: ['BRANCA'],
      date: '2025-11-20T10:05:00Z',
    },
    {
      id: 'd3',
      mode: 'PICKUP',
      status: 'IN_PROGRESS',
      lines: ['MARROM'],
      date: '2025-11-15T09:45:00Z',
    },
  ];

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
      
      const response = await fetch(`${BASE_URL}/clients/me`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Extrai o nome do usuário corretamente
        let fullName = 'Usuário';
        if (data.type === 'individual' && data.individual) {
          const firstName = data.individual.firstName || '';
          const lastName = data.individual.lastName || '';
          fullName = `${firstName} ${lastName}`.trim() || 'Usuário';
        } else if (data.type === 'company' && data.company) {
          fullName = data.company.tradeName || data.company.companyName || 'Empresa';
        }

        // Atualiza o nome no header
        setUserName(fullName);

        // Constrói URL completa do avatar
        if (data.avatarUrl) {
          let fullAvatarUrl = data.avatarUrl;
          if (!fullAvatarUrl.startsWith('http')) {
            const baseUrl = BASE_URL.replace('/api/v1', '');
            fullAvatarUrl = `${baseUrl}${fullAvatarUrl.startsWith('/') ? '' : '/'}${fullAvatarUrl}`;
          }
          setUserAvatar(fullAvatarUrl);
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
            {/* TODO: Implementar funcionalidade de notificações */}
            <S.HeaderIconButton onPress={() => {}}>
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
        
        {/* Preview compacto do histórico (substitui GamificationCard) */}
        <S.HistoryPreviewCard>
          <S.HistoryHeaderRow>
            <S.HistoryTitle>Seus últimos descartes</S.HistoryTitle>
            <S.HistorySeeAllButton onPress={() => navigation.navigate('History')}>
              <S.HistorySeeAllText>Ver histórico</S.HistorySeeAllText>
            </S.HistorySeeAllButton>
          </S.HistoryHeaderRow>

          {recentDiscards.map((item) => (
            <S.HistoryItemRow key={item.id}>
              <S.HistoryItemIcon>
                <MaterialCommunityIcons
                  name={item.mode === 'PICKUP' ? 'truck-outline' : 'map-marker-outline'}
                  size={22}
                  color={item.mode === 'PICKUP' ? COLORS.lines.green : COLORS.primary}
                />
              </S.HistoryItemIcon>
              <S.HistoryItemContent>
                <S.HistoryItemTop>
                  <S.HistoryItemTitle>
                    {item.mode === 'PICKUP' ? 'Coleta agendada' : 'Entrega em ponto'}
                  </S.HistoryItemTitle>
                  <S.HistoryItemStatus $status={item.status}>
                    {item.status === 'COMPLETED' ? 'Concluído' : item.status === 'IN_PROGRESS' ? 'Em andamento' : 'Solicitado'}
                  </S.HistoryItemStatus>
                </S.HistoryItemTop>
                <S.HistoryItemBottom>
                  <S.LineChipsRow>
                    {item.lines.map((line) => {
                      const colorMap: Record<string, string> = {
                        VERDE: COLORS.lines.green,
                        MARROM: COLORS.lines.brown,
                        AZUL: COLORS.lines.blue,
                        BRANCA: COLORS.lines.white,
                      };
                      return (
                        <S.LineChip key={`${item.id}-${line}`} $color={colorMap[line] || COLORS.primary}>
                          <S.LineChipText $color={colorMap[line] || COLORS.primary}>{line}</S.LineChipText>
                        </S.LineChip>
                      );
                    })}
                  </S.LineChipsRow>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="calendar-blank-outline" size={14} color={COLORS.textLight || 'gray'} />
                    <S.HistoryItemDate style={{ marginLeft: 6 }}>
                      {new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    </S.HistoryItemDate>
                  </View>
                </S.HistoryItemBottom>
              </S.HistoryItemContent>
            </S.HistoryItemRow>
          ))}
        </S.HistoryPreviewCard>

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