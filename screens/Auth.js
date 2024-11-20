import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../services/FirebaseConfig';

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const registerUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User registered:", userCredential.user);
        navigation.navigate('Home'); // Vie käyttäjä Home-näytölle
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user);
        navigation.navigate('Home'); // Vie käyttäjä Home-näytölle
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={registerUser} />
      <Button title="Login" onPress={loginUser} style={{ marginTop: 10 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AuthScreen;
