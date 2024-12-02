import { initializeApp } from 'firebase/app'; // Import Firebase app initialization function
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Import Firebase authentication functions
import { getFirestore } from 'firebase/firestore'; // Import Firestore initialization function
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for persistent auth state

// Firebase configuration object containing app-specific keys and identifiers
const firebaseConfig = {
  apiKey: "AIzaSyBzv-X4VzUFWCwq0vJZwLAVAVGUPf17lDI", // Public API key for the Firebase project
  authDomain: "booktrackerherkko.firebaseapp.com", // Domain for Firebase Authentication
  projectId: "booktrackerherkko", // Unique identifier for the Firebase project
  storageBucket: "booktrackerherkko.appspot.com", // Cloud Storage bucket for file uploads
  messagingSenderId: "621346900302", // Sender ID for Firebase Cloud Messaging
  appId: "1:621346900302:web:2a9e7f2bcf1a9124d7f61f", // Unique app identifier for this Firebase project
};

// Initialize Firebase App instance with the provided configuration
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistent state
// getReactNativePersistence(AsyncStorage) ensures user sessions persist across app restarts
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore, Firebase's NoSQL cloud database
const db = getFirestore(app);

// Export Firebase instances for use in other parts of the app
export { app, auth, db };