// Arquivo: src/screens/Auth/RegisterScreen/RegisterScreen.styles.ts

import styled from 'styled-components/native';
import { COLORS } from '../../../constants/colors';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.white};
`;

export const Header = styled.View`
  padding: 15px 20px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const BackButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.primary};
  font-family: 'Montserrat-Bold';
`;

export const FormContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const StepTitle = styled.Text`
  font-size: 22px;
  font-family: 'Montserrat-Bold';
  color: ${COLORS.text};
  margin-bottom: 20px;
`;

// --- BARRA DE PROGRESSO ---
export const StepsContainer = styled.View`
  margin-bottom: 25px;
`;

export const ProgressBackground = styled.View`
  width: 100%;
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
`;

export const ProgressFill = styled.View`
  height: 100%;
  background-color: ${COLORS.primary};
  border-radius: 3px;
`;

export const StepLabel = styled.Text`
  font-size: 12px;
  color: ${COLORS.textLight};
  margin-top: 8px;
  text-align: right;
  font-family: 'Montserrat-Regular';
`;

// --- FORÇA DA SENHA ---
export const StrengthContainer = styled.View`
  margin-top: 5px;
  margin-bottom: 15px;
`;

export const StrengthBarContainer = styled.View`
  flex-direction: row;
  height: 4px;
  width: 100%;
  background-color: #eee;
  border-radius: 2px;
  overflow: hidden;
`;

interface StrengthProps {
  width: string;
  color: string;
}

export const StrengthBarFill = styled.View<StrengthProps>`
  height: 100%;
  width: ${(props: StrengthProps) => props.width};
  background-color: ${(props: StrengthProps) => props.color};
`;

export const StrengthLabel = styled.Text<{ color: string }>`
  font-size: 11px;
  color: ${(props: { color: any; }) => props.color};
  margin-top: 4px;
  font-family: 'Montserrat-Bold';
  text-align: right;
`;

// --- TEXTO DE AJUDA ---
export const HelperText = styled.Text`
  font-size: 12px;
  color: ${COLORS.textLight};
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  font-family: 'Montserrat-Regular';
`;

// Container para botões lado a lado
export const Row = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-top: 20px;
`;

export const Col = styled.View`
  flex: 1;
`;