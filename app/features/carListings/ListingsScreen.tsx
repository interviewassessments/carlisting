import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
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
import { SafeAreaView as ReacNavigationSafeView } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCars } from './carListingsSlicer';
import { generateRandomImage } from '../../utils/randomImageGenerator';
import { styles } from './styles';
import { commonStyles } from '../../utils/styles';
import { appText } from '../../utils/constants';

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
    if (search) {
      const filteredCars = cars.filter(
        (carItem) =>
          carItem.car.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
      setListedCars(filteredCars);
    } else {
      setListedCars(cars);
    }
  }, [search, cars]);

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
    let filteredCars = cars;
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

  const updateSearch = (search: string) => {
    console.log('search', search);
    setSearch(search);
  };

  const ListEmptyComponent = () => (
    <View style={styles.noDataContainer}>
      <Text style={styles.noData}>{appText.noData}</Text>
    </View>
  );

  const Car = ({ carDetails }: any) => {
    const navigation = useNavigation<ListingScreenProp>();
    const randomImage = generateRandomImage(imagesArray);
    const availability = carDetails.availability ? 'Available' : 'Sold out'
    return (
      <SafeAreaView style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Details', {
              carDetails,
              image: randomImage,
            })
          }
        >
          <Image
            source={{ uri: randomImage }}
            containerStyle={styles.item}
            PlaceholderContent={
              <ActivityIndicator color='#0000ff' style={styles.imageLoader} />
            }
          />
        </TouchableOpacity>
        <View>
          <Text style={commonStyles.title}>{carDetails.car}</Text>
          <Text style={commonStyles.subTitle}>{`${carDetails.price}/day`}</Text>
          <Text style={commonStyles.subTitle}>{carDetails.car_model_year}</Text>
          <Text style={[commonStyles.subTitle, !carDetails.availability ? commonStyles.danger : commonStyles.success]}>{availability}</Text>
        </View>
      </SafeAreaView>
    );
  };

  const renderItem: ListRenderItem<CarData> = ({ item }) => (
    <Car carDetails={item} />
  );

  return (
    <ReacNavigationSafeView style={styles.container}>
      {!visible ? (
        <>
          <SearchBar
            placeholder={appText.searchPlaceholder}
            onChangeText={updateSearch}
            value={search}
            onClear={() => setListedCars(cars)}
            inputContainerStyle={styles.searchInput}
            containerStyle={styles.searchBarContainer}
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
            onPress={onPressFilters}
            style={styles.touchableOpacityStyle}
          >
            <View style={styles.floatingButtonStyle}>
              <Icon type='font-awesome' name='filter' color='white' />
              <Text style={commonStyles.textWhite}>{appText.filters}</Text>
            </View>
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
            containerStyle={commonStyles.paddingHorizontal10}
            leftComponent={
              <TouchableOpacity
                onPress={clearFilterValues}
                style={styles.overlayHeaderLeft}
              >
                <Text style={styles.textSecondary}>{appText.clear}</Text>
              </TouchableOpacity>
            }
            rightComponent={
              <View style={styles.headerRight}>
                <TouchableOpacity
                  style={commonStyles.marginLeft10}
                  onPress={applyFilters}
                >
                  <Text style={styles.textSecondary}>{appText.apply}</Text>
                </TouchableOpacity>
              </View>
            }
            centerComponent={{
              text: appText.filterHeading,
              style: styles.heading,
            }}
          />
          <View style={styles.filterContainer}>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{appText.carMake}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Content>
                <TextInput
                  style={styles.input}
                  onChangeText={onCarMakeChange}
                  value={carMake}
                  placeholder={appText.carMakePlaceholder}
                />
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{appText.carColor}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Content>
                <TextInput
                  style={styles.input}
                  onChangeText={onCarColorChange}
                  value={carColor}
                  placeholder={appText.carColorPlaceholder}
                />
              </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{appText.dayRentalPrice}</ListItem.Title>
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
                <ListItem.Title>{appText.year}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Content>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeCarYear}
                  value={carYear}
                  placeholder={appText.yearPlaceholder}
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
    </ReacNavigationSafeView>
  );
};

export default ListingsScreen;
