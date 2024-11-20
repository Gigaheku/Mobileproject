import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { auth } from '../services/FirebaseConfig';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    if (!auth.currentUser) {
      navigation.navigate('Auth');
    }
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default HomeScreen;
