// Arquivo: src/screens/Auth/LoginScreen/LoginScreen.tsx

import React, { useState, useCallback } from 'react';
import { StatusBar, TouchableOpacity, Keyboard, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Path } from 'react-native-svg';
import { useTheme } from 'styled-components/native'; // <-- Hook do Tema

import { useAuth } from '../../../context/AuthContext';
import { Button, TextInput } from '../../../components'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';

import * as S from './LoginScreen.styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }: Props) => {
  const { signIn } = useAuth();
  const theme = useTheme(); 

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Por favor, digite seu e-mail.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Formato de e-mail inválido.');
      isValid = false;
    }
    
    if (!password) {
      setPasswordError('Por favor, digite sua senha.');
      isValid = false;
    }
    return isValid;
  };
  
  const handleLogin = useCallback(async () => {
    Keyboard.dismiss();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      
      if (!apiUrl) throw new Error('URL da API não configurada');

      const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
      const fullUrl = `${baseUrl}/auth/login`;

      const res = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        if (res.status === 404) setEmailError('E-mail não encontrado.');
        else if (res.status === 401) setPasswordError('Senha incorreta.');
        else setPasswordError(result?.message || 'Erro desconhecido');
        return;
      }

      const token = result?.token;
      const user = result?.user;
      
      if (token) {
        if (user && user.id) {
          await AsyncStorage.setItem('userId', String(user.id));
        }
        await signIn(token);
      } else {
        setIsLoading(false);
        setPasswordError('Erro: Token inválido.');
      }

    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setPasswordError('Sem conexão com o servidor.'); 
    }
  }, [email, password, signIn]);

  return (
    <S.ScreenContainer>
      {/* StatusBar usa cor do tema primário */}
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      
      <S.HeaderContainer>
        <S.HeaderTextContainer>
          <S.Title>Recicle Aqui</S.Title>
          <S.Subtitle>Descarte de lixo eletrônico inteligente</S.Subtitle>
        </S.HeaderTextContainer>
        
        {/* Curva SVG adaptável ao tema */}
        <S.StyledSvg height="80" width={width} viewBox={`0 0 ${width} 80`}>
          <Path
            fill={theme.colors.surface} 
            d={`M0,80 Q${width / 2},0 ${width},80 Z`}
          />
        </S.StyledSvg>
      </S.HeaderContainer>

      <S.FormContainer>
        <S.LogoImage source={require('../../../../assets/images/logo-recicle-aqui.png')} />
        
        <S.InputsWrapper>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(t) => { setEmail(t); setEmailError(''); }}
            error={emailError}
            rightIcon={
              <MaterialCommunityIcons 
                name="email-outline" 
                size={22} 
                color={emailError ? theme.colors.error : theme.colors.textLight} 
              />
            }
          />

          <TextInput
            placeholder="Senha"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={(t) => { setPassword(t); setPasswordError(''); }}
            error={passwordError}
            rightIcon={
              <MaterialCommunityIcons 
                name={isPasswordVisible ? 'eye-off' : 'eye'} 
                size={24} 
                color={passwordError ? theme.colors.error : theme.colors.textLight} 
              />
            }
            onRightPress={() => setPasswordVisible(prev => !prev)}
          />
          
          <S.OptionsContainer>
            <S.CheckboxContainer onPress={() => setRememberMe(prev => !prev)}>
              <MaterialCommunityIcons 
                name={rememberMe ? 'toggle-switch' : 'toggle-switch-off-outline'} 
                size={30} 
                color={theme.colors.primary} // Cor do tema
              />
              <S.CheckboxLabel>Manter-me conectado</S.CheckboxLabel>
            </S.CheckboxContainer>
            
            <S.ForgotPasswordButton onPress={() => navigation.navigate('ForgotPassword')}>
              <S.ForgotPasswordText>Esqueci a senha</S.ForgotPasswordText>
            </S.ForgotPasswordButton>
          </S.OptionsContainer>

          <Button title="ENTRAR" onPress={handleLogin} isLoading={isLoading} />
        </S.InputsWrapper>
        
        <S.RegisterContainer>
          <S.RegisterText>Não tem uma conta?</S.RegisterText>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <S.RegisterLink>Cadastre-se</S.RegisterLink>
          </TouchableOpacity>
        </S.RegisterContainer>
        
      </S.FormContainer>
    </S.ScreenContainer>
  );
};

export default LoginScreen;