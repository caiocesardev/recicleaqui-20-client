import styled from 'styled-components/native';
import { PRIMARY_COLOR, BACKGROUND_COLOR } from '../LoginScreen/LoginScreen.styles';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${BACKGROUND_COLOR};
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 60px; 
  background-color: ${PRIMARY_COLOR};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-family: 'Montserrat-Bold';
  color: #fff;
  margin-top: 10px;
`;

export const HeaderSubtitle = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: #e0e0e0;
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
  padding: 5px;
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