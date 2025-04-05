import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useVerifyOtpMutation } from '../redux/store/services/authApi.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyOtpScreen = ({ route }) => {
  const navigation = useNavigation();
  const { phone } = route.params;
  const [otp, setOtp] = useState('');
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleVerify = async () => {
    if (otp.length !== 4) {
      Alert.alert('Invalid OTP', 'Enter a 4-character OTP (letters/numbers)');
      return;
    }
  
    try {
      const response = await verifyOtp({ phone, otp }).unwrap();
      console.log('OTP verified successfully:', response);
  
      if (response?.message !== 'OTP verified successfully') {
        Alert.alert('Error', response?.message);
        return;
      }
  
      await AsyncStorage.setItem('token', response.jwt);
      await AsyncStorage.setItem('isLoggedIn', 'true');
  
      Alert.alert('Success', 'OTP Verified!');
  
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { phone } }],
      });
    } catch (err) {
      console.log('Error verifying OTP:', err);
      Alert.alert('Error', err?.data?.message || 'Something went wrong');
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.heading}>Enter OTP sent to {phone}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter OTP here.."
          value={otp}
          onChangeText={setOtp}
          autoCapitalize="characters"
        />

        <TouchableOpacity style={styles.button} onPress={handleVerify} disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? 'Verifying...' : 'Verify OTP'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 6,
  },
  button: {
    backgroundColor: '#0A4DA2',
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
