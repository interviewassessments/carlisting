import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Car Details Screen</Text>
    </View>
  );
};

export default DetailsScreen;
