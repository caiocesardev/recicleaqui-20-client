// Arquivo: src/screens/App/SettingsScreen/SettingsScreen.tsx

import React, { useState } from 'react';
import { Switch, StatusBar, Alert } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../../../constants/colors';
import * as S from './SettingsScreen.styles';

const SettingsScreen = () => {
  const navigation = useNavigation();
  
  // Estados simulados
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <S.Container>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <S.Header>
        <S.MenuButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MaterialCommunityIcons name="menu" size={28} color={COLORS.white} />
        </S.MenuButton>
        <S.Title>Configurações</S.Title>
      </S.Header>

      <S.Content>
        
        {/* Notificações */}
        <S.SettingItem activeOpacity={1}>
          <MaterialCommunityIcons name="bell-outline" size={24} color={COLORS.primary} />
          <S.SettingTextContainer>
            <S.SettingTitle>Notificações Push</S.SettingTitle>
            <S.SettingSubtitle>Receber alertas sobre coletas</S.SettingSubtitle>
          </S.SettingTextContainer>
          <Switch 
            value={notificationsEnabled} 
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#ddd', true: COLORS.secondary }}
            thumbColor={notificationsEnabled ? COLORS.primary : '#f4f3f4'}
          />
        </S.SettingItem>

        {/* Tema Escuro  */}
        <S.SettingItem activeOpacity={1}>
          <MaterialCommunityIcons name="theme-light-dark" size={24} color={COLORS.primary} />
          <S.SettingTextContainer>
            <S.SettingTitle>Modo Escuro</S.SettingTitle>
            <S.SettingSubtitle>Em breve</S.SettingSubtitle>
          </S.SettingTextContainer>
          <Switch 
            value={darkMode} 
            onValueChange={() => Alert.alert("Em breve", "Funcionalidade em desenvolvimento")}
            disabled={true}
          />
        </S.SettingItem>

        {/* Links de Navegação  */}
        <S.SettingItem onPress={() => navigation.navigate('TermsOfUse' as never)}>
          <MaterialCommunityIcons name="file-document-outline" size={24} color="#666" />
          <S.SettingTextContainer>
            <S.SettingTitle>Termos de Uso</S.SettingTitle>
          </S.SettingTextContainer>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
        </S.SettingItem>

        <S.SettingItem onPress={() => navigation.navigate('PrivacyPolicy' as never)}>
          <MaterialCommunityIcons name="shield-account-outline" size={24} color="#666" />
          <S.SettingTextContainer>
            <S.SettingTitle>Política de Privacidade</S.SettingTitle>
          </S.SettingTextContainer>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
        </S.SettingItem>

        

      </S.Content>
    </S.Container>
  );
};

export default SettingsScreen;