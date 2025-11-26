// Arquivo: src/screens/App/HelpScreen/HelpScreen.tsx

import React from 'react';
import { StatusBar, Linking } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../../../constants/colors';
import * as S from '../SettingsScreen/SettingsScreen.styles'; // Reutilizando estilos para padrão

const HelpScreen = () => {
  const navigation = useNavigation();

  const handleContact = () => {
    Linking.openURL('mailto:suporte@recicleaqui.com');
  };

  return (
    <S.Container>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <S.Header>
        <S.MenuButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MaterialCommunityIcons name="menu" size={28} color={COLORS.white} />
        </S.MenuButton>
        <S.Title>Ajuda</S.Title>
      </S.Header>

      <S.Content>
        <S.SettingItem onPress={() => {}}>
          <MaterialCommunityIcons name="help-circle-outline" size={24} color={COLORS.primary} />
          <S.SettingTextContainer>
            <S.SettingTitle>Perguntas Frequentes (FAQ)</S.SettingTitle>
            <S.SettingSubtitle>Tire suas dúvidas rápidas</S.SettingSubtitle>
          </S.SettingTextContainer>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
        </S.SettingItem>

        <S.SettingItem onPress={handleContact}>
          <MaterialCommunityIcons name="email-outline" size={24} color={COLORS.primary} />
          <S.SettingTextContainer>
            <S.SettingTitle>Fale Conosco</S.SettingTitle>
            <S.SettingSubtitle>suporte@recicleaqui.com</S.SettingSubtitle>
          </S.SettingTextContainer>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
        </S.SettingItem>

        <S.SettingItem onPress={() => {}}>
          <MaterialCommunityIcons name="whatsapp" size={24} color="#25D366" />
          <S.SettingTextContainer>
            <S.SettingTitle>Suporte via WhatsApp</S.SettingTitle>
            <S.SettingSubtitle>Atendimento humano</S.SettingSubtitle>
          </S.SettingTextContainer>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
        </S.SettingItem>

      </S.Content>
    </S.Container>
  );
};

export default HelpScreen;