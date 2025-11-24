// Arquivo: src/navigation/MainNavigator.tsx

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

// Importações diretas das telas
import HomeScreen from '../screens/App/HomeScreen';
import ProfileScreen from '../screens/App/ProfileScreen/ProfileScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ 
        height: 250, 
        backgroundColor: '#348e57', 
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
             tintColor: 'white',
             marginBottom: -20 
           }} 
        />
        <Text style={{ 
          color: 'white', 
          fontSize: 24, 
          fontFamily: 'Montserrat-Bold',
          marginTop: 0 
        }}>
          Recicle Aqui
        </Text>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#eee', marginBottom: 50 }}>
        <TouchableOpacity onPress={signOut} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="logout" size={22} color="#E74C3C" />
          <Text style={{ marginLeft: 10, color: '#E74C3C', fontFamily: 'Montserrat-Bold' }}>
            Sair da Conta
          </Text>
        </TouchableOpacity>
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
        drawerActiveTintColor: '#348e57',
        drawerInactiveTintColor: '#333',
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