// Arquivo: src/screens/App/Legal/TermsOfUse/index.tsx

import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/colors';
import * as S from '../../Legal/TermsOfUse/styles';

const TermsOfUseScreen = () => {
  const navigation = useNavigation();

  return (
    <S.Container>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <S.Header>
        <S.BackButton onPress={() => navigation.navigate('Settings' as never)}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
        </S.BackButton>
        <S.Title>Termos de Uso</S.Title>
      </S.Header>

      <S.Content showsVerticalScrollIndicator={false}>
        <S.Paragraph>Última atualização: 25 de Novembro de 2025</S.Paragraph>

        <S.SectionTitle>1. Aceitação dos Termos</S.SectionTitle>
        <S.Paragraph>
          Ao acessar e usar o aplicativo RecicleAqui, você concorda em cumprir e ficar vinculado aos seguintes termos e condições de uso. Se você não concordar com estes termos, não deverá utilizar nosso serviço.
        </S.Paragraph>

        <S.SectionTitle>2. Objetivo do Aplicativo</S.SectionTitle>
        <S.Paragraph>
          O RecicleAqui é uma plataforma que conecta usuários geradores de resíduos eletrônicos a pontos de coleta e empresas de reciclagem certificadas. Não somos responsáveis diretos pelo transporte, salvo quando explicitamente contratado através do serviço de Coleta em Casa.
        </S.Paragraph>

        <S.SectionTitle>3. Responsabilidades do Usuário</S.SectionTitle>
        <S.Paragraph>
          Você é responsável por garantir que as informações fornecidas sobre os itens de descarte sejam verdadeiras. É proibido descartar materiais perigosos não-eletrônicos (como lixo hospitalar ou químico) através desta plataforma.
        </S.Paragraph>

        <S.SectionTitle>4. Gamificação e Pontos</S.SectionTitle>
        <S.Paragraph>
          Os pontos (XP) acumulados no sistema não possuem valor monetário e não podem ser trocados por dinheiro. Eles servem para classificação no ranking e eventuais benefícios com parceiros, sujeitos a alteração sem aviso prévio.
        </S.Paragraph>

        <S.SectionTitle>5. Alterações nos Termos</S.SectionTitle>
        <S.Paragraph>
          Reservamo-nos o direito de modificar estes termos a qualquer momento. Recomendamos que você revise esta página periodicamente.
        </S.Paragraph>

        {/* Espaço extra no final */}
        <S.SectionTitle></S.SectionTitle> 
      </S.Content>
    </S.Container>
  );
};

export default TermsOfUseScreen;