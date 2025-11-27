// Arquivo: src/screens/App/ProfileScreen/ProfileScreen.styles.ts

import styled from 'styled-components/native';
import { lightTheme } from '../../../constants/colors';

type ThemeProps = {
  theme: typeof lightTheme;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeProps) => props.theme.colors.background};
`;

export const ContentContainer = styled.ScrollView`
  flex: 1;
`;

export const HeaderBackground = styled.View`
  height: 160px;
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  align-items: center;
  padding-top: 60px;
  width: 100%;
`;

export const HeaderTitle = styled.Text`
  color: ${(props: ThemeProps) => props.theme.colors.white};
  font-size: 20px;
  font-family: 'Montserrat-Bold';
  margin-top: 10px;
`;

// --- AQUI ESTÁ A CORREÇÃO ---
// Antes era 'BackButton', agora é 'MenuButton' para bater com o .tsx
export const MenuButton = styled.TouchableOpacity`
  position: absolute;
  top: 60px;
  left: 20px;
  z-index: 10;
  padding: 8px;
  background-color: ${(props: ThemeProps) => props.theme.colors.whiteTransparent};
  border-radius: 12px;
`;

export const AvatarWrapper = styled.View`
  align-self: center;
  margin-top: -60px;
  margin-bottom: 20px;
  position: relative;
  z-index: 10;
`;

export const AvatarImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-width: 4px;
  border-color: ${(props: ThemeProps) => props.theme.colors.background};
  background-color: ${(props: ThemeProps) => props.theme.colors.placeholder}; 
`;

export const EditIconContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${(props: ThemeProps) => props.theme.colors.primary};
  width: 36px;
  height: 36px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  border-width: 3px;
  border-color: ${(props: ThemeProps) => props.theme.colors.background};
  elevation: 4;
`;

export const FormCard = styled.View`
  background-color: ${(props: ThemeProps) => props.theme.colors.surface};
  border-radius: 20px;
  padding: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 3;
  margin-bottom: 20px;
  margin-horizontal: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-family: 'Montserrat-Bold';
  color: ${(props: ThemeProps) => props.theme.colors.text};
  margin-bottom: 15px;
  margin-left: 5px;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: 10px;
`;

interface ColProps {
  flex?: number;
}

export const Col = styled.View<ColProps>`
  flex: ${(props: ColProps) => props.flex || 1};
`;

export const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${(props: ThemeProps) => props.theme.colors.errorBorder}; 
  background-color: ${(props: ThemeProps) => props.theme.colors.errorLight};
  margin: 0 20px 40px 20px;
`;

export const LogoutText = styled.Text`
  color: ${(props: ThemeProps) => props.theme.colors.error};
  font-family: 'Montserrat-Bold';
  font-size: 14px;
  margin-left: 8px;
`;