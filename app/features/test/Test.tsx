import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { sayHello } from './testSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
});

const Test = () => {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.test);

  const handlePress = () => {
    // Calling the redux action as declared in the reducer actions
    dispatch(sayHello('Hello!'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button title={'Set Message'} onPress={handlePress} />
    </View>
  );
};

export default Test;
