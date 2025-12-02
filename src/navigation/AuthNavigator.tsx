// Arquivo: src/navigation/AuthNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';

import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen/ResetPasswordScreen';
import ResetPasswordConfirmScreen from '../screens/Auth/ResetPasswordConfirm/ResetPasswordConfirmScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Login" 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      
      {/* Tela para iniciar recuperação (envio do e-mail) */}
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

      {/* Tela para inserir apenas o código (verificação) */}
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

      {/* Tela para confirmar a nova senha após verificação do código */}
      <Stack.Screen name="ResetPasswordConfirm" component={ResetPasswordConfirmScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;