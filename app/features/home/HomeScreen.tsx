import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import { MainBottomTabParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
  },
});

type HomeScreenProp = BottomTabNavigationProp<MainBottomTabParamList, 'Home'>;

const HomeScreen: React.FC<MainBottomTabParamList> = () => {
  const navigation = useNavigation<HomeScreenProp>();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title='Go To Cars'
        onPress={() => navigation.navigate('Car Listings')}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
