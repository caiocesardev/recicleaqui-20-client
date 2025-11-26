// Arquivo: src/navigation/MainNavigator.tsx

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/colors';

// Importações diretas das telas
import HomeScreen from '../screens/App/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/App/ProfileScreen/ProfileScreen';
import DisposalScreen from '../screens/App/DisposalScreen/DisposalScreen';
import HistoryScreen from '../screens/App/HistoryScreen/HistoryScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ 
        height: 250, 
        backgroundColor: COLORS.primary, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingTop: 40,
        paddingBottom: 10
      }}>
        <Image 
           source={require('../../assets/images/logo-recicle-aqui.png')} 
           style={{ 
             width: 150, 
             height: 150, 
             resizeMode: 'contain', 
             tintColor: COLORS.white,
             marginBottom: -20 
           }} 
        />
        <Text style={{ 
          color: COLORS.white, 
          fontSize: 24, 
          fontFamily: 'Montserrat-Bold',
          marginTop: 0 
        }}>
          Recicle Aqui
        </Text>
      </View>

      {/* Lista de Itens do Menu */}
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Botão de Sair no Rodapé */}
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#eee', marginBottom: 20 }}>
        <TouchableOpacity onPress={signOut} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="logout" size={22} color={COLORS.error} />
          <Text style={{ marginLeft: 10, color: COLORS.error, fontFamily: 'Montserrat-Bold' }}>
            Sair da Conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- NAVEGADOR  ---
const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, 
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.text,
        drawerLabelStyle: { fontFamily: 'Montserrat-Bold', marginLeft: -10 },
        drawerStyle: { width: '80%' }, 
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="home" size={22} color={color} />,
          drawerLabel: "Início"
        }}
      />
      
      <Drawer.Screen 
        name="Disposal" 
        component={DisposalScreen} 
        options={{
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="recycle" size={22} color={color} />,
          drawerLabel: "Registrar Descarte"
        }}
      />

      <Drawer.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="history" size={22} color={color} />,
          drawerLabel: "Histórico"
        }}
      />

      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="account" size={22} color={color} />,
          drawerLabel: "Meu Perfil"
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;