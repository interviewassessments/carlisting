import React from 'react';
import { CarStackParamList } from '../utils/types';

import { createStackNavigator } from '@react-navigation/stack';
import ListingsScreen from '../features/carListings/ListingsScreen';
import DetailsScreen from '../features/carListings/DetailsScreen';

const Stack = createStackNavigator<CarStackParamList>();

const CarsListingNavgationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name='Listings'
        component={ListingsScreen}
      />
      <Stack.Screen name='Details' options={{
        title: 'Car Details'
      }} component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default CarsListingNavgationStack;
