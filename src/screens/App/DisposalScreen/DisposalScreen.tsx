// Arquivo: src/screens/App/DisposalScreen/DisposalScreen.tsx

import React, { useState, useCallback, useEffect } from 'react';
import { View, Alert, Linking, Platform, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { Button, TextInput } from '../../../components';
import { COLORS } from '../../../constants/colors';
import * as S from './DisposalScreen.styles';

type LineType = 'green' | 'brown' | 'blue' | 'white';

const DisposalScreen = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme(); 

  const [step, setStep] = useState(1);
  
  const [selectedLines, setSelectedLines] = useState<LineType[]>([]);
  const [disposalMethod, setDisposalMethod] = useState<'pickup' | 'dropoff' | null>(null);
  const [eligiblePoints, setEligiblePoints] = useState<Array<{ id: number; name: string; address: string; distance?: string; acceptedLines?: string[] }>>([]);
  const [selectedPointId, setSelectedPointId] = useState<number | null>(null);
  
  // Campos do Formulário
  const [itemsDescription, setItemsDescription] = useState('');
  const [address, setAddress] = useState('Rua Exemplo, 123 - Centro');
  const [addressData, setAddressData] = useState({
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    complement: '',
  });
  const [clientId, setClientId] = useState<string | null>(null);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // --- NOVOS ESTADOS DE ERRO ---
  const [itemsError, setItemsError] = useState('');
  const [addressError, setAddressError] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  // Configuração das Linhas
  const LINE_CONFIG = {
    green: { 
      color: theme.colors.lines.green, 
      bg: theme.colors.lines.greenBg, 
      icon: 'laptop', 
      title: 'Linha Verde', 
      desc: 'Computadores, notebooks e celulares.' 
    },
    brown: { 
      color: theme.colors.lines.brown, 
      bg: theme.colors.lines.brownBg, 
      icon: 'television-classic', 
      title: 'Linha Marrom', 
      desc: 'TVs, monitores e equipamentos de áudio.' 
    },
    blue: { 
      color: theme.colors.lines.blue, 
      bg: theme.colors.lines.blueBg, 
      icon: 'blender', 
      title: 'Linha Azul', 
      desc: 'Eletroportáteis: Liquidificadores, secadores.' 
    },
    white: { 
      color: theme.colors.lines.white, 
      bg: theme.colors.lines.whiteBg, 
      icon: 'fridge', 
      title: 'Linha Branca', 
      desc: 'Geladeiras, fogões e máquinas de lavar.' 
    },
  };

  const collectionPoints = [
    { id: 1, name: 'Ecoponto Central', address: 'Av. Paulista, 1578, São Paulo', distance: '1.2 km', lines: ['green', 'brown', 'blue', 'white'] },
    { id: 2, name: 'Tech Recicla', address: 'Rua Vergueiro, 1000, São Paulo', distance: '3.5 km', lines: ['green', 'brown'] },
    { id: 3, name: 'Associação de Catadores', address: 'Rua da Consolação, 200, São Paulo', distance: '5.0 km', lines: ['white', 'blue'] },
  ];

  const resetFields = () => {
    setStep(1);
    setSelectedLines([]);
    setDisposalMethod(null);
    setItemsDescription('');
    setItemsError('');
    setAddressError('');
    setIsLoading(false);
    setSuccessVisible(false);
    setErrorVisible(false);
    setErrorMessage('');
  };

  useFocusEffect(
    useCallback(() => {
      // Ao sair da tela, limpa estados
      return () => resetFields();
    }, [])
  );

  useEffect(() => {
    // Carrega dados do cliente (id e endereço) ao montar
    const loadClientData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const storedUserId = await AsyncStorage.getItem('userId');
        setClientId(storedUserId);
        if (!token) return;

        const rawBase = process.env.EXPO_PUBLIC_API_URL || '';
        const apiUrl = (rawBase.replace(/\/$/, '') || 'https://berta-journalish-outlandishly.ngrok-free.dev/api/v1');
        const res = await fetch(`${apiUrl}/clients/me`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        console.log('Dados do cliente:', JSON.stringify(data, null, 2)); // Debug
        // Extrai endereço estruturado - tenta múltiplas localizações possíveis
        let addr = data.address || {};
        
        // Se não encontrou no nível raiz, tenta no individual ou company
        if (!addr.street && !addr.city) {
          if (data.individual?.address) {
            addr = data.individual.address;
          } else if (data.company?.address) {
            addr = data.company.address;
          }
        }
        
        console.log('Endereço extraído:', JSON.stringify(addr, null, 2)); // Debug
        
        if (addr.addressName || addr.city) {
          setAddressData({
            street: addr.addressName || '',
            number: addr.number || '',
            neighborhood: addr.neighborhood || '',
            city: addr.city || '',
            state: addr.state || '',
            complement: addr.additionalInfo || '',
          });
          // Mantém address concatenado para uso na API de pontos
          const parts = [
            addr.addressName, 
            addr.number, 
            addr.neighborhood, 
            addr.city, 
            addr.state
          ].filter(Boolean);
          if (parts.length > 0) {
            setAddress(parts.join(', '));
          }
        }
      } catch (e) {
        // Silencia erro nesta etapa para não bloquear a UX
      }
    };
    loadClientData();
  }, []);

  const openMap = (addressStr: string) => {
    const query = encodeURIComponent(addressStr);
    const url = Platform.select({
      ios: `maps:0,0?q=${query}`,
      android: `geo:0,0?q=${query}`,
    });
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    Linking.canOpenURL(url!)
      .then((supported) => (supported ? Linking.openURL(url!) : Linking.openURL(webUrl)))
      .catch((err) => console.error('Erro ao abrir mapa:', err));
  };

  // Busca pontos elegíveis pela API usando linhas e endereço do cliente
  const fetchEligiblePoints = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const rawBase = process.env.EXPO_PUBLIC_API_URL || '';
      const apiUrl = (rawBase.replace(/\/$/, '') || 'https://berta-journalish-outlandishly.ngrok-free.dev/api/v1');

      const lineMap: Record<LineType, string> = {
        green: 'VERDE',
        brown: 'MARROM',
        blue: 'AZUL',
        white: 'BRANCA',
      };
      const linesQuery = selectedLines.map(l => lineMap[l]).join(',');

      const addrParts = address.split(',').map(p => p.trim());
      const city = addrParts.find((p) => p && p.length > 0) || 'São Paulo';
      const state = addrParts[addrParts.length - 1] || 'SP';

      const res = await fetch(`${apiUrl}/discards/eligible-points?lines=${encodeURIComponent(linesQuery)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ address: { city, state } }),
      });
      const data = await res.json().catch(() => ([]));
      if (Array.isArray(data)) {
        setEligiblePoints(data);
      } else if (Array.isArray(data?.points)) {
        setEligiblePoints(data.points);
      } else {
        setEligiblePoints([]);
      }
    } catch (e) {
      setEligiblePoints([]);
    }
  };

  const handleSelectLine = (line: LineType) => {
    if (selectedLines.includes(line)) {
      setSelectedLines(selectedLines.filter(l => l !== line));
    } else {
      setSelectedLines([...selectedLines, line]);
    }
  };

  // --- VALIDAÇÃO E ENVIO ATUALIZADOS ---
  const handleCreateRequest = async () => {
    setItemsError('');
    setAddressError('');
    setErrorVisible(false);
    setSuccessVisible(false);

    if (!itemsDescription.trim()) {
      setItemsError('Por favor, descreva os itens.');
      setErrorMessage('Por favor, descreva os itens que serão descartados.');
      setErrorVisible(true);
      return;
    }

    if (disposalMethod === 'pickup') {
      if (!addressData.street || !addressData.city) {
        setAddressError('Endereço incompleto. Verifique seu cadastro.');
        setErrorMessage('Endereço de retirada incompleto. Atualize seu cadastro.');
        setErrorVisible(true);
        return;
      }
    }

    if (disposalMethod === 'dropoff') {
      if (!selectedPointId) {
        setErrorMessage('Selecione um ponto de coleta para continuar.');
        setErrorVisible(true);
        return;
      }
    }

    // Monta payloads conforme modo
    const lineMap: Record<LineType, string> = {
      green: 'VERDE',
      brown: 'MARROM',
      blue: 'AZUL',
      white: 'BRANCA',
    };
    const linesPayload = selectedLines.map(l => lineMap[l]);

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      const rawBase = process.env.EXPO_PUBLIC_API_URL || '';
      const apiUrl = (rawBase.replace(/\/$/, '') || 'https://berta-journalish-outlandishly.ngrok-free.dev/api/v1');

      const bodyPickup = {
        clientId: clientId ? Number(clientId) : undefined,
        mode: 'PICKUP' as const,
        lines: linesPayload,
        description: itemsDescription.trim(),
      };
      const bodyDropoff = {
        clientId: clientId ? Number(clientId) : undefined,
        mode: 'COLLECTION_POINT' as const,
        lines: linesPayload,
        collectionPointId: selectedPointId!,
        description: itemsDescription.trim(),
      };

      const res = await fetch(`${apiUrl}/discards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(disposalMethod === 'dropoff' ? bodyDropoff : bodyPickup),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data?.message || 'Falha ao registrar descarte. Tente novamente.';
        setErrorMessage(msg);
        setErrorVisible(true);
        setIsLoading(false);
        return;
      }

      // Sucesso: mostra banner e volta
      setSuccessVisible(true);
      setTimeout(() => {
        setSuccessVisible(false);
        navigation.goBack();
      }, 2000);
    } catch (e: any) {
      setErrorMessage(e?.message || 'Erro de conexão. Tente novamente.');
      setErrorVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  // --- RENDERIZADORES ---

  const renderLineCard = (type: LineType) => {
    const config = LINE_CONFIG[type];
    const isSelected = selectedLines.includes(type);
    
    return (
      <S.SelectionCard 
        key={type}
        selected={isSelected} 
        color={config.color}
        onPress={() => handleSelectLine(type)}
        activeOpacity={0.8}
      >
        <S.IconContainer color={config.bg}>
          <MaterialCommunityIcons name={config.icon as any} size={24} color={config.color} />
        </S.IconContainer>
        <S.CardContent>
          <S.CardTitle>{config.title}</S.CardTitle>
          <S.CardDescription>{config.desc}</S.CardDescription>
        </S.CardContent>
        {isSelected && <MaterialCommunityIcons name="check-circle" size={24} color={config.color} />}
      </S.SelectionCard>
    );
  };

  const renderStep1 = () => (
    <>
      <S.SectionTitle>Qual tipo de material?</S.SectionTitle>
      <S.DescriptionText>Você pode selecionar mais de uma opção.</S.DescriptionText>
      
      {renderLineCard('green')}
      {renderLineCard('brown')}
      {renderLineCard('blue')}
      {renderLineCard('white')}

      <S.ButtonContainer>
        <Button 
          title="Continuar" 
          onPress={() => setStep(2)} 
          disabled={selectedLines.length === 0} 
        />
      </S.ButtonContainer>
    </>
  );

  const renderStep2 = () => (
    <>
      <S.SectionTitle>Como deseja descartar?</S.SectionTitle>

              {successVisible && (
                <View style={{
                  backgroundColor: '#1DB954',
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  marginBottom: 12,
                }}>
                  <S.DescriptionText style={{ color: '#fff', marginBottom: 0 }}>
                    Solicitação criada com sucesso.
                  </S.DescriptionText>
                </View>
              )}
      <S.SelectionCard 
        selected={disposalMethod === 'pickup'} 
        onPress={() => setDisposalMethod('pickup')}
        color={theme.colors.methods.pickup}
      >
        <S.IconContainer color={theme.colors.methods.pickupBg}>
          <MaterialCommunityIcons name="truck-delivery" size={28} color={theme.colors.methods.pickup} />
        </S.IconContainer>
        <S.CardContent>
          <S.CardTitle>Coleta em Casa</S.CardTitle>
          <S.CardDescription>Agendamos a retirada no seu endereço.</S.CardDescription>
        </S.CardContent>
        {disposalMethod === 'pickup' && <MaterialCommunityIcons name="radiobox-marked" size={24} color={theme.colors.methods.pickup} />}
      </S.SelectionCard>

      <S.SelectionCard 
        selected={disposalMethod === 'dropoff'} 
        onPress={() => setDisposalMethod('dropoff')}
        color={theme.colors.methods.dropoff}
      >
        <S.IconContainer color={theme.colors.methods.dropoffBg}>
          <MaterialCommunityIcons name="map-marker-check" size={28} color={theme.colors.methods.dropoff} />
        </S.IconContainer>
        <S.CardContent>
          <S.CardTitle>Levar a um Ponto</S.CardTitle>
          <S.CardDescription>Você leva até o local mais próximo.</S.CardDescription>
        </S.CardContent>
        {disposalMethod === 'dropoff' && <MaterialCommunityIcons name="radiobox-marked" size={24} color={theme.colors.methods.dropoff} />}
      </S.SelectionCard>

      <S.ButtonContainer>
        <Button title="Continuar" onPress={async () => { setStep(3); if (disposalMethod === 'dropoff') { await fetchEligiblePoints(); } }} disabled={!disposalMethod} />
        <Button title="Voltar" onPress={() => setStep(1)} variant="secondary" />
      </S.ButtonContainer>
    </>
  );

  const renderPickupForm = () => (
    <>
      <S.SectionTitle>Detalhes da Coleta</S.SectionTitle>
      
      <S.FormLabel>O que será coletado?</S.FormLabel>
      <TextInput 
        placeholder="Ex: 1 Geladeira antiga, 2 Monitores..."
        value={itemsDescription}
        onChangeText={(t) => { setItemsDescription(t); setItemsError(''); }} 
        multiline
        numberOfLines={4}
        style={S.textAreaStyle}
        error={itemsError} 
      />

      <S.FormLabel>Endereço de Retirada</S.FormLabel>
      
      <S.AddressCard>
        <S.AddressRow>
          <MaterialCommunityIcons name="map-marker" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
          <S.AddressInfo>
            <S.AddressMainText>
              {addressData.street && addressData.number 
                ? `${addressData.street}, ${addressData.number}`
                : 'Rua não informada'}
            </S.AddressMainText>
            {addressData.neighborhood && (
              <S.AddressSecondaryText>{addressData.neighborhood}</S.AddressSecondaryText>
            )}
            <S.AddressSecondaryText>
              {addressData.city && addressData.state 
                ? `${addressData.city} - ${addressData.state}`
                : 'Cidade/Estado não informado'}
            </S.AddressSecondaryText>
            {addressData.complement && (
              <S.AddressSecondaryText>Complemento: {addressData.complement}</S.AddressSecondaryText>
            )}
          </S.AddressInfo>
        </S.AddressRow>
      </S.AddressCard>
      
      {addressError && <S.ErrorText>{addressError}</S.ErrorText>}

      <S.ButtonContainer>
        <Button title="Solicitar Coleta" onPress={handleCreateRequest} isLoading={isLoading} />
        <Button title="Voltar" onPress={() => setStep(2)} variant="secondary" />
      </S.ButtonContainer>
    </>
  );

  const renderDropoffMap = () => {
    const filteredPoints = eligiblePoints;

    return (
      <>
        <S.SectionTitle>Pontos Próximos</S.SectionTitle>
        <S.DescriptionText>
          Mostrando locais que aceitam seus materiais. Toque para abrir no mapa.
        </S.DescriptionText>

        {filteredPoints.map(point => (
          <S.PointCard 
            key={point.id}
            onPress={() => setSelectedPointId(point.id)}
            activeOpacity={0.7}
          >
            <S.PointName>{point.name}</S.PointName>
            <S.PointAddress>{point.address}</S.PointAddress>
            
            <S.PointDistance>
              <S.DistanceText>{point.distance || ''}</S.DistanceText>
            </S.PointDistance>

            <S.PointFooter>
               <MaterialCommunityIcons name="directions" size={18} color={theme.colors.primary} />
               <S.CardActionText>{selectedPointId === point.id ? 'Selecionado' : 'Selecionar'}</S.CardActionText>
               <MaterialCommunityIcons 
                 name="chevron-right" 
                 size={18} 
                 color={theme.colors.textLight} 
                 style={{ marginLeft: 'auto' }} 
               />
            </S.PointFooter>
          </S.PointCard>
        ))}

        <S.ButtonContainer>
           <Button title="Voltar" onPress={() => setStep(2)} variant="secondary" />
           <Button title="Solicitar Descarte" onPress={handleCreateRequest} disabled={!selectedPointId || isLoading} isLoading={isLoading} />
        </S.ButtonContainer>
      </>
    );
  };

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
        </S.BackButton>
        <S.Title>Novo Descarte</S.Title>
        <S.Subtitle>
          {step === 1 ? 'Passo 1 de 3' : step === 2 ? 'Passo 2 de 3' : 'Passo 3 de 3'}
        </S.Subtitle>
      </S.Header>

      <S.Content showsVerticalScrollIndicator={false}>
        {errorVisible && (
          <View style={{
            backgroundColor: '#D93025',
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 14,
            marginBottom: 12,
          }}>
            <S.DescriptionText style={{ color: '#fff', marginBottom: 0 }}>
              {errorMessage}
            </S.DescriptionText>
          </View>
        )}
        {successVisible && (
          <View style={{
            backgroundColor: '#1DB954',
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 14,
            marginBottom: 12,
          }}>
            <S.DescriptionText style={{ color: '#fff', marginBottom: 0 }}>
              Solicitação criada com sucesso! Redirecionando...
            </S.DescriptionText>
          </View>
        )}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && disposalMethod === 'pickup' && renderPickupForm()}
        {step === 3 && disposalMethod === 'dropoff' && renderDropoffMap()}
        <View style={{ height: 40 }} />
      </S.Content>
    </S.Container>
  );
};

export default DisposalScreen;