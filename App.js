import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Provides navigation context for the app
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Enables bottom tab navigation
import { createStackNavigator } from '@react-navigation/stack'; // Enables stack-based navigation
import { StatusBar } from 'expo-status-bar'; // Configures the status bar appearance
import HomeScreen from './screens/Home'; // Import the Home screen
import ProfileScreen from './screens/Profile'; // Import the Profile screen
import DetailsScreen from './screens/Details'; // Import the Details screen
import AuthScreen from './screens/Auth'; // Import the Authentication screen
import Ionicons from 'react-native-vector-icons/Ionicons'; // Provides icons for the navigation tabs
import { auth } from './services/FirebaseConfig'; // Import Firebase authentication instance

// Create navigators
const Tab = createBottomTabNavigator(); // Bottom tab navigator for switching between tabs
const Stack = createStackNavigator(); // Stack navigator for hierarchical navigation

// Bottom Tab Navigator: Contains Home and Profile tabs
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // Dynamically assign icon based on the tab and its focus state
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'; // Home tab icon
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'; // Profile tab icon
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* Home tab displays HomeStack for navigation between Home and Details */}
      <Tab.Screen name="Home" component={HomeStack} />
      {/* Profile tab displays the ProfileScreen */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Stack Navigator: Manages navigation between Home and Details screens
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Default screen for the Home stack */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* Details screen for viewing book details */}
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// Main App component: Manages navigation flow based on user authentication state
export default function App() {
  const [user, setUser] = React.useState(null); // State to store the authenticated user

  // Set up listener for authentication state changes
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Update user state when authentication state changes
    });
    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  return (
    <NavigationContainer>
      {/* Main Stack Navigator: Controls navigation flow */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // If the user is logged in, display the main app with tabs
          <Stack.Screen name="MainApp" component={AppTabs} />
        ) : (
          // If no user is logged in, display the authentication screen
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
      {/* Configure the status bar appearance */}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}