// Arquivo: src/navigation/MainNavigator.tsx

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/colors';

// Telas
import HomeScreen from '../screens/App/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/App/ProfileScreen/ProfileScreen';
import DisposalScreen from '../screens/App/DisposalScreen/DisposalScreen';
import HistoryScreen from '../screens/App/HistoryScreen/HistoryScreen';
import SettingsScreen from '../screens/App/SettingsScreen/SettingsScreen';
import TermsOfUseScreen from '../screens/App/Legal/TermsOfUse'; 
import PrivacyPolicyScreen from '../screens/App/Legal/PrivacyPolicyScreen';
import HelpScreen from '../screens/App/HelpScreen/HelpScreen';

const Drawer = createDrawerNavigator();

// --- MENU PERSONALIZADO ---
function CustomDrawerContent(props: any) {
  const { signOut } = useAuth();
  const currentRoute = props.state.routes[props.state.index].name;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      
      {/* CABEÇALHO */}
      <View style={{ 
        height: 250, 
        backgroundColor: COLORS.primary, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingTop: 40,
        paddingBottom: 10,
        borderBottomRightRadius: 30,
      }}>
        <Image 
           source={require('../../assets/images/logo-recicle-aqui.png')} 
           style={{ width: 250, height: 250, resizeMode: 'contain', tintColor: COLORS.white, marginBottom: -90 }} 
        />
        <Text style={{ color: COLORS.white, fontSize: 24, fontFamily: 'Montserrat-Bold', marginTop: 0 }}>
          Recicle Aqui
        </Text>
      </View>

      {/* LISTA DE ITENS */}
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 10 }}>
        
        {/* 1. Itens Principais  */}
        <DrawerItemList {...props} />

        {/* Linha Divisória */}
        <View style={{ height: 1, backgroundColor: '#e0e0e0', marginVertical: 10, marginHorizontal: 20 }} />

        {/* 2. Itens Secundários  */}
        <DrawerItem 
          label="Configurações"
          icon={({ color }) => <MaterialCommunityIcons name="cog-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('Settings')}
          focused={currentRoute === 'Settings'}
          activeTintColor={COLORS.primary}
          inactiveTintColor={COLORS.text}
          labelStyle={{ fontFamily: 'Montserrat-Bold', marginLeft: -10 }}
        />
        
        <DrawerItem 
          label="Ajuda e Suporte"
          icon={({ color }) => <MaterialCommunityIcons name="help-circle-outline" size={22} color={color} />}
          onPress={() => props.navigation.navigate('Help')}
          focused={currentRoute === 'Help'}
          activeTintColor={COLORS.primary}
          inactiveTintColor={COLORS.text}
          labelStyle={{ fontFamily: 'Montserrat-Bold', marginLeft: -10 }}
        />

      </DrawerContentScrollView>

      {/* RODAPÉ */}
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#eee', marginBottom: 0 }}>
        <TouchableOpacity onPress={signOut} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <MaterialCommunityIcons name="logout" size={22} color={COLORS.error} />
          <Text style={{ marginLeft: 10, color: COLORS.error, fontFamily: 'Montserrat-Bold', fontSize: 14 }}>
            Sair da Conta
          </Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#999', fontSize: 12, fontFamily: 'Montserrat-Regular' }}>
            Versão 1.0.0
          </Text>
          <Text style={{ color: '#ccc', fontSize: 10, fontFamily: 'Montserrat-Regular', marginTop: 4 }}>
            © 2025 RecicleAqui Inc. Todos os direitos reservados.
          </Text>
        </View>
      </View>
    </View>
  );
}

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.text,
        drawerLabelStyle: { fontFamily: 'Montserrat-Bold', marginLeft: -10 },
        drawerStyle: { width: '75%', backgroundColor: COLORS.background },
        drawerType: 'slide',
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ drawerIcon: ({ color }) => <MaterialCommunityIcons name="home-outline" size={22} color={color} />, drawerLabel: "Início" }}
      />
      <Drawer.Screen 
        name="Disposal" 
        component={DisposalScreen} 
        options={{ drawerIcon: ({ color }) => <MaterialCommunityIcons name="recycle" size={22} color={color} />, drawerLabel: "Registrar Descarte" }}
      />
      <Drawer.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{ drawerIcon: ({ color }) => <MaterialCommunityIcons name="history" size={22} color={color} />, drawerLabel: "Histórico" }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ drawerIcon: ({ color }) => <MaterialCommunityIcons name="account-outline" size={22} color={color} />, drawerLabel: "Meu Perfil" }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen 
        name="TermsOfUse" 
        component={TermsOfUseScreen} 
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen 
        name="PrivacyPolicy" 
        component={PrivacyPolicyScreen} 
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen 
        name="Help" 
        component={HelpScreen} 
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;