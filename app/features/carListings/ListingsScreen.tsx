import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CarStackParamList, MainBottomTabParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

type ListingScreenProp = StackNavigationProp<CarStackParamList, 'Listings'>;

const ListingsScreen: React.FC<CarStackParamList> = () => {
  const navigation = useNavigation<ListingScreenProp>();
  return (
    <View style={styles.container}>
      <Text>Car Listings Screen</Text>
      <Button
        title='Details'
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default ListingsScreen;
