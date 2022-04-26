import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import "react-native-gesture-handler";
import CarsListingNavgationStack from './app/navigation/CarsListingNavgationStack';
import HomeScreen from './app/features/home/HomeScreen';

import Test from './app/features/test/Test';
import { store } from './app/store';
import { MainBottomTabParamList } from './app/utils/types';

// Bottom Tab Navigation
const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTab.Navigator initialRouteName='Home'>
          <BottomTab.Screen name='Home' component={HomeScreen} />
          <BottomTab.Screen
            name='Car Listings'
            component={CarsListingNavgationStack}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
