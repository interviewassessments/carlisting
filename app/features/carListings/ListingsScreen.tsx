import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { CarStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
        buttonStyle={{
          borderColor: 'rgba(78, 116, 289, 1)',
        }}
        type='outline'
        titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default ListingsScreen;
