import React from 'react';
import { View, Text, Button } from 'react-native';

const DetailsScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Details Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

export default DetailsScreen;
