import React, { useState } from 'react';
import { StatusBar, Keyboard } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

import { AuthStackParamList } from '../../../navigation/types';
import { Button, TextInput } from '../../../components';
import * as S from '../ForgotPasswordScreen/ForgotPasswordScreen.styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPasswordConfirm'>;

const ResetPasswordConfirmScreen = ({ route, navigation }: Props) => {
  const theme = useTheme();
  const { email, code } = route.params;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFinalReset = async () => {
    Keyboard.dismiss();
    setError('');

    if (newPassword.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    if (!hasUpperCase || !hasNumber) {
      setError('A senha deve conter pelo menos 1 letra maiúscula e 1 número.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || '';
      const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password: newPassword }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || 'Código inválido ou expirado.');
        return;
      }

      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (err: any) {
      setError(err.message || 'Erro de conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.ScreenContainer>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      <S.Header>
        <S.BackButton onPress={() => navigation.goBack()}>
          {/* back icon handled by Touchable in styles */}
        </S.BackButton>
        <S.HeaderTitle>Nova Senha</S.HeaderTitle>
        <S.HeaderSubtitle>Digite e confirme sua nova senha segura.</S.HeaderSubtitle>
      </S.Header>

      <S.FormContainer showsVerticalScrollIndicator={false}>
        <S.Card>
          <S.DescriptionText>Defina sua nova senha de acesso.</S.DescriptionText>

          <S.RulesText>ℹ️ Requisitos: Mínimo 8 caracteres, 1 letra maiúscula e 1 número.</S.RulesText>

          <TextInput
            placeholder="Nova Senha"
            secureTextEntry={!showPass}
            value={newPassword}
            onChangeText={(t: string) => setNewPassword(t)}
            rightIcon={
              <S.InputIcon
                name={showPass ? 'eye-off' : 'eye'}
                size={20}
                color={theme.colors.textLight}
                onPress={() => setShowPass(!showPass)}
              />
            }
          />

          <TextInput
            placeholder="Confirmar Senha"
            secureTextEntry={!showConfirmPass}
            value={confirmPassword}
            onChangeText={(t: string) => setConfirmPassword(t)}
            rightIcon={
              <S.InputIcon
                name={showConfirmPass ? 'eye-off' : 'eye'}
                size={20}
                color={theme.colors.textLight}
                onPress={() => setShowConfirmPass(!showConfirmPass)}
              />
            }
          />

          {error ? <S.ErrorMessage>{error}</S.ErrorMessage> : null}

          <S.ButtonContainer>
            <Button title="ALTERAR SENHA" onPress={handleFinalReset} isLoading={isLoading} />
          </S.ButtonContainer>

        </S.Card>
      </S.FormContainer>
    </S.ScreenContainer>
  );
};

export default ResetPasswordConfirmScreen;
