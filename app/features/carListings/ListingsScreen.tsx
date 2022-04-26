import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Image } from '@rneui/themed';
import { CarData, CarStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCars } from './carListingsSlicer';

const sampleImage = require('../../images/sample-image.png');

const DEFAULT_IMAGE = Image.resolveAssetSource(sampleImage).uri;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
  },
  item: {
    aspectRatio: 1,
    flex: 1,
    borderRadius: 10,
  },
  list: {
    width: '100%',
    backgroundColor: '#fff',
  },
  imageContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  text: {
    padding: 5,
    fontSize: 16,
    color: '#000',
    paddingBottom: 0,
  },
  carContentStyle: {
    flex: 1,
    paddingRight: 10,
  },
  carSectionStyle: {
    flexDirection: 'column',
    flex: 1,
  },
  loader: {
    justifyContent: 'center',
    alignItems:'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
});

type ListingScreenProp = StackNavigationProp<CarStackParamList, 'Listings'>;

const Car = ({ carDetails }: any) => {
  const navigation = useNavigation<ListingScreenProp>();
  console.log('carDetails', carDetails)
  return (
    <SafeAreaView style={styles.imageContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            carDetails,
          })
        }
      >
        <Image
          source={{ uri: DEFAULT_IMAGE }}
          containerStyle={styles.item}
          PlaceholderContent={<ActivityIndicator />}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.text}>{carDetails.car}</Text>
        <Text style={styles.text}>{`${carDetails.price}/day`}</Text>
      </View>
    </SafeAreaView>
  );
};

const ListingsScreen: React.FC<CarStackParamList> = () => {
  const { cars, loading } = useAppSelector((state) => state.carListings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }
  const renderItem: ListRenderItem<CarData> = ({ item }) => (
    <Car carDetails={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        data={cars}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={(car) => car.car_vin}
      />
    </SafeAreaView>
  );
};

export default ListingsScreen;
