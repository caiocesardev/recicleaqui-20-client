// Arquivo: src/components/GamificationCard/index.tsx

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// --- Interfaces para os Estilos ---
interface BadgeProps {
  color: string;
}

interface ProgressBarFillProps {
  width: string;
}

// --- Estilos Locais ---
const CardContainer = styled.View`
  margin: 10px 20px 20px;
  background-color: #ffffff;
  border-radius: 26px;
  padding: 14px 22px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 8;
  z-index: 2;
`;

const BadgesRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
`;

const BadgeContainer = styled.View<BadgeProps>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  /* Aqui dizemos explicitamente que props é do tipo BadgeProps */
  background-color: ${(props: BadgeProps) => props.color};
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: #fff;
  /* Aqui também */
  shadow-color: ${(props: BadgeProps) => props.color};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 5;
`;

const FeedbackBubble = styled.View`
  background-color: #FFF8E1;
  padding: 8px 16px;
  border-radius: 16px;
  align-self: center;
  margin-bottom: 15px;
  border-width: 1px;
  border-color: #FFE082;
`;

const FeedbackText = styled.Text`
  color: #FF8F00;
  font-family: 'Montserrat-Bold';
  font-size: 12px;
`;

const ProgressBarContainer = styled.View`
  height: 18px;
  background-color: #E0F2F1;
  border-radius: 10px;
  margin-bottom: 8px;
  overflow: hidden;
`;

const ProgressBarFill = styled.View<ProgressBarFillProps>`
  height: 100%;
  /* Aqui dizemos explicitamente que props é do tipo ProgressBarFillProps */
  width: ${(props: ProgressBarFillProps) => props.width};
  background-color: #26A69A;
  border-radius: 10px;
`;

const ProgressTextRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LevelText = styled.Text`
  font-size: 28px;
  font-family: 'Montserrat-Bold';
  color: #333;
`;

const XpText = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: #888;
`;

// --- Interface do Componente ---
interface Props {
  level: number;
  currentXp: number;
  nextXp: number;
}

// --- Componente ---
export const GamificationCard = ({ level, currentXp, nextXp }: Props) => {
  const progressPercent = `${(currentXp / nextXp) * 100}%`;

  return (
    <CardContainer>
      <BadgesRow>
        <BadgeContainer color="#FFD54F">
          <MaterialCommunityIcons name="star" size={24} color="white" />
        </BadgeContainer>
        <BadgeContainer color="#4DB6AC">
           <MaterialCommunityIcons name="shield-check" size={26} color="white" />
        </BadgeContainer>
        <BadgeContainer color="#FF8A65">
           <MaterialCommunityIcons name="medal" size={24} color="white" />
        </BadgeContainer>
      </BadgesRow>

      <FeedbackBubble>
        <FeedbackText>✨ Ótimo progresso! Continue assim.</FeedbackText>
      </FeedbackBubble>

      <View>
        <ProgressTextRow>
          <LevelText>{level}</LevelText>
          <XpText>{currentXp} / {nextXp} XP</XpText>
        </ProgressTextRow>
        
        <ProgressBarContainer>
          <ProgressBarFill width={progressPercent} />
        </ProgressBarContainer>
        
        <XpText style={{ fontSize: 11, textAlign: 'right', marginTop: 4 }}>
          Faltam {nextXp - currentXp} XP para o nível {level + 1}
        </XpText>
      </View>
    </CardContainer>
  );
};