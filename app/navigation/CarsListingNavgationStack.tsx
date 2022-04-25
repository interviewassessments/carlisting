import React from "react";
import { CarStackParamList } from "../utils/types";

import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../features/carListings/ListingsScreen";
import DetailsScreen from "../features/carListings/DetailsScreen";

const Stack = createStackNavigator<CarStackParamList>();

const CarsListingNavgationStack: React.FC<CarStackParamList> = () => {
  return (
    <Stack.Navigator initialRouteName="Listings">
      <Stack.Screen name="Listings" component={ListingsScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default CarsListingNavgationStack;
