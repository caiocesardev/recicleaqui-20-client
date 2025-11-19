// Arquivo: src/App.tsx

import React from 'react';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

// Importações dos Navegadores
import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';
import { AuthProvider, useAuth } from './src/context/AuthContext';

// --- Componente Interno que decide a navegação ---
function RootNavigation() {
  const { isLoggedIn, isLoading } = useAuth(); 

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#348e57" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

// --- Componente Principal ---
export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#348e57" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <RootNavigation />
    </AuthProvider>
  );
}