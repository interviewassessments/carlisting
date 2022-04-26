import React, { useCallback, useEffect, useState } from 'react';
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
import { generateRandomImage } from '../../utils/randomImageGenerator';

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
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  imageLoader: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  }
});

type ListingScreenProp = StackNavigationProp<CarStackParamList, 'Listings'>;

const ListingsScreen: React.FC<CarStackParamList> = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { cars, loading } = useAppSelector((state) => state.carListings);
  const { images } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  const refreshCars = () => {
    setIsFetching(true);
    dispatch(fetchCars());
    setIsFetching(false);
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} color="#0000ff" size='large' />;
  }

  const imagesArray: string[] = [];

  images?.map((image) => {
    imagesArray.push(image.download_url);
  });

  const Car = ({ carDetails }: any) => {
    const navigation = useNavigation<ListingScreenProp>();
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
            source={{ uri: generateRandomImage(imagesArray) }}
            containerStyle={styles.item}
            PlaceholderContent={<ActivityIndicator color="#0000ff" style={styles.imageLoader} />}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.text}>{carDetails.car}</Text>
          <Text style={styles.text}>{`${carDetails.price}/day`}</Text>
        </View>
      </SafeAreaView>
    );
  };

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
        refreshing={isFetching}
        onRefresh={refreshCars}
      />
    </SafeAreaView>
  );
};

export default ListingsScreen;
