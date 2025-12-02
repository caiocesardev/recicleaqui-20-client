// Arquivo: src/screens/App/HelpScreen/HelpScreen.styles.ts

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.background};
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 60px;
  background-color: ${(props: any) => props.theme.colors.primary};
  height: 140px;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  position: relative;
  z-index: 10;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.white};
  margin-top: 20px;
`;

export const MenuButton = styled.TouchableOpacity`
  position: absolute;
  top: 60px;
  left: 20px;
  z-index: 10;
  padding: 8px;
  background-color: ${(props: any) => props.theme.colors.whiteTransparent};
  border-radius: 12px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

// Item de Configuração (Linha com ícone, texto e switch/seta)
export const SettingItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${(props: any) => props.theme.colors.surface};
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 12px;
  elevation: 1;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 2px;
`;

export const SettingTextContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const SettingTitle = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat-Bold';
  color: ${(props: any) => props.theme.colors.text};
`;

export const SettingSubtitle = styled.Text`
  font-size: 12px;
  font-family: 'Montserrat-Regular';
  color: ${(props: any) => props.theme.colors.textLight};
  margin-top: 2px;
`;