import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { toggleLanguage } from '../redux/store/slices/languageSlice';

const HomeScreen = () => {
  const language = useSelector((state) => state.language.selected);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const phone = route.params?.phone;

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('isLoggedIn');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => dispatch(toggleLanguage())} style={styles.languageButton}>
        <Text style={styles.buttonText}>{language === 'en' ? 'हिन्दी' : 'English'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>{language === 'en' ? 'Logout' : 'लॉगआउट'}</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        {language === 'en'
          ? 'Welcome to the Home Screen!'
          : 'होम स्क्रीन में आपका स्वागत है!'}
      </Text>

      {phone && (
        <Text style={styles.phone}>
          {language === 'en' ? 'Logged in with: ' : 'लॉगिन किया गया नंबर: '} {phone}
        </Text>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  phone: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  languageButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#0A4DA2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#A20A0A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
