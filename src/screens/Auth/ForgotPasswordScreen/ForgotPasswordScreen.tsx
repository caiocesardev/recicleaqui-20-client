// Arquivo: src/screens/Auth/ForgotPasswordScreen/ForgotPasswordScreen.tsx

import React, { useState } from 'react';
import { StatusBar, Keyboard } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { AuthStackParamList } from '../../../navigation/types';
import { Button, TextInput } from '../../../components';
import * as S from './ForgotPasswordScreen.styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSendEmail = async () => {
    Keyboard.dismiss();
    setEmailError('');
    if (!email || !email.includes('@') || email.length < 5) {
      setEmailError('Digite um e-mail válido.');
      return;
    }
    setIsLoading(true);
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || '';
      const res = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        setIsLoading(false);
        const data = await res.json().catch(() => ({}));
        setEmailError(data.message || 'Erro ao enviar e-mail.');
        return;
      }

      // Navega para a tela de verificação do código
      navigation.navigate('ResetPassword', { email });
    } catch (error) {
      setEmailError('Erro de conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.ScreenContainer>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <S.Header>
        <S.BackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color={theme.colors.white} />
        </S.BackButton>
        <S.HeaderTitle>Recuperar Senha</S.HeaderTitle>
        <S.HeaderSubtitle>
          Esqueceu sua senha? Não se preocupe.{'\n'}Informe seu e-mail abaixo.
        </S.HeaderSubtitle>
      </S.Header>

      <S.FormContainer>
        <S.DescriptionText>
          Enviaremos um código seguro para você redefinir sua senha.
        </S.DescriptionText>

        <TextInput
          placeholder="Seu e-mail cadastrado"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(t) => { setEmail(t); setEmailError(''); }}
          error={emailError}
          returnKeyType="send"
          onSubmitEditing={handleSendEmail}
          rightIcon={
            <S.InputIcon name="email-outline" size={22} color={emailError ? theme.colors.error : theme.colors.textLight} />
          }
        />

        {emailError ? <S.ErrorMessage>{emailError}</S.ErrorMessage> : null}

        <S.ButtonContainer>
          <Button title="ENVIAR CÓDIGO" onPress={handleSendEmail} isLoading={isLoading} />
        </S.ButtonContainer>
      </S.FormContainer>
    </S.ScreenContainer>
  );
};

export default ForgotPasswordScreen;