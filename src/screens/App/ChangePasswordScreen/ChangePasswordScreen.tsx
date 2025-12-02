// Arquivo: src/screens/App/ChangePasswordScreen/ChangePasswordScreen.tsx

import React, { useState, useEffect } from 'react';
import { Alert, View, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components/native';

import { Button, TextInput } from '../../../components';
import * as S from './ChangePasswordScreen.styles';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    const checkStrength = (pass: string) => {
      if (!pass) return 0;
      const hasLength = pass.length >= 8;
      const hasUpper = /[A-Z]/.test(pass);
      const hasNumber = /[0-9]/.test(pass);
      const hasSpecial = /[^A-Za-z0-9]/.test(pass);

      if (!hasLength || !hasUpper || !hasNumber) return 1;
      let score = 2;
      if (hasSpecial) score += 1;
      if (pass.length > 10 && hasSpecial) score += 1;
      return score;
    };
    setPasswordStrength(checkStrength(newPassword));
  }, [newPassword]);

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return theme.colors.error;
    if (passwordStrength === 2) return '#ffbb33';
    if (passwordStrength === 3) return '#00C851';
    return '#007E33';
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 1) return 'Fraca';
    if (passwordStrength === 2) return 'Média';
    if (passwordStrength === 3) return 'Forte';
    return 'Muito Forte';
  };

  const handleChangePassword = async () => {
    // Validações de formulário
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (passwordStrength < 2) {
      Alert.alert('Senha Fraca', 'Mínimo 8 caracteres, 1 maiúscula e 1 número.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Erro', 'As senhas não conferem.');
      return;
    }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Sessão expirada', 'Faça login novamente para alterar sua senha.');
        return;
      }

      const rawBase = process.env.EXPO_PUBLIC_API_URL || '';
      const apiUrl = (rawBase.replace(/\/$/, '') || 'https://berta-journalish-outlandishly.ngrok-free.dev/api/v1');

      const response = await fetch(`${apiUrl}/clients/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data: { message?: string } = await response.json().catch(() => ({} as any));

      if (!response.ok) {
        // Mapeamento simples de erros
        if (response.status === 400 || response.status === 401) {
          Alert.alert('Falha ao alterar senha', data.message || 'Verifique a senha atual e tente novamente.');
        } else if (response.status === 429) {
          Alert.alert('Muitas tentativas', 'Tente novamente em alguns minutos.');
        } else {
          Alert.alert('Erro', data.message || 'Não foi possível alterar a senha.');
        }
        return;
      }
        // Sucesso: mostra banner e navega de volta após breve intervalo
        setSuccessVisible(true);
        // Limpa campos sensíveis
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setTimeout(() => {
          setSuccessVisible(false);
          navigation.goBack();
        }, 1800);
    } catch (error: any) {
      Alert.alert('Erro de conexão', error?.message || 'Não foi possível alterar a senha.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      
      <S.Header>
        <S.BackButton onPress={() => navigation.navigate('Settings' as never)}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.white} />
        </S.BackButton>
        <S.Title>Alterar Senha</S.Title>
      </S.Header>

      <S.Content>
          {successVisible && (
            <View style={{
              backgroundColor: '#1DB954',
              borderRadius: 8,
              paddingVertical: 10,
              paddingHorizontal: 14,
              marginBottom: 12,
            }}>
              <View>
                <S.Description style={{ color: '#fff', marginBottom: 0 }}>
                  Senha alterada com sucesso.
                </S.Description>
              </View>
            </View>
          )}
        <S.Description>
            Para sua segurança, escolha uma senha forte e não a compartilhe com ninguém.
        </S.Description>

        <S.FormCard>
          <TextInput 
            placeholder="Senha Atual" value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry={!showCurrentPass}
            rightIcon={<MaterialCommunityIcons name={showCurrentPass ? "eye-off" : "eye"} size={20} color={theme.colors.textLight} />}
            onRightPress={() => setShowCurrentPass(!showCurrentPass)}
          />

          <S.HelperText>Mínimo 8 caracteres, 1 maiúscula e 1 número.</S.HelperText>
          
          <TextInput 
            placeholder="Nova Senha" value={newPassword} onChangeText={setNewPassword} secureTextEntry={!showNewPass}
            rightIcon={<MaterialCommunityIcons name={showNewPass ? "eye-off" : "eye"} size={20} color={theme.colors.textLight} />}
            onRightPress={() => setShowNewPass(!showNewPass)}
          />

          {newPassword.length > 0 && (
              <S.StrengthContainer>
                <S.StrengthBarContainer>
                  <S.StrengthBarFill width={`${(passwordStrength / 4) * 100}%`} color={getStrengthColor()} />
                </S.StrengthBarContainer>
                <S.StrengthLabel color={getStrengthColor()}>{getStrengthLabel()}</S.StrengthLabel>
              </S.StrengthContainer>
          )}

          <TextInput 
            placeholder="Confirmar Nova" value={confirmNewPassword} onChangeText={setConfirmNewPassword} secureTextEntry={!showConfirmPass}
            rightIcon={<MaterialCommunityIcons name={showConfirmPass ? "eye-off" : "eye"} size={20} color={theme.colors.textLight} />}
            onRightPress={() => setShowConfirmPass(!showConfirmPass)}
          />

          <View style={{ marginTop: 20 }}>
            <Button title="ATUALIZAR SENHA" onPress={handleChangePassword} isLoading={isLoading} />
          </View>
        </S.FormCard>
      </S.Content>
    </S.Container>
  );
};

export default ChangePasswordScreen;