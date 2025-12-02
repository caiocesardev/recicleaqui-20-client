// Arquivo: src/screens/Auth/ForgotPasswordScreen/ForgotPasswordScreen.styles.ts

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
  background-color: ${(props: any) => props.theme.colors.whiteTransparent};
  border-radius: 12px;
`;

export const FormContainer = styled.ScrollView`
  flex: 1;
  padding: 24px;
  /* CORREÇÃO: Margem positiva para descer o card e não sobrepor o header */
  margin-top: 10px; 
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
  align-items: center;
  margin-bottom: 40px; /* Espaço extra no final do scroll */
`;

export const DescriptionText = styled.Text`
  font-size: 15px;
  color: ${(props: any) => props.theme.colors.textLight}; 
  text-align: center;
  margin-bottom: 24px;
  font-family: 'Montserrat-Regular';
  line-height: 22px;
`;

// --- NOVO: Texto de Regras de Senha ---
export const RulesText = styled.Text`
  font-size: 12px;
  color: ${(props: any) => props.theme.colors.textLight};
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: center;
  font-family: 'Montserrat-Regular';
  background-color: ${(props: any) => props.theme.colors.background};
  padding: 10px;
  border-radius: 8px;
  width: 100%;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  margin-top: 20px;
`;

export const InputIcon = styled(Icon)`
  margin-left: 10px;
`;

export const ErrorMessage = styled.Text`
  color: ${(props: any) => props.theme.colors.error};
  font-size: 13px;
  font-family: 'Montserrat-Bold';
  text-align: center;
  margin-top: 10px;
  width: 100%;
`;

// --- Success / Feedback ---
export const SuccessContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: ${(props: any) => props.theme.colors.surface};
  border-radius: 20px;
  margin-top: 10px;
  width: 100%;
`;

export const SuccessTitle = styled.Text`
  font-size: 20px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.primary};
  margin-top: 10px;
  margin-bottom: 8px;
  text-align: center;
`;

export const SuccessMessage = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: ${(props: any) => props.theme.colors.textLight};
  text-align: center;
  margin-bottom: 20px;
  line-height: 20px;
`;

// --- OTP / CÓDIGO ---

export const CodeInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

export const CodeBox = styled.View<{ isFocused: boolean }>`
  width: 45px;
  height: 55px;
  border-width: 2px;
  border-color: ${(props: any) => props.isFocused ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 12px;
  background-color: ${(props: any) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const CodeText = styled.Text`
  font-size: 24px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.text};
`;

export const HiddenTextInput = styled.TextInput`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

// --- LINKS ---

export const LinkButton = styled.TouchableOpacity`
  margin-top: 15px;
  padding: 10px;
`;

export const LinkText = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.textLight};
  text-decoration-line: underline;
  text-align: center;
`;