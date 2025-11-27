// Arquivo: src/screens/Auth/ResetPasswordScreen/ResetPasswordScreen.styles.ts

import styled from 'styled-components/native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.background};
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 60px; 
  background-color: ${(props: any) => props.theme.colors.primary};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  align-items: center;
  height: 180px;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.white};
  margin-top: 10px;
`;

export const HeaderSubtitle = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-top: 5px;
  padding-horizontal: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 10;
  padding: 8px;
  background-color: ${(props: any) => props.theme.colors.whiteTransparent};
  border-radius: 12px;
`;

export const FormContainer = styled.ScrollView`
  flex: 1;
  padding: 24px;
  margin-top: -30px;
`;

export const Card = styled.View`
  background-color: ${(props: any) => props.theme.colors.surface};
  border-radius: 20px;
  padding: 24px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export const InputLabel = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.text};
  margin-bottom: 8px;
  margin-top: 10px;
`;

export const HelperText = styled.Text`
  font-size: 12px;
  font-family: 'Montserrat-Regular';
  color: ${(props: any) => props.theme.colors.textLight};
  margin-bottom: 20px;
  text-align: center;
`;

export const ButtonContainer = styled.View`
  margin-top: 24px;
`;

export const InputIcon = styled(Icon)`
  margin-left: 10px;
`;

// --- NOVOS ESTILOS PARA FEEDBACK PROFISSIONAL ---

export const ErrorMessage = styled.Text`
  color: ${(props: any) => props.theme.colors.error};
  font-size: 13px;
  font-family: 'Montserrat-Bold';
  text-align: center;
  margin-top: 10px;
  background-color: ${(props: any) => props.theme.colors.errorLight || '#ffebee'};
  padding: 10px;
  border-radius: 8px;
  overflow: hidden;
`;

export const SuccessContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: ${(props: any) => props.theme.colors.surface};
  border-radius: 20px;
  margin-top: -30px;
  margin-horizontal: 24px;
  shadow-color: #000;
  elevation: 5;
`;

export const SuccessTitle = styled.Text`
  font-size: 22px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.primary};
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
`;

export const SuccessMessage = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: ${(props: any) => props.theme.colors.textLight};
  text-align: center;
  margin-bottom: 30px;
  line-height: 20px;
`;