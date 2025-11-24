// Arquivo: src/screens/App/DisposalScreen/DisposalScreen.tsx

import React, { useState, useCallback } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, TextInput } from '../../../components';
import * as S from './DisposalScreen.styles';

type LineType = 'green' | 'brown' | 'blue' | 'white';

const DisposalScreen = () => {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState(1);
  
  // Dados do Formulário
  const [selectedLines, setSelectedLines] = useState<LineType[]>([]);
  const [disposalMethod, setDisposalMethod] = useState<'pickup' | 'dropoff' | null>(null);
  const [itemsDescription, setItemsDescription] = useState('');
  const [address, setAddress] = useState('Rua Exemplo, 123 - Centro (Meu Endereço)');
  const [isLoading, setIsLoading] = useState(false);


  const resetFields = () => {
    setStep(1);
    setSelectedLines([]);
    setDisposalMethod(null);
    setItemsDescription('');
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
  
      return () => {
        resetFields();
      };
    }, [])
  );

  const handleSelectLine = (line: LineType) => {
    if (selectedLines.includes(line)) {
      setSelectedLines(selectedLines.filter(l => l !== line));
    } else {
      setSelectedLines([...selectedLines, line]);
    }
  };

  const collectionPoints = [
    { id: 1, name: 'Ecoponto Central', address: 'Av. Brasil, 500', distance: '1.2 km', lines: ['green', 'brown', 'blue', 'white'] },
    { id: 2, name: 'Tech Recicla', address: 'Rua da Tecnologia, 88', distance: '3.5 km', lines: ['green', 'brown'] },
    { id: 3, name: 'Associação de Catadores', address: 'Bairro Industrial, Galpão 4', distance: '5.0 km', lines: ['white', 'blue'] },
  ];

  // --- ETAPAS DE RENDERIZAÇÃO ---

  const renderStep1 = () => (
    <>
      <S.SectionTitle>Qual tipo de material?</S.SectionTitle>
      <S.Subtitle style={{ marginBottom: 20 }}>Você pode selecionar mais de uma opção.</S.Subtitle>
      
      <S.SelectionCard 
        selected={selectedLines.includes('green')} 
        color="#4CAF50"
        onPress={() => handleSelectLine('green')}
      >
        <S.IconContainer color="#E8F5E9"><MaterialCommunityIcons name="laptop" size={24} color="#4CAF50" /></S.IconContainer>
        <S.CardContent>
          <S.CardTitle>Linha Verde</S.CardTitle>
          <S.CardDescription>Computadores, notebooks, celulares e acessórios.</S.CardDescription>
        </S.CardContent>
        {selectedLines.includes('green') && <MaterialCommunityIcons name="check-circle" size={24} color="#4CAF50" />}
      </S.SelectionCard>

      <S.SelectionCard 
        selected={selectedLines.includes('brown')} 
        color="#8D6E63"
        onPress={() => handleSelectLine('brown')}
      >
        <S.IconContainer color="#EFEBE9"><MaterialCommunityIcons name="television-classic" size={24} color="#8D6E63" /></S.IconContainer>
        <S.CardContent>
          <S.CardTitle>Linha Marrom</S.CardTitle>
          <S.CardDescription>TVs, monitores, equipamentos de áudio e vídeo.</S.CardDescription>
        </S.CardContent>
        {selectedLines.includes('brown') && <MaterialCommunityIcons name="check-circle" size={24} color="#8D6E63" />}
      </S.SelectionCard>

      <S.SelectionCard 
        selected={selectedLines.includes('blue')} 
        color="#42A5F5"
        onPress={() => handleSelectLine('blue')}
      >
        <S.IconContainer color="#E3F2FD"><MaterialCommunityIcons name="blender" size={24} color="#42A5F5" /></S.IconContainer>
        <S.CardContent>
          <S.CardTitle>Linha Azul</S.CardTitle>
          <S.CardDescription>Eletroportáteis: Liquidificadores, secadores, ferros.</S.CardDescription>
        </S.CardContent>
        {selectedLines.includes('blue') && <MaterialCommunityIcons name="check-circle" size={24} color="#42A5F5" />}
      </S.SelectionCard>

      <S.SelectionCard 
        selected={selectedLines.includes('white')} 
        color="#9E9E9E"
        onPress={() => handleSelectLine('white')}
      >
        <S.IconContainer color="#F5F5F5"><MaterialCommunityIcons name="fridge" size={24} color="#9E9E9E" /></S.IconContainer>
        <S.CardContent>
          <S.CardTitle>Linha Branca</S.CardTitle>
          <S.CardDescription>Geladeiras, fogões, máquinas de lavar e ar-condicionado.</S.CardDescription>
        </S.CardContent>
        {selectedLines.includes('white') && <MaterialCommunityIcons name="check-circle" size={24} color="#9E9E9E" />}
      </S.SelectionCard>

      <Button 
        title="Continuar" 
        onPress={() => setStep(2)} 
        disabled={selectedLines.length === 0} 
        style={{ marginTop: 20 }}
      />
    </>
  );

  const renderStep2 = () => (
    <>
      <S.SectionTitle>Como deseja descartar?</S.SectionTitle>

      <S.SelectionCard 
        selected={disposalMethod === 'pickup'} 
        onPress={() => setDisposalMethod('pickup')}
      >
        <S.IconContainer color="#E0F2F1"><MaterialCommunityIcons name="truck-delivery" size={28} color="#009688" /></S.IconContainer>
        <S.CardContent>
          <S.CardTitle>Coleta em Casa</S.CardTitle>
          <S.CardDescription>Agendamos a retirada no seu endereço.</S.CardDescription>
        </S.CardContent>
        {disposalMethod === 'pickup' && <MaterialCommunityIcons name="radiobox-marked" size={24} color="#009688" />}
      </S.SelectionCard>

      <S.SelectionCard 
        selected={disposalMethod === 'dropoff'} 
        onPress={() => setDisposalMethod('dropoff')}
      >
        <S.IconContainer color="#E3F2FD"><MaterialCommunityIcons name="map-marker-check" size={28} color="#2196F3" /></S.IconContainer>
        <S.CardContent>
          <S.CardTitle>Levar a um Ponto</S.CardTitle>
          <S.CardDescription>Você leva até o local mais próximo.</S.CardDescription>
        </S.CardContent>
        {disposalMethod === 'dropoff' && <MaterialCommunityIcons name="radiobox-marked" size={24} color="#2196F3" />}
      </S.SelectionCard>

      <Button 
        title="Continuar" 
        onPress={() => setStep(3)} 
        disabled={!disposalMethod} 
        style={{ marginTop: 20 }}
      />
      <Button 
        title="Voltar" 
        onPress={() => setStep(1)} 
        style={{ marginTop: 10, backgroundColor: '#ccc' }}
      />
    </>
  );

  const handleCreateRequest = async () => {
    if (!itemsDescription) {
      Alert.alert("Atenção", "Descreva os itens que serão coletados.");
      return;
    }
    setIsLoading(true);
    
    // Simulação de envio
    await new Promise(r => setTimeout(r, 2000));
    setIsLoading(false);
    
    Alert.alert("Sucesso!", "Sua solicitação de coleta foi criada.", [
      { 
        text: "OK", 
        onPress: () => {
          navigation.goBack();
        } 
      }
    ]);
  };

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
        style={{ 
          height: 120, 
          textAlignVertical: 'top', 
          paddingTop: 15,
          paddingBottom: 15 
        }}
      />

      <S.FormLabel>Endereço de Retirada</S.FormLabel>
      <TextInput 
        value={address}
        onChangeText={setAddress}
        placeholder="Seu endereço"
        rightIcon={<MaterialCommunityIcons name="pencil" size={20} color="#999" />}
      />

      <Button 
        title="Solicitar Coleta" 
        onPress={handleCreateRequest} 
        isLoading={isLoading}
        style={{ marginTop: 20 }}
      />
      <Button title="Voltar" onPress={() => setStep(2)} style={{ marginTop: 10, backgroundColor: '#ccc' }} />
    </>
  );

  const renderDropoffMap = () => {
    const filteredPoints = collectionPoints.filter(p => 
      selectedLines.some(line => p.lines.includes(line))
    );

    return (
      <>
        <S.SectionTitle>Pontos Próximos</S.SectionTitle>
        <S.Subtitle style={{ color: '#666', marginBottom: 15, textAlign: 'left' }}>
          Mostrando locais que aceitam seus materiais selecionados.
        </S.Subtitle>

        {filteredPoints.map(point => (
          <S.PointCard key={point.id}>
            <S.PointName>{point.name}</S.PointName>
            <S.PointAddress>{point.address}</S.PointAddress>
            <S.PointDistance>
              <S.DistanceText>{point.distance}</S.DistanceText>
            </S.PointDistance>
            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
               <MaterialCommunityIcons name="directions" size={16} color="#348e57" />
               <S.CardDescription style={{ color: '#348e57', marginLeft: 5, fontWeight: 'bold' }}>Traçar Rota</S.CardDescription>
            </View>
          </S.PointCard>
        ))}

        <Button title="Voltar" onPress={() => setStep(2)} style={{ marginTop: 20, backgroundColor: '#ccc' }} />
      </>
    );
  };

  return (
    <S.Container>
      <S.Header>
        {/* Botão de Voltar no Topo */}
        <S.BackButton onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
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