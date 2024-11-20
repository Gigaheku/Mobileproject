import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBzv-X4VzUFWCwq0vJZwLAVAVGUPf17lDI",
  authDomain: "booktrackerherkko.firebaseapp.com",
  projectId: "booktrackerherkko",
  storageBucket: "booktrackerherkko.firebasestorage.app",
  messagingSenderId: "621346900302",
  appId: "1:621346900302:web:2a9e7f2bcf1a9124d7f61f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
