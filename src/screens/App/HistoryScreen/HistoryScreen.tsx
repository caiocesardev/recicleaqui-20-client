// Arquivo: src/screens/App/HistoryScreen/HistoryScreen.tsx

import React, { useState, useEffect } from 'react';
import { FlatList, View, ActivityIndicator, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Removido DrawerActions
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '../../../constants/colors';
import * as S from './HistoryScreen.styles';

interface HistoryItem {
  id: number;
  date: string;
  type: 'PICKUP' | 'DROPOFF';
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  items: string;
  xpEarned?: number;
}

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      await new Promise(r => setTimeout(r, 1500));

      const mockData: HistoryItem[] = [
        {
          id: 1,
          date: '2025-11-24T14:30:00Z',
          type: 'PICKUP',
          status: 'PENDING',
          items: '1 Geladeira, 1 Microondas',
          xpEarned: 0,
        },
        {
          id: 2,
          date: '2025-11-20T09:15:00Z',
          type: 'DROPOFF',
          status: 'COMPLETED',
          items: '5kg de Baterias e Cabos',
          xpEarned: 150,
        },
        {
          id: 3,
          date: '2025-10-15T16:00:00Z',
          type: 'PICKUP',
          status: 'CANCELLED',
          items: '2 Monitores Antigos',
          xpEarned: 0,
        },
        {
            id: 4,
            date: '2025-09-10T11:00:00Z',
            type: 'DROPOFF',
            status: 'COMPLETED',
            items: '1 Celular quebrado',
            xpEarned: 50,
          },
      ];

      setHistoryData(mockData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'COMPLETED': return { color: '#00C851', bg: '#E8F5E9', label: 'Concluído' };
      case 'PENDING':   return { color: '#FFBB33', bg: '#FFF8E1', label: 'Pendente' };
      case 'CANCELLED': return { color: '#ff4444', bg: '#FFEBEE', label: 'Cancelado' };
      default: return { color: '#333', bg: '#eee', label: status };
    }
  };

  const renderItem = ({ item }: { item: HistoryItem }) => {
    const statusConfig = getStatusConfig(item.status);
    const isPickup = item.type === 'PICKUP';

    return (
      <S.HistoryCard style={{ borderLeftColor: statusConfig.color }}>
        <S.CardHeader>
          <S.DateText>{formatDate(item.date)}</S.DateText>
          <S.StatusBadge bg={statusConfig.bg}>
            <S.StatusText color={statusConfig.color}>{statusConfig.label}</S.StatusText>
          </S.StatusBadge>
        </S.CardHeader>

        <S.CardBody>
          <S.IconBox>
            <MaterialCommunityIcons 
              name={isPickup ? "truck-delivery" : "map-marker-check"} 
              size={24} 
              color={COLORS.text} 
            />
          </S.IconBox>
          
          <S.InfoContainer>
            <S.ItemsText>{item.items}</S.ItemsText>
            <S.TypeText>
                {isPickup ? 'Coleta em Casa' : 'Entrega em Ponto'}
            </S.TypeText>
          </S.InfoContainer>

          {item.status === 'COMPLETED' && (
            <S.XpBadge>
               <S.XpText>+{item.xpEarned} XP</S.XpText>
            </S.XpBadge>
          )}
        </S.CardBody>
      </S.HistoryCard>
    );
  };

  return (
    <S.Container>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <S.Header>
        <S.BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
        </S.BackButton>
        
        <S.Title>Histórico</S.Title>
      </S.Header>

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={historyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 20, paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <S.EmptyContainer>
              <MaterialCommunityIcons name="history" size={60} color="#ddd" />
              <S.EmptyText>Nenhum registro encontrado.</S.EmptyText>
            </S.EmptyContainer>
          }
        />
      )}
    </S.Container>
  );
};

export default HistoryScreen;