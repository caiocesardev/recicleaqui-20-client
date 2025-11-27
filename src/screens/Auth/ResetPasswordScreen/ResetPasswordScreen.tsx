// Arquivo: src/screens/Auth/ForgotPasswordScreen/ForgotPasswordScreen.tsx

import React, { useState } from 'react';
import { StatusBar, Keyboard } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { AuthStackParamList } from '../../../navigation/types';
import { Button, TextInput } from '../../../components';
import * as S from '../ForgotPasswordScreen/ForgotPasswordScreen.styles';


type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  // Estado para controlar a visualização de sucesso
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async () => {
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
        if (res.status === 404) {
          setEmailError('E-mail não encontrado em nosso sistema.');
        } else {
          const data = await res.json().catch(() => ({}));
          setEmailError(data.message || 'Não foi possível enviar. Tente novamente.');
        }
        return;
      }

      // SUCESSO: Troca a tela para o feedback visual
      setIsSuccess(true);

    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setEmailError('Sem conexão com o servidor.');
    } finally {
      // Se houver erro, para o loading. Se for sucesso, o loading sai quando o componente remontar ou mantemos até trocar a view
      if (emailError) setIsLoading(false);
    }
  };

  // --- RENDERIZAÇÃO DA TELA DE SUCESSO ---
  if (isSuccess) {
    return (
      <S.ScreenContainer>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
        <S.Header>
          <S.HeaderTitle>E-mail Enviado</S.HeaderTitle>
        </S.Header>

      </S.ScreenContainer>
    );
  }

  // --- RENDERIZAÇÃO DO FORMULÁRIO ---
  return (
    <S.ScreenContainer>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      
      <S.Header>
        <S.BackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color={theme.colors.white} />
        </S.BackButton>
        <S.HeaderTitle>Recuperar Senha</S.HeaderTitle>
        <S.HeaderSubtitle>
          Esqueceu sua senha? Não se preocupe.{'\n'}
          Informe seu e-mail abaixo.
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
          onSubmitEditing={handleResetPassword}
          rightIcon={
            <S.InputIcon 
              name="email-outline" 
              size={22} 
              color={emailError ? theme.colors.error : theme.colors.textLight} 
            />
          }
        />
        
        {/* Mensagem de Erro Inline (caso o componente TextInput não exiba) */}
        {emailError && !emailError.includes('inválido') ? (
           <S.ErrorMessage>{emailError}</S.ErrorMessage>
        ) : null}

        <S.ButtonContainer>
          <Button 
            title="ENVIAR CÓDIGO" 
            onPress={handleResetPassword} 
            isLoading={isLoading}
          />
        </S.ButtonContainer>

      </S.FormContainer>
    </S.ScreenContainer>
  );
};

export default ForgotPasswordScreen;