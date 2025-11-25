// Arquivo: src/screens/Auth/ForgotPasswordScreen/ForgotPasswordScreen.styles.ts

import styled from 'styled-components/native';
import { COLORS } from '../../../constants/colors';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.background};
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 60px; 
  background-color: ${COLORS.primary};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-family: 'Montserrat-Bold';
  color: ${COLORS.white};
  margin-top: 10px;
`;

export const HeaderSubtitle = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-horizontal: 20px;
  line-height: 22px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 10;
  padding: 8px;
  background-color: ${COLORS.whiteTransparent || 'rgba(255,255,255,0.2)'};
  border-radius: 12px;
`;

export const FormContainer = styled.View`
  flex: 1;
  padding: 30px 20px;
  align-items: center;
`;

export const DescriptionText = styled.Text`
  font-size: 16px;
  color: #666; 
  text-align: center;
  margin-bottom: 30px;
  font-family: 'Montserrat-Regular';
`;

export const ButtonContainer = styled.View`
  width: 100%;
  margin-top: 20px;
`;

// Componente para o ícone do input
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
export const InputIcon = styled(Icon)`
  margin-left: 10px;
`;