import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const DetailsScreen = ({route}: any) => {
  const carDetails = route?.params?.carDetails;
  return (
    <View style={styles.container}>
      <Text>{carDetails?.car}</Text>
    </View>
  );
};

export default DetailsScreen;
