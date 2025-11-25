// Arquivo: src/screens/App/DisposalScreen/DisposalScreen.tsx

import React, { useState, useCallback } from 'react';
import { View, Alert, Linking, Platform, Keyboard } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button, TextInput } from '../../../components';
import { COLORS } from '../../../constants/colors';
import * as S from './DisposalScreen.styles';

type LineType = 'green' | 'brown' | 'blue' | 'white';

// Configuração das Linhas (Agora usando as constantes globais)
const LINE_CONFIG = {
  green: { 
    color: COLORS.lines.green, 
    bg: COLORS.lines.greenBg, 
    icon: 'laptop', 
    title: 'Linha Verde', 
    desc: 'Computadores, notebooks e celulares.' 
  },
  brown: { 
    color: COLORS.lines.brown, 
    bg: COLORS.lines.brownBg, 
    icon: 'television-classic', 
    title: 'Linha Marrom', 
    desc: 'TVs, monitores e equipamentos de áudio.' 
  },
  blue: { 
    color: COLORS.lines.blue, 
    bg: COLORS.lines.blueBg, 
    icon: 'blender', 
    title: 'Linha Azul', 
    desc: 'Eletroportáteis: Liquidificadores, secadores.' 
  },
  white: { 
    color: COLORS.lines.white, 
    bg: COLORS.lines.whiteBg, 
    icon: 'fridge', 
    title: 'Linha Branca', 
    desc: 'Geladeiras, fogões e máquinas de lavar.' 
  },
};

const DisposalScreen = () => {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState(1);
  
  const [selectedLines, setSelectedLines] = useState<LineType[]>([]);
  const [disposalMethod, setDisposalMethod] = useState<'pickup' | 'dropoff' | null>(null);
  const [itemsDescription, setItemsDescription] = useState('');
  const [address, setAddress] = useState('Rua Exemplo, 123 - Centro');
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      return () => resetFields();
    }, [])
  );

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

  const handleSelectLine = (line: LineType) => {
    if (selectedLines.includes(line)) {
      setSelectedLines(selectedLines.filter(l => l !== line));
    } else {
      setSelectedLines([...selectedLines, line]);
    }
  };

  const handleCreateRequest = async () => {
    if (!itemsDescription) {
      Alert.alert("Atenção", "Descreva os itens que serão coletados.");
      return;
    }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsLoading(false);
    
    Alert.alert("Sucesso!", "Sua solicitação de coleta foi criada.", [
      { text: "OK", onPress: () => navigation.goBack() }
    ]);
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

      <S.SelectionCard 
        selected={disposalMethod === 'pickup'} 
        onPress={() => setDisposalMethod('pickup')}
      >
        {/* Usando COLORS.methods */}
        <S.IconContainer color={COLORS.methods.pickupBg}>
          <MaterialCommunityIcons name="truck-delivery" size={28} color={COLORS.methods.pickup} />
        </S.IconContainer>
        <S.CardContent>
          <S.CardTitle>Coleta em Casa</S.CardTitle>
          <S.CardDescription>Agendamos a retirada no seu endereço.</S.CardDescription>
        </S.CardContent>
        {disposalMethod === 'pickup' && <MaterialCommunityIcons name="radiobox-marked" size={24} color={COLORS.methods.pickup} />}
      </S.SelectionCard>

      <S.SelectionCard 
        selected={disposalMethod === 'dropoff'} 
        onPress={() => setDisposalMethod('dropoff')}
      >
        {/* Usando COLORS.methods */}
        <S.IconContainer color={COLORS.methods.dropoffBg}>
          <MaterialCommunityIcons name="map-marker-check" size={28} color={COLORS.methods.dropoff} />
        </S.IconContainer>
        <S.CardContent>
          <S.CardTitle>Levar a um Ponto</S.CardTitle>
          <S.CardDescription>Você leva até o local mais próximo.</S.CardDescription>
        </S.CardContent>
        {disposalMethod === 'dropoff' && <MaterialCommunityIcons name="radiobox-marked" size={24} color={COLORS.methods.dropoff} />}
      </S.SelectionCard>

      <S.ButtonContainer>
        <Button title="Continuar" onPress={() => setStep(3)} disabled={!disposalMethod} />
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
        onChangeText={setItemsDescription}
        multiline
        numberOfLines={4}
        style={S.textAreaStyle} 
      />

      <S.FormLabel>Endereço de Retirada</S.FormLabel>
      <TextInput 
        value={address}
        onChangeText={setAddress}
        placeholder="Seu endereço"
        rightIcon={<MaterialCommunityIcons name="pencil" size={20} color={COLORS.textLight} />}
      />

      <S.ButtonContainer>
        <Button title="Solicitar Coleta" onPress={handleCreateRequest} isLoading={isLoading} />
        <Button title="Voltar" onPress={() => setStep(2)} variant="secondary" />
      </S.ButtonContainer>
    </>
  );

  const renderDropoffMap = () => {
    const filteredPoints = collectionPoints.filter(p => 
      selectedLines.some(line => p.lines.includes(line))
    );

    return (
      <>
        <S.SectionTitle>Pontos Próximos</S.SectionTitle>
        <S.DescriptionText>
          Mostrando locais que aceitam seus materiais. Toque para abrir no mapa.
        </S.DescriptionText>

        {filteredPoints.map(point => (
          <S.PointCard 
            key={point.id}
            onPress={() => openMap(point.address)}
            activeOpacity={0.7}
          >
            <S.PointName>{point.name}</S.PointName>
            <S.PointAddress>{point.address}</S.PointAddress>
            
            <S.PointDistance>
              <S.DistanceText>{point.distance}</S.DistanceText>
            </S.PointDistance>

            <S.PointFooter>
               <MaterialCommunityIcons name="directions" size={18} color={COLORS.primary} />
               <S.CardActionText>Traçar Rota</S.CardActionText>
               <MaterialCommunityIcons 
                 name="chevron-right" 
                 size={18} 
                 color={COLORS.gray} 
                 style={{ marginLeft: 'auto' }} 
               />
            </S.PointFooter>
          </S.PointCard>
        ))}

        <S.ButtonContainer>
           <Button title="Voltar" onPress={() => setStep(2)} variant="secondary" />
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