// Arquivo: src/screens/Auth/LoginScreen/LoginScreen.styles.ts

import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Svg from 'react-native-svg';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export const { width } = Dimensions.get('window');

// --- CONSTANTES DE ESTILO ---
export const PRIMARY_COLOR = '#348e57';
export const BACKGROUND_COLOR = '#f7f7f7';

// --- COMPONENTES ESTILIZADOS ---
export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${BACKGROUND_COLOR};
`;

export const HeaderContainer = styled.View`
  height: 250px;
  justify-content: center;
  align-items: center;
  background-color: ${PRIMARY_COLOR};
`;

export const StyledSvg = styled(Svg)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const HeaderTextContainer = styled.View`
  align-items: center;
  margin-bottom: 70px;
`;

export const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: #fff;
  font-family: 'Montserrat-Bold';
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  color: #fff;
  font-family: 'Montserrat-Regular';
`;

export const FormContainer = styled.View`
  flex: 1;
  background-color: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 0 30px;
  align-items: center;
  margin-top: -30px;
`;

export const LogoImage = styled.Image.attrs({
  resizeMode: 'contain',
})<{
  w?: number;
  h?: number;
}>(({ w = 340, h = 340 }) => ({ 
  width: w,
  height: h,
  position: 'absolute',
  top: -140, 
  alignSelf: 'center',
  zIndex: 10,
}));

export const OptionsContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-bottom: 20px;
  margin-top: 5px;
  padding-left: 15px;
`;

export const CheckboxContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const CheckboxLabel = styled.Text`
  margin-left: 8px;
  color: #666;
  font-size: 14px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  margin-top: 12px;
`;

export const ForgotPasswordText = styled.Text`
  color: ${PRIMARY_COLOR};
  font-size: 14px;
  font-weight: 600;
`;

export const RegisterContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
`;

export const RegisterText = styled.Text`
  font-size: 15px;
  color: #666;
  font-family: 'Montserrat-Regular';
`;

export const RegisterLink = styled.Text`
  font-size: 15px;
  color: ${PRIMARY_COLOR};
  font-family: 'Montserrat-Bold';
  margin-left: 5px;
`;

export const InputIcon = styled(Icon)`
  margin-left: 10px;
`;