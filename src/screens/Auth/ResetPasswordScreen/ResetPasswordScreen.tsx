// Tela: Inserir código de verificação (ResetPassword)

import React, { useState } from 'react';
import { StatusBar, Keyboard } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

import { AuthStackParamList } from '../../../navigation/types';
import { Button } from '../../../components';
import * as S from '../ForgotPasswordScreen/ForgotPasswordScreen.styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;

const ResetPasswordScreen = ({ route, navigation }: Props) => {
  const theme = useTheme();
  const { email } = route.params;

  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyCode = async () => {
    Keyboard.dismiss();
    setError('');
    if (!/^\d{6}$/.test(token)) {
      setError('O código deve ter 6 números.');
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || '';
      const res = await fetch(`${apiUrl}/auth/verify-reset-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: token }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || 'Código inválido ou expirado.');
        return;
      }

      navigation.navigate('ResetPasswordConfirm', { email, code: token });
    } catch (err: any) {
      setError(err.message || 'Erro de conexão ao verificar o código.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderCodeInputs = () => (
    <S.CodeInputContainer>
      {Array(6).fill(0).map((_, index) => (
        <S.CodeBox key={index} isFocused={token.length === index}>
          <S.CodeText>{token[index] || ''}</S.CodeText>
        </S.CodeBox>
      ))}
      <S.HiddenTextInput
        value={token}
        onChangeText={(t: string) => setToken(t.replace(/[^0-9]/g, '').slice(0, 6))}
        keyboardType="number-pad"
        autoFocus={true}
        caretHidden={true}
      />
    </S.CodeInputContainer>
  );

  return (
    <S.ScreenContainer>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      <S.Header>
        <S.BackButton onPress={() => navigation.goBack()} />
        <S.HeaderTitle>Verificar Código</S.HeaderTitle>
        <S.HeaderSubtitle>Digite o código enviado para {email}</S.HeaderSubtitle>
      </S.Header>

      <S.FormContainer showsVerticalScrollIndicator={false}>
        <S.Card>
          <S.DescriptionText>Insira o código de 6 dígitos que enviamos para o seu e-mail.</S.DescriptionText>

          {renderCodeInputs()}

          {error ? <S.ErrorMessage>{error}</S.ErrorMessage> : null}

          <S.ButtonContainer>
            <Button title="VERIFICAR CÓDIGO" onPress={handleVerifyCode} isLoading={isLoading} />
          </S.ButtonContainer>
        </S.Card>
      </S.FormContainer>
    </S.ScreenContainer>
  );
};

export default ResetPasswordScreen;