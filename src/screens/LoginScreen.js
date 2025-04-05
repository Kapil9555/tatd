import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard,TouchableWithoutFeedback, } from 'react-native';
import { useSendOtpMutation } from '../redux/store/services/authApi';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({}) => {
  const navigation = useNavigation();

  const [phone, setPhone] = useState('');
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const handleSubmit = async () => {
    if (!/^\d{10}$/.test(phone)) {
      Alert.alert('Invalid Number', 'Enter a valid 10-digit number');
      return;
    }

    try {
      const response = await sendOtp(phone).unwrap();
      console.log('OTP sent successfully:', response);
      if(response?.message == 'OTP sent successfully'){
        Alert.alert('OTP Sent', JSON.stringify(response?.message));
        navigation.navigate('VerifyOtp', { phone });
      }else{
        Alert.alert('Error', JSON.stringify(response?.message));
      }
    } catch (err) {
      console.error("check error message",err);
      Alert.alert('Error','Something went wrong');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <View style={styles.card}>
     
        <View style={styles.header}>
          <Text style={styles.headerText}>Customer Login</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.icon}>📞</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Num"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    borderRadius: 10,
    borderColor: '#0A4DA2',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
    overflow: 'hidden',
  },
  ribbonContainer: {
    backgroundColor: '#0A4DA2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 20,
  },
  ribbonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  header: {
    backgroundColor: '#0A4DA2',
    paddingVertical: 20,
    alignItems: 'center',
    borderTopRightRadius: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0A4DA2',
    marginTop: 25,
    marginHorizontal: 100,
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
