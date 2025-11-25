// Arquivo: src/screens/Auth/ForgotPasswordScreen/ForgotPasswordScreen.tsx

import React, { useState } from 'react';
import { StatusBar, Alert, Keyboard } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { AuthStackParamList } from '../../../navigation/types';
import { Button, TextInput } from '../../../components';
import { COLORS } from '../../../constants/colors';
import * as S from './ForgotPasswordScreen.styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleResetPassword = async () => {
    Keyboard.dismiss();
    setEmailError('');

    if (!email || !email.includes('@') || email.length < 5) {
      setEmailError('Digite um e-mail válido.');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

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

      Alert.alert(
        'E-mail Enviado',
        'Enviamos um link de recuperação para o seu e-mail. Verifique sua caixa de entrada (e spam).',
        [
          { 
            text: 'Voltar para Login', 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setEmailError('Sem conexão com o servidor.');
    } finally {
      // Se não houver erro no campo, o loading para (se houve sucesso, o Alert cuida da navegação)
      if (emailError) setIsLoading(false);
    }
  };

  return (
    <S.ScreenContainer>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <S.Header>
        <S.BackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color={COLORS.white} />
        </S.BackButton>
        <S.HeaderTitle>Recuperar Senha</S.HeaderTitle>
        <S.HeaderSubtitle>
          Esqueceu sua senha? Não se preocupe.{'\n'}
          Informe seu e-mail abaixo.
        </S.HeaderSubtitle>
      </S.Header>

      <S.FormContainer>
        <S.DescriptionText>
          Enviaremos um link seguro para você redefinir sua senha.
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
        >
          <S.InputIcon 
            name="email-check-outline" 
            size={22} 
            color={emailError ? COLORS.error : COLORS.textLight} 
          />
        </TextInput>

        <S.ButtonContainer>
          <Button 
            title="ENVIAR LINK" 
            onPress={handleResetPassword} 
            isLoading={isLoading}
          />
        </S.ButtonContainer>

      </S.FormContainer>
    </S.ScreenContainer>
  );
};

export default ForgotPasswordScreen;