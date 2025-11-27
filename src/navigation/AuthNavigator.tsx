// Arquivo: src/navigation/AuthNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';

import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen/ForgotPasswordScreen';

// REMOVA A IMPORTAÇÃO DE RESETPASSWORD

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Login" 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      
      {/* Esta tela agora faz todo o fluxo (Email -> Código -> Senha) */}
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      
      {/* REMOVA A LINHA DO STACK.SCREEN DE RESETPASSWORD */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;