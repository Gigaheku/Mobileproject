import React, { useState } from 'react'; // Import React and useState for state management
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native'; // Import necessary React Native components
import { auth } from '../services/FirebaseConfig'; // Import Firebase authentication instance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth methods

// AuthScreen component handles user authentication
const AuthScreen = () => {
  // State variables to manage user input and screen mode (Login/SignUp)
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Sign Up modes

  // Function to handle user authentication (Login or Sign Up)
  const handleAuth = async () => {
    try {
      if (isLogin) {
        // If Login mode, authenticate the user with email and password
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'You are now logged in!'); // Show success message
      } else {
        // If Sign Up mode, create a new user account
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Account created successfully!'); // Show success message
      }
    } catch (error) {
      // Handle errors (e.g., invalid credentials, network issues)
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* App title at the top of the screen */}
      <Text style={styles.appTitle}>BookTracker</Text>
      
      {/* Header text for the current mode (Log In or Sign Up) */}
      <Text style={styles.header}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
      
      {/* Input field for the user's email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail} // Updates the email state when the input changes
        autoCapitalize="none" // Prevents automatic capitalization
        keyboardType="email-address" // Displays a keyboard optimized for email entry
      />
      
      {/* Input field for the user's password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword} // Updates the password state when the input changes
        secureTextEntry // Masks the input for security
      />
      
      {/* Button to perform Login or Sign Up based on the current mode */}
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
      </TouchableOpacity>
      
      {/* Link to toggle between Login and Sign Up modes */}
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the available space
    justifyContent: 'center', // Center elements vertically
    padding: 20, // Add padding around the container
    backgroundColor: '#f7f7f7', // Light gray background color
  },
  appTitle: {
    fontSize: 30, // Large font size for the app title
    fontWeight: 'bold', // Bold font weight
    textAlign: 'center', // Center align the text
    color: '#6200ee', // Purple color to match the app theme
    marginBottom: 10, // Space below the title
  },
  header: {
    fontSize: 24, // Font size for the header
    fontWeight: 'bold', // Bold font weight
    textAlign: 'center', // Center align the text
    marginBottom: 30, // Space below the header
    color: '#6200ee', // Purple color to match the app theme
  },
  input: {
    height: 50, // Height of the input field
    borderColor: '#ddd', // Light gray border color
    borderWidth: 1, // Border width
    borderRadius: 8, // Rounded corners
    paddingHorizontal: 10, // Padding inside the input field
    marginBottom: 15, // Space below each input field
    backgroundColor: '#fff', // White background color
  },
  button: {
    backgroundColor: '#6200ee', // Purple background color
    padding: 15, // Padding inside the button
    borderRadius: 8, // Rounded corners
    alignItems: 'center', // Center align the text inside the button
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16, // Font size for the button text
    fontWeight: 'bold', // Bold font weight
  },
  switchText: {
    marginTop: 15, // Space above the toggle link
    textAlign: 'center', // Center align the text
    color: '#6200ee', // Purple color to match the app theme
    fontSize: 14, // Font size for the toggle link text
  },
});

export default AuthScreen; // Export the component for use in navigation