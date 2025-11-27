// Arquivo: src/screens/Auth/ForgotPasswordScreen/ForgotPasswordScreen.tsx

import React, { useState } from 'react';
import { StatusBar, Keyboard, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { AuthStackParamList } from '../../../navigation/types';
import { Button, TextInput } from '../../../components';
import * as S from './ForgotPasswordScreen.styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleBack = () => {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
    else navigation.goBack();
    setError('');
  };

  const handleSendEmail = async () => {
    Keyboard.dismiss();
    setError('');
    if (!email || !email.includes('@') || email.length < 5) {
      setError('Digite um e-mail válido.');
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
        setError(data.message || 'Erro ao enviar e-mail.');
        return;
      }
      setStep(2);
      setError('');
    } catch (error) {
      setError('Erro de conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = () => {
    Keyboard.dismiss();
    setError('');
    if (token.length < 6) {
      setError('O código deve ter 6 números.');
      return;
    }
    setStep(3);
  };

  const handleFinalReset = async () => {
    Keyboard.dismiss();
    setError('');

    // --- VALIDAÇÃO DE PADRÃO DE SENHA ---
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
        body: JSON.stringify({ token, password: newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Código inválido ou expirado.');
      }
      Alert.alert("Sucesso!", "Sua senha foi redefinida. Faça login agora.", [
        { text: "OK", onPress: () => navigation.navigate('Login') }
      ]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCodeInputs = () => (
    <View style={{ position: 'relative', width: '100%', marginBottom: 20 }}>
      <S.CodeInputContainer>
        {Array(6).fill(0).map((_, index) => (
          <S.CodeBox key={index} isFocused={token.length === index}>
            <S.CodeText>{token[index] || ''}</S.CodeText>
          </S.CodeBox>
        ))}
      </S.CodeInputContainer>
      <S.HiddenTextInput
        value={token}
        onChangeText={(t: string) => setToken(t.replace(/[^0-9]/g, '').slice(0, 6))}
        keyboardType="number-pad"
        autoFocus={true}
        caretHidden={true}
      />
    </View>
  );

  return (
    <S.ScreenContainer>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      
      <S.Header>
        <S.BackButton onPress={handleBack}>
          <Icon name="arrow-left" size={28} color={theme.colors.white} />
        </S.BackButton>
        <S.HeaderTitle>
          {step === 1 ? 'Recuperar Senha' : step === 2 ? 'Código de Verificação' : 'Nova Senha'}
        </S.HeaderTitle>
        <S.HeaderSubtitle>
          {step === 1 && 'Informe seu e-mail para receber o código.'}
          {step === 2 && `Enviamos um código para ${email}.`}
          {step === 3 && 'Crie uma nova senha segura.'}
        </S.HeaderSubtitle>
      </S.Header>

      <S.FormContainer showsVerticalScrollIndicator={false}>
        <S.Card>
          
          {step === 1 && (
            <>
              <S.DescriptionText>
                Digite seu e-mail cadastrado. Enviaremos um código de 6 dígitos.
              </S.DescriptionText>
              <TextInput
                placeholder="Seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(t: string) => { setEmail(t); setError(''); }}
                error={error}
                rightIcon={<S.InputIcon name="email-outline" size={22} color={theme.colors.textLight} />}
              />
              {error ? <S.ErrorMessage>{error}</S.ErrorMessage> : null}
              <S.ButtonContainer>
                <Button title="ENVIAR CÓDIGO" onPress={handleSendEmail} isLoading={isLoading} />
              </S.ButtonContainer>
            </>
          )}

          {step === 2 && (
            <>
              <S.DescriptionText>Digite o código recebido:</S.DescriptionText>
              {renderCodeInputs()}
              {error ? <S.ErrorMessage>{error}</S.ErrorMessage> : null}
              <S.ButtonContainer>
                <Button title="VERIFICAR CÓDIGO" onPress={handleVerifyCode} />
              </S.ButtonContainer>
              <Button 
                title="Reenviar E-mail" 
                variant="secondary" 
                onPress={() => { setStep(1); setToken(''); setError(''); }}
                style={{ marginTop: 15 }} 
              />
            </>
          )}

          {step === 3 && (
            <>
              <S.DescriptionText>Defina sua nova senha de acesso.</S.DescriptionText>

              {/* MENSAGEM DE ORIENTAÇÃO ADICIONADA AQUI */}
              <S.RulesText>
                ℹ️ Requisitos: Mínimo 8 caracteres, 1 letra maiúscula e 1 número.
              </S.RulesText>

              <TextInput
                placeholder="Nova Senha"
                secureTextEntry={!showPass}
                value={newPassword}
                onChangeText={(t: string) => setNewPassword(t)}
                rightIcon={
                  <S.InputIcon 
                    name={showPass ? "eye-off" : "eye"} 
                    size={20} color={theme.colors.textLight} 
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
                    name={showConfirmPass ? "eye-off" : "eye"} 
                    size={20} color={theme.colors.textLight} 
                    onPress={() => setShowConfirmPass(!showConfirmPass)}
                  />
                }
              />
              {error ? <S.ErrorMessage>{error}</S.ErrorMessage> : null}
              <S.ButtonContainer>
                <Button title="ALTERAR SENHA" onPress={handleFinalReset} isLoading={isLoading} />
              </S.ButtonContainer>
            </>
          )}

        </S.Card>
      </S.FormContainer>
    </S.ScreenContainer>
  );
};

export default ForgotPasswordScreen;