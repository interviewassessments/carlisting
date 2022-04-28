import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';

import CarsListingNavgationStack from './app/navigation/CarsListingNavgationStack';
import HomeScreen from './app/features/home/HomeScreen';
import { store } from './app/store';
import { MainBottomTabParamList } from './app/utils/types';
import { Icon } from '@rneui/themed';

// Bottom Tab Navigation
const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTab.Navigator initialRouteName='Home'>
          <BottomTab.Screen
            options={{
              tabBarIcon: () => <Icon name='home' type='font-awesome' />,
              tabBarLabelStyle: {
                fontSize: 12,
              },
              headerShown: false
            }}
            name='Home'
            component={HomeScreen}
          />
          <BottomTab.Screen
            name='Car Listings'
            options={{
              tabBarIcon: () => <Icon name='car' type='font-awesome' />,
              tabBarLabelStyle: {
                fontSize: 12,
              },
              title: 'Cars',
              headerShown: false
            }}
            component={CarsListingNavgationStack}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
