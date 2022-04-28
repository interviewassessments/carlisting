import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { MainBottomTabParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme, Text, Button } from '@rneui/themed';
import { useAppDispatch } from '../../hooks';
import { fetchRandomImages } from './homeSlice';
import { fetchCars } from '../carListings/carListingsSlicer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    padding: 5,
  },
  btnContainerStyle: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnStyle: {
    borderColor: 'rgba(78, 116, 289, 1)',
  },
  btnTitleStyle: {
    color: 'rgba(78, 116, 289, 1)',
  },
});

type HomeScreenProp = BottomTabNavigationProp<MainBottomTabParamList, 'Home'>;

const HomeScreen: React.FC<MainBottomTabParamList> = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<HomeScreenProp>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRandomImages());
    dispatch(fetchCars());
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text} h4 h4Style={{ color: theme?.colors?.primary }}>
        Welcome to Car Rental App
      </Text>
      <Button
        title='Book Rental Car Now'
        buttonStyle={styles.btnStyle}
        type='outline'
        titleStyle={styles.btnTitleStyle}
        containerStyle={styles.btnContainerStyle}
        onPress={() => navigation.navigate('Car Listings')}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
