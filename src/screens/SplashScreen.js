// src/screens/SplashScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import logo from '../../assets/taddlogo.png'; 

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const phone = await AsyncStorage.getItem('phone');

      setTimeout(() => {
        if (isLoggedIn === 'true') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home', params: { phone } }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      }, 2000);
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#0A4DA2', padding: 10, borderRadius: 10 }}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
      <Text style={styles.appName}>Tat.D</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 120,
    width: 120,
  },
  appName: {
    fontSize: 50,
    fontWeight: '900',
    marginTop: 20,
    color: '#0A4DA2',
  },
});
