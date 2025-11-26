// Arquivo: src/screens/App/HistoryScreen/HistoryScreen.tsx

import React, { useState, useEffect } from 'react';
import { SectionList, View, ActivityIndicator, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
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

type FilterType = 'TODOS' | 'PENDING' | 'COMPLETED' | 'CANCELLED';

const HistoryScreen = () => {
  const navigation = useNavigation<any>(); // <any> permite acessar openDrawer direto
  const [isLoading, setIsLoading] = useState(true);
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('TODOS');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      await new Promise(r => setTimeout(r, 1000));

      const mockData: HistoryItem[] = [
        {
          id: 1,
          date: '2025-11-25T14:30:00Z',
          type: 'PICKUP',
          status: 'PENDING',
          items: '1 Geladeira, 1 Microondas',
          xpEarned: 0,
        },
        {
          id: 2,
          date: '2025-11-25T09:15:00Z',
          type: 'DROPOFF',
          status: 'COMPLETED',
          items: '5kg de Baterias e Cabos',
          xpEarned: 150,
        },
        {
          id: 3,
          date: '2025-11-24T16:00:00Z',
          type: 'PICKUP',
          status: 'CANCELLED',
          items: '2 Monitores Antigos',
          xpEarned: 0,
        },
        {
          id: 4,
          date: '2025-11-10T11:00:00Z',
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

  const formatDateHeader = (isoString: string) => {
    const date = new Date(isoString);
    const today = new Date();
    
    const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const d2 = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (d1.getTime() === d2.getTime()) return 'Hoje';
    
    d2.setDate(d2.getDate() - 1);
    if (d1.getTime() === d2.getTime()) return 'Ontem';

    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const sections = React.useMemo(() => {
    const filtered = historyData.filter(item => 
      activeFilter === 'TODOS' ? true : item.status === activeFilter
    );

    const grouped: { [key: string]: HistoryItem[] } = {};
    
    filtered.forEach(item => {
      const dateKey = item.date.split('T')[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(item);
    });

    const sortedKeys = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    return sortedKeys.map(dateKey => ({
      title: formatDateHeader(dateKey),
      data: grouped[dateKey]
    }));

  }, [historyData, activeFilter]);

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
          <S.TimeText>{formatTime(item.date)}</S.TimeText>
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
            <S.TypeText>{isPickup ? 'Coleta em Casa' : 'Entrega em Ponto'}</S.TypeText>
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
        {/* CORREÇÃO AQUI: Usando navigation.openDrawer() direto */}
        <S.MenuButton onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" size={28} color={COLORS.white} />
        </S.MenuButton>
        
        <S.Title>Histórico</S.Title>
      </S.Header>

      {/* Filtros */}
      <View style={{ paddingBottom: 5 }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
        >
          <S.FilterChip isActive={activeFilter === 'TODOS'} onPress={() => setActiveFilter('TODOS')}>
            <S.FilterText isActive={activeFilter === 'TODOS'}>Todos</S.FilterText>
          </S.FilterChip>
          
          <S.FilterChip isActive={activeFilter === 'PENDING'} onPress={() => setActiveFilter('PENDING')}>
            <S.FilterText isActive={activeFilter === 'PENDING'}>Pendentes</S.FilterText>
          </S.FilterChip>
          
          <S.FilterChip isActive={activeFilter === 'COMPLETED'} onPress={() => setActiveFilter('COMPLETED')}>
            <S.FilterText isActive={activeFilter === 'COMPLETED'}>Concluídos</S.FilterText>
          </S.FilterChip>

          <S.FilterChip isActive={activeFilter === 'CANCELLED'} onPress={() => setActiveFilter('CANCELLED')}>
            <S.FilterText isActive={activeFilter === 'CANCELLED'}>Cancelados</S.FilterText>
          </S.FilterChip>
        </ScrollView>
      </View>

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <SectionList
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <S.SectionHeader>
              <S.SectionHeaderText>{title}</S.SectionHeaderText>
            </S.SectionHeader>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 20, paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
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