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
  TextInput,
  Platform,
} from 'react-native';
import {
  Icon,
  Image,
  Overlay,
  Header as HeaderRNE,
  ListItem,
  CheckBox,
  SearchBar,
} from '@rneui/themed';
import { CarData, CarStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCars } from './carListingsSlicer';
import { generateRandomImage } from '../../utils/randomImageGenerator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 100,
    height: 50,
    right: 6,
    bottom: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 100,
    height: 50,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0,0,0)',
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
    color: '#fff',
  },
  filterContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    width: '100%',
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginVertical: 10,
  },
  noData: {
    fontSize: 24,
    color: '#397af8',
  },
  checkBoxContainer: {
    marginRight: 0,
  },
  overlayStyle: {
    flex: 2,
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 0 : 50,
  },
});

type ListingScreenProp = StackNavigationProp<CarStackParamList, 'Listings'>;

const ListingsScreen: React.FC<CarStackParamList> = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [carMake, setCarMake] = useState('');
  const [carColor, setCarColor] = useState('');
  const [carYear, setCarYear] = useState('');
  const [price1Kto2K, setPrice1Kto2K] = useState(false);
  const [price2Kto3K, setPrice2Kto3K] = useState(false);
  const [price3KAbove, setPrice3KAbove] = useState(false);
  const [year1900To2000, setYear1900To2000] = useState(false);
  const [year2001ToPresent, setYear2001ToPresent] = useState(false);
  const { cars, loading } = useAppSelector((state) => state.carListings);
  const [listedCars, setListedCars] = useState(cars);
  const [search, setSearch] = useState('');
  const { images } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  useEffect(() => {
    if (search) {
      const filteredCars = listedCars.filter(
        (car) => car.car.indexOf(search) !== -1
      );
      setListedCars(filteredCars);
    }
  }, [search]);

  const refreshCars = () => {
    setIsFetching(true);
    dispatch(fetchCars());
    setIsFetching(false);
  };

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} color='#0000ff' size='large' />
    );
  }

  const imagesArray: string[] = [];

  images?.map((image) => {
    imagesArray.push(image.download_url);
  });

  const onPressFilters = () => {
    setVisible(true);
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const clearState = () => {
    setCarMake('');
    setCarColor('');
    setPrice1Kto2K(false);
    setPrice2Kto3K(false);
    setPrice3KAbove(false);
    setCarYear('');
    setYear1900To2000(false);
    setYear2001ToPresent(false);
  };

  const clearFilterValues = () => {
    // clear filter value state
    clearState();
  };

  const onCarMakeChange = (value: string) => {
    setCarMake(value);
  };

  const onCarColorChange = (value: string) => {
    setCarColor(value);
  };

  const onChangeCarYear = (value: string) => {
    setCarYear(value);
  };

  const applyFilters = () => {
    let filteredCars = listedCars;
    if (carMake) {
      filteredCars = filteredCars.filter(
        (car) => car.car.toLowerCase() === carMake.toLowerCase()
      );
    }
    if (carColor) {
      filteredCars = filteredCars.filter(
        (car) => car.car_color.toLowerCase() === carColor.toLowerCase()
      );
    }
    if (carYear) {
      filteredCars = filteredCars.filter(
        (car) => car.car_model_year === Number(carYear)
      );
    }
    if (year1900To2000) {
      filteredCars = filteredCars.filter(
        (car) => car.car_model_year >= 1900 && car.car_model_year <= 2000
      );
    }
    if (year2001ToPresent) {
      filteredCars = filteredCars.filter(
        (car) =>
          car.car_model_year >= 2001 &&
          car.car_model_year <= new Date().getFullYear()
      );
    }
    if (price1Kto2K) {
      filteredCars = filteredCars.filter(
        (car) =>
          Math.floor(Number(car.price.substring(1))) >= 1000 &&
          Math.floor(Number(car.price.substring(1))) <= 2000
      );
    }
    if (price2Kto3K) {
      filteredCars = filteredCars.filter(
        (car) =>
          Math.floor(Number(car.price.substring(1))) >= 2001 &&
          Math.floor(Number(car.price.substring(1))) <= 3000
      );
    }
    if (price3KAbove) {
      filteredCars = filteredCars.filter(
        (car) => Math.floor(Number(car.price.substring(1))) >= 3001
      );
    }
    setListedCars(filteredCars);
    toggleOverlay();
  };

  const updateSearch = (searchText: string) => {
    setSearch(searchText);
  };

  const ListEmptyComponent = () => (
    <View style={styles.noDataContainer}>
      <Text style={styles.noData}>No Data Found</Text>
    </View>
  );

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
            PlaceholderContent={
              <ActivityIndicator color='#0000ff' style={styles.imageLoader} />
            }
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
      {!visible ? (
        <>
          <SearchBar
            placeholder='Search Here...'
            onChangeText={updateSearch}
            value={search}
            onClear={() => setListedCars(cars)}
            inputContainerStyle={{ backgroundColor: '#fff' }}
            containerStyle={{
              backgroundColor: '#fff',
              borderStyle: 'solid',
              marginHorizontal: 5,
              borderWidth: 1,
              borderRadius: 5,
            }}
          />
          <FlatList
            numColumns={2}
            data={listedCars}
            style={styles.list}
            renderItem={renderItem}
            keyExtractor={(car) => car.car_vin}
            refreshing={isFetching}
            onRefresh={refreshCars}
            ListEmptyComponent={ListEmptyComponent}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressFilters}
            style={styles.touchableOpacityStyle}
          >
            <ListItem style={styles.floatingButtonStyle}>
              <ListItem.Content style={{ flexDirection: 'row' }}>
                <Icon type='font-awesome' name='filter' color='black' />
                <ListItem.Title style={{ paddingLeft: 5 }}>
                  Filters
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        </>
      ) : (
        <Overlay
          fullScreen={true}
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={styles.overlayStyle}
        >
          <HeaderRNE
            leftComponent={
              <TouchableOpacity
                onPress={clearFilterValues}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }}
              >
                <Text style={styles.textSecondary}>Clear</Text>
              </TouchableOpacity>
            }
            rightComponent={
              <View style={styles.headerRight}>
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={applyFilters}
                >
                  <Text style={styles.textSecondary}>Apply</Text>
                </TouchableOpacity>
              </View>
            }
            centerComponent={{
              text: 'Filter Selection',
              style: styles.heading,
            }}
          />
          <View style={styles.filterContainer}>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Car Make</ListItem.Title>
              </ListItem.Content>
              <ListItem.Content>
                <TextInput
                  style={styles.input}
                  onChangeText={onCarMakeChange}
                  value={carMake}
                />
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Car Color</ListItem.Title>
              </ListItem.Content>
              <ListItem.Content>
                <TextInput
                  style={styles.input}
                  onChangeText={onCarColorChange}
                  value={carColor}
                />
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Day Rental Price</ListItem.Title>
              </ListItem.Content>
              <ListItem.Content>
                <CheckBox
                  center
                  containerStyle={styles.checkBoxContainer}
                  title='$1000 - $2000'
                  checked={price1Kto2K}
                  onPress={() => setPrice1Kto2K(!price1Kto2K)}
                />
                <CheckBox
                  center
                  containerStyle={styles.checkBoxContainer}
                  title='$2001 - $3001'
                  checked={price2Kto3K}
                  onPress={() => setPrice2Kto3K(!price2Kto3K)}
                />
                <CheckBox
                  center
                  containerStyle={styles.checkBoxContainer}
                  title='> $3000'
                  checked={price3KAbove}
                  onPress={() => setPrice3KAbove(!price3KAbove)}
                />
              </ListItem.Content>
            </ListItem>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>Year</ListItem.Title>
              </ListItem.Content>
              <ListItem.Content>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeCarYear}
                  value={carYear}
                  placeholder='Enter Year'
                  keyboardType='numeric'
                />
                <CheckBox
                  center
                  containerStyle={styles.checkBoxContainer}
                  title='1900 - 2000'
                  checked={year1900To2000}
                  onPress={() => setYear1900To2000(!year1900To2000)}
                />
                <CheckBox
                  center
                  containerStyle={styles.checkBoxContainer}
                  title='2001 - Present'
                  checked={year2001ToPresent}
                  onPress={() => setYear2001ToPresent(!year2001ToPresent)}
                />
              </ListItem.Content>
            </ListItem>
          </View>
        </Overlay>
      )}
    </SafeAreaView>
  );
};

export default ListingsScreen;
