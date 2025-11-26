// Arquivo: src/screens/App/HomeScreen/HomeScreen.styles.ts

import styled from 'styled-components/native';
import { COLORS } from '../../../constants/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.background};
`;

// ============= HEADER =============
export const Header = styled.View`
  background-color: ${COLORS.primary};
  height: 140px; 
  justify-content: center; 
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
  width: 100%;
  margin-top: 20px; 
`;

// --- AVATAR MAIOR ---
export const AvatarContainer = styled.TouchableOpacity`
  width: 70px;  
  height: 70px; 
  border-radius: 35px; 
  background-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: ${COLORS.whiteTransparent};
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
  font-size: 26px; 
  font-family: 'Montserrat-Bold';
  color: ${COLORS.white};
`;

export const HeaderSubtitle = styled.Text`
  font-size: 16px; 
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Montserrat-Regular';
  margin-top: 4px;
`;

// --- BOTÕES DO MENU MAIORES ---
export const HeaderIconButton = styled.TouchableOpacity`
  padding: 12px; 
  background-color: ${COLORS.whiteTransparent};
  border-radius: 16px; 
  margin-left: 10px;
`;

// ============= MAIN ACTION =============
export const ActionContainer = styled.View`
  padding: 0 24px;
  margin-top: 10px;
`;

export const MainActionButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${COLORS.primary};
  padding: 20px;
  border-radius: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
  shadow-color: ${COLORS.primary};
  shadow-offset: 0px 10px;
  shadow-opacity: 0.4;
  shadow-radius: 15px;
  elevation: 10;
`;

export const IconBox = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background-color: ${COLORS.whiteTransparent};
  align-items: center;
  justify-content: center;
`;

export const ActionContent = styled.View`
  flex: 1;
  margin-left: 16px;
`;

export const ActionTitle = styled.Text`
  font-family: 'Montserrat-Bold';
  color: ${COLORS.white};
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
  color: ${COLORS.text};
  margin-bottom: 15px;
`;