// Arquivo: src/screens/Auth/LoginScreen/LoginScreen.tsx

import React, { useState } from 'react';
import { StatusBar, TouchableOpacity, View, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// Importação correta dos ícones (SDK 54)
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'; 

// Importação do Hook de Autenticação
import { useAuth } from '../../../context/AuthContext';

import { Button, TextInput } from '../../../components'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/AuthNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

import * as S from './LoginScreen.styles';
import { Path } from 'react-native-svg';

const LoginScreen = ({ navigation }: Props) => {
  // Pegamos a função signIn do nosso contexto
  const { signIn } = useAuth();

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
    
    if (!email.includes('@') || email.length < 5) {
      setEmailError('Digite um e-mail válido');
      isValid = false;
    }
    if (password.length < 6) {
      setPasswordError('A senha deve ter no mínimo 6 caracteres');
      isValid = false;
    }
    return isValid;
  };
  
  const handleLogin = async () => {
    Keyboard.dismiss();

    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const BASE_URL = 'https://berta-journalish-outlandishly.ngrok-free.dev';
      
      const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        const errorMessage = result?.message || result?.error || 'Erro desconhecido';

        if (res.status === 404) {
          setEmailError('E-mail não cadastrado.');
        } else if (res.status === 401) {
          setPasswordError('Senha incorreta.');
        } else {
          setPasswordError(errorMessage);
        }
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
        setPasswordError('Erro: Token inválido recebido.');
      }

    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setPasswordError('Sem conexão com o servidor.'); 
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register'); 
  };

  return (
    <S.ScreenContainer>
      <StatusBar barStyle="light-content" backgroundColor={S.PRIMARY_COLOR} />
      
      <S.HeaderContainer>
        <S.HeaderTextContainer>
          <S.Title>Recicle Aqui</S.Title>
          <S.Subtitle>Descarte de lixo eletrônico inteligente</S.Subtitle>
        </S.HeaderTextContainer>
        <S.StyledSvg
          height="80"
          width={S.width}
          viewBox={`0 0 ${S.width} 80`}
        >
          <Path
            fill="#fff"
            d={`M0,80 Q${S.width / 2},0 ${S.width},80 Z`}
          />
        </S.StyledSvg>
      </S.HeaderContainer>

      <S.FormContainer>
        <S.LogoImage source={require('../../../../assets/images/logo-recicle-aqui.png')} />
        
        <View style={{ marginTop: 80, width: '100%' }}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(t) => { setEmail(t); setEmailError(''); }}
            error={emailError}
          >
            <S.InputIcon name="email-outline" size={22} color={emailError ? '#ff4444' : '#888'} />
          </TextInput>

          <TextInput
            placeholder="Senha"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={(t) => { setPassword(t); setPasswordError(''); }}
            error={passwordError}
          >
            <TouchableOpacity onPress={() => setPasswordVisible(prev => !prev)}>
              <S.InputIcon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color={passwordError ? '#ff4444' : '#888'} />
            </TouchableOpacity>
          </TextInput>
          
          <S.OptionsContainer>
            <S.CheckboxContainer onPress={() => setRememberMe(prev => !prev)}>
              <Icon 
                name={rememberMe ? 'toggle-switch' : 'toggle-switch-off-outline'} 
                size={30} 
                color={S.PRIMARY_COLOR} 
              />
              <S.CheckboxLabel>Manter-me conectado</S.CheckboxLabel>
            </S.CheckboxContainer>
            <S.ForgotPasswordButton onPress={() => alert('Navegar para Esqueci a Senha!')}>
              <S.ForgotPasswordText>Esqueci a senha</S.ForgotPasswordText>
            </S.ForgotPasswordButton>
          </S.OptionsContainer>

          <Button title="ENTRAR" onPress={handleLogin} isLoading={isLoading} />
        </View>
        
        <S.RegisterContainer>
          <S.RegisterText>Não tem uma conta?</S.RegisterText>
          <TouchableOpacity onPress={handleNavigateToRegister}>
            <S.RegisterLink>Cadastre-se</S.RegisterLink>
          </TouchableOpacity>
        </S.RegisterContainer>
        
      </S.FormContainer>
    </S.ScreenContainer>
  );
};

export default LoginScreen;