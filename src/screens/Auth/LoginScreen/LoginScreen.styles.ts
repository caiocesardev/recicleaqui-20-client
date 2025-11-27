// Arquivo: src/screens/Auth/LoginScreen/LoginScreen.styles.ts

import styled from 'styled-components/native';
import Svg from 'react-native-svg';

// --- COMPONENTES ESTILIZADOS ---

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.background};
`;

export const HeaderContainer = styled.View`
  height: 250px;
  justify-content: center;
  align-items: center;
  background-color: ${(props: any) => props.theme.colors.primary};
`;

export const StyledSvg = styled(Svg)`
  position: absolute;
  bottom: -1px; 
  left: 0;
  right: 0;
`;

export const HeaderTextContainer = styled.View`
  align-items: center;
  margin-bottom: 70px;
`;

export const Title = styled.Text`
  font-size: 40px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.white};
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  font-family: 'Montserrat-Regular';
  color: ${(props: any) => props.theme.colors.white};
  opacity: 0.9;
`;

export const FormContainer = styled.View`
  flex: 1;
  /* Fundo do cartão (Branco no Light / Cinza no Dark) */
  background-color: ${(props: any) => props.theme.colors.surface};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 0 30px;
  align-items: center;
  margin-top: -30px;
`;

export const LogoImage = styled.Image`
  width: 340px;
  height: 340px;
  resize-mode: contain;
  position: absolute;
  top: -140px;
  align-self: center;
  z-index: 10;
`;

export const InputsWrapper = styled.View`
  margin-top: 80px;
  width: 100%;
  gap: 5px; 
`;

export const OptionsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const CheckboxContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const CheckboxLabel = styled.Text`
  margin-left: 8px;
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: ${(props: any) => props.theme.colors.text};
`;

export const ForgotPasswordButton = styled.TouchableOpacity``;

export const ForgotPasswordText = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.primary};
`;

export const RegisterContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
  align-items: center;
`;

export const RegisterText = styled.Text`
  font-size: 15px;
  font-family: 'Montserrat-Regular';
  color: ${(props: any) => props.theme.colors.textLight};
`;

export const RegisterLink = styled.Text`
  font-size: 15px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.primary};
  margin-left: 5px;
`;