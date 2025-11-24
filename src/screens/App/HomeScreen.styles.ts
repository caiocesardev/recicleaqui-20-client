// Arquivo: src/screens/App/HomeScreen/HomeScreen.styles.ts

import styled from 'styled-components/native';
import { PRIMARY_COLOR } from '../Auth/LoginScreen/LoginScreen.styles';

export const Container = styled.View`
  flex: 1;
  background-color: #f2f4f8;
`;

// ============= HEADER =============
export const Header = styled.View`
  background-color: ${PRIMARY_COLOR};
  padding-top: 12px;
  padding-bottom: 40px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  elevation: 0; 
  shadow-opacity: 0;
  z-index: 0; 
  position: relative;
`;

export const HeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px; 
`;

export const AvatarContainer = styled.TouchableOpacity`
  width: 56px; 
  height: 56px; 
  border-radius: 28px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: rgba(255,255,255,0.3);
  overflow: hidden;
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const WelcomeContainer = styled.View`
  flex: 1;
  margin-left: 16px; 
`;

export const HeaderTitle = styled.Text`
  font-size: 22px; 
  font-family: 'Montserrat-Bold';
  color: white;
`;

export const HeaderSubtitle = styled.Text`
  font-size: 14px;
  color: rgba(255,255,255,0.9);
  font-family: 'Montserrat-Regular';
  margin-top: 2px;
`;

export const HeaderIconButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: rgba(255,255,255,0.2);
  border-radius: 14px;
  margin-left: 10px;
`;

// ============= MAIN ACTION =============
export const ActionContainer = styled.View`
  padding: 0 24px;
  margin-top: 10px;
`;

export const MainActionButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${PRIMARY_COLOR};
  padding: 20px;
  border-radius: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
  shadow-color: ${PRIMARY_COLOR};
  shadow-offset: 0px 10px;
  shadow-opacity: 0.4;
  shadow-radius: 15px;
  elevation: 10;
`;

export const IconBox = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
`;

export const ActionContent = styled.View`
  flex: 1;
  margin-left: 16px;
`;

export const ActionTitle = styled.Text`
  font-family: 'Montserrat-Bold';
  color: white;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ActionSubtitle = styled.Text`
  font-family: 'Montserrat-Regular';
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  margin-top: 4px;
`;

// ============= TIPS SECTION =============
export const TipsSection = styled.View`
  margin-top: 30px;
  padding-left: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-family: 'Montserrat-Bold';
  color: #333;
  margin-bottom: 15px;
`;