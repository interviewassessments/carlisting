import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  Image,
  Overlay,
  Header as HeaderRNE,
  ListItem,
  CheckBox,
  SearchBar,
  SpeedDial,
  Slider,
  Icon,
} from '@rneui/themed';
import { color as colorTheme } from '@rneui/base';
import DropDownPicker from 'react-native-dropdown-picker';
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
import {
  generateMinMaxPriceValues,
  generateUniqueCarMakes,
  generateUniqueColors,
  generateUniqueYears,
} from '../../utils/generateUniqueValues';
import MultiSelect from 'react-native-multiple-select';

type ListingScreenProp = StackNavigationProp<CarStackParamList, 'Listings'>;

const ListingsScreen: React.FC<CarStackParamList> = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [carMake, setCarMake] = useState('');
  const [carColor, setCarColor] = useState('');
  const [carYear, setCarYear] = useState('');
  const [availability, setAvailability] = useState(false);
  const [price2Kto3K, setPrice2Kto3K] = useState(false);
  const [price3KAbove, setPrice3KAbove] = useState(false);
  const [year1900To2000, setYear1900To2000] = useState(false);
  const [year2001ToPresent, setYear2001ToPresent] = useState(false);
  const { cars, loading } = useAppSelector((state) => state.carListings);
  const [listedCars, setListedCars] = useState(cars);
  const [search, setSearch] = useState('');
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState('white');
  const [openDD, setOpenDD] = useState(false);
  const [openDDYear, setOpenDDYear] = useState(false);
  const [openDDMake, setOpenDDMake] = useState(false);
  const [colorValue, setColorValue] = useState<string[]>([]);
  const [yearValue, setYearValue] = useState<string[]>([]);
  const [carMakeValue, setCarMakeValue] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [carColorExpanded, setCarColorExpanded] = useState(false);
  const [carPriceExpanded, setCarPriceExpanded] = useState(false);
  const [carYearExpanded, setCarYearExpanded] = useState(false);
  const [carAvailabilityExpanded, setCarAvailabilityExpanded] = useState(false);
  const minMaxPrices = generateMinMaxPriceValues(cars);
  const minimumPrice = Math.floor(Number(minMaxPrices.minimum.substring(1)));
  const maximumPrice = Math.floor(Number(minMaxPrices.maximum.substring(1)));
  const [priceValue, setPriceValue] = useState(minimumPrice);
  const [priceChanged, setPriceChanged] = useState(false);
  const { images } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  const [colors, setColors] = useState(generateUniqueColors(cars));
  const [years, setYears] = useState(generateUniqueYears(cars));
  const [carMakes, setCarMakes] = useState(generateUniqueCarMakes(cars));

  const imagesArray: string[] = [];
  images?.map((image) => {
    imagesArray.push(image.download_url);
  });

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
    clearFilterValues();
  };

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} color='#0000ff' size='large' />
    );
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const clearState = () => {
    setColorValue([]);
    setYearValue([]);
    setCarMakeValue([]);
    setPriceValue(minimumPrice);
    setAvailability(false);
    setPriceChanged(false);
  };

  const clearFilterValues = () => {
    // clear filter value state
    clearState();
  };

  const applyFilters = () => {
    console.log('sri rama', carMakeValue);
    let filteredCars = cars;
    if (carMakeValue.length) {
      filteredCars = filteredCars.filter((car) =>
        carMakeValue.includes(car.car)
      );
    }
    if (priceValue && priceChanged) {
      if (priceValue === minimumPrice) {
        filteredCars = filteredCars.filter(
          (car) => Math.floor(Number(car.price.substring(1))) === priceValue
        );
      } else {
        filteredCars = filteredCars.filter(
          (car) =>
            Math.floor(Number(car.price.substring(1))) >= minimumPrice &&
            Math.floor(Number(car.price.substring(1))) <= priceValue
        );
      }
    }
    if (colorValue.length) {
      filteredCars = filteredCars.filter((car) =>
        colorValue.includes(car.car_color.toLowerCase())
      );
    }
    if (yearValue.length) {
      filteredCars = filteredCars.filter((car) =>
        yearValue.includes(`${car.car_model_year}`)
      );
    }
    if (availability) {
      filteredCars = filteredCars.filter(
        (car) => car.availability === availability
      );
    }
    setListedCars(filteredCars);
    toggleOverlay();
    setOpen(!open);
  };

  const updateSearch = (search: string) => {
    console.log('search', search);
    setSearch(search);
  };

  const closeFilters = () => {
    setVisible(false);
    setOpen(!open);
  };

  const interpolate = (start: number, end: number) => {
    let k = (priceValue - 0) / 10; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  const onPriceValueChage = (price: number) => {
    setPriceValue(price);
    setPriceChanged(true);
  };

  const onSelectedCarMakeChange = (selectedItems: string[]) => {
    setCarMakeValue(selectedItems);
  };

  const onSelectedCarColorChange = (selectedItems: string[]) => {
    setColorValue(selectedItems);
  };

  const onSelectedCarYearChange = (selectedItems: string[]) => {
    setYearValue(selectedItems);
  };

  const ListEmptyComponent = () => (
    <View style={styles.noDataContainer}>
      <Text style={styles.noData}>{appText.noData}</Text>
    </View>
  );

  const Car = ({ carDetails }: any) => {
    const navigation = useNavigation<ListingScreenProp>();
    const randomImage = generateRandomImage(imagesArray);
    const availability = carDetails.availability ? 'Available' : 'Sold out';
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
          <Text
            style={[
              commonStyles.subTitle,
              !carDetails.availability
                ? commonStyles.danger
                : commonStyles.success,
            ]}
          >
            {availability}
          </Text>
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
            theme={colorTheme()}
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
          <SpeedDial
            isOpen={open}
            icon={{ name: 'add', color: '#fff' }}
            openIcon={{ name: 'close', color: '#fff' }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
            title='Filter'
            color='#397af8'
          >
            <SpeedDial.Action
              icon={{ name: 'add', color: '#fff' }}
              title='Add'
              onPress={toggleOverlay}
              color='#397af8'
            />
            <SpeedDial.Action
              icon={{ name: 'close', color: '#fff' }}
              title='Close'
              onPress={closeFilters}
              color='#397af8'
            />
          </SpeedDial>
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
            <SafeAreaView style={[styles.filterSafeArea]}>
              <ListItem.Accordion
                content={
                  <ListItem.Content>
                    <ListItem.Title style={commonStyles.title}>
                      {appText.carMake}
                    </ListItem.Title>
                  </ListItem.Content>
                }
                isExpanded={expanded}
                onPress={() => {
                  setExpanded(!expanded);
                  setCarPriceExpanded(false);
                  setCarYearExpanded(false);
                  setCarColorExpanded(false);
                  setCarAvailabilityExpanded(false);
                }}
                containerStyle={{ marginBottom: 0 }}
              >
                <SafeAreaView
                  style={[
                    commonStyles.marginVertical10,
                    commonStyles.marginTopZero,
                  ]}
                >
                  <MultiSelect
                    items={carMakes}
                    uniqueKey='label'
                    onSelectedItemsChange={onSelectedCarMakeChange}
                    selectedItems={carMakeValue}
                    selectText='Pick Car Names'
                    searchInputPlaceholderText='Search Car Names...'
                    onChangeInput={(text) => console.log(text)}
                    tagRemoveIconColor='red'
                    tagTextColor='#000'
                    selectedItemTextColor='#397af8'
                    selectedItemIconColor='#397af8'
                    itemTextColor='#000'
                    displayKey='label'
                    searchInputStyle={styles.searchInputDDStyle}
                    hideSubmitButton
                    styleRowList={commonStyles.padding5}
                    styleMainWrapper={styles.ddStyleMainWrapper}
                    styleInputGroup={styles.ddStyleInputGroup}
                    styleDropdownMenu={styles.ddMenuStyle}
                    styleListContainer={styles.ddListContainerStyle}
                  />
                </SafeAreaView>
              </ListItem.Accordion>
            </SafeAreaView>
            <SafeAreaView style={styles.filterSafeArea}>
              <ListItem.Accordion
                content={
                  <ListItem.Content>
                    <ListItem.Title style={commonStyles.title}>
                      {appText.dayRentalPrice}
                    </ListItem.Title>
                  </ListItem.Content>
                }
                isExpanded={carPriceExpanded}
                onPress={() => {
                  setCarPriceExpanded(!carPriceExpanded);
                  setExpanded(false);
                  setCarYearExpanded(false);
                  setCarColorExpanded(false);
                  setCarAvailabilityExpanded(false);
                }}
              >
                <SafeAreaView
                  style={[
                    commonStyles.marginVertical10,
                    commonStyles.paddingHorizontal10,
                  ]}
                >
                  <Slider
                    value={priceValue}
                    onValueChange={onPriceValueChage}
                    maximumValue={maximumPrice}
                    minimumValue={minimumPrice}
                    step={1}
                    allowTouchTrack
                    trackStyle={styles.sliderTrack}
                    thumbStyle={styles.sliderThumb}
                    thumbProps={{
                      children: (
                        <Icon
                          type='font-awesome'
                          name='car'
                          size={15}
                          reverse
                          containerStyle={styles.sliderIcon}
                          color={color()}
                        />
                      ),
                    }}
                  />
                  <Text
                    style={[commonStyles.subTitle, commonStyles.paddingTop10]}
                  >{`Price Range Selected : ${
                    minimumPrice === priceValue
                      ? `$${minimumPrice}`
                      : `$${minimumPrice} - $${priceValue}`
                  }`}</Text>
                </SafeAreaView>
              </ListItem.Accordion>
            </SafeAreaView>
            <SafeAreaView style={styles.filterSafeArea}>
              <ListItem.Accordion
                content={
                  <ListItem.Content>
                    <ListItem.Title style={commonStyles.title}>
                      {appText.carColor}
                    </ListItem.Title>
                  </ListItem.Content>
                }
                isExpanded={carYearExpanded}
                onPress={() => {
                  setCarYearExpanded(!carYearExpanded);
                  setExpanded(false);
                  setCarPriceExpanded(false);
                  setCarColorExpanded(false);
                  setCarAvailabilityExpanded(false);
                }}
              >
                <SafeAreaView
                  style={[
                    commonStyles.marginVertical10,
                    commonStyles.marginTopZero,
                  ]}
                >
                  <MultiSelect
                    items={colors}
                    uniqueKey='label'
                    onSelectedItemsChange={onSelectedCarColorChange}
                    selectedItems={colorValue}
                    selectText='Pick Car Color'
                    searchInputPlaceholderText='Search Car Color Names...'
                    onChangeInput={(text) => console.log(text)}
                    tagRemoveIconColor='red'
                    tagTextColor='#000'
                    selectedItemTextColor='#397af8'
                    selectedItemIconColor='#397af8'
                    itemTextColor='#000'
                    displayKey='label'
                    searchInputStyle={styles.searchInputDDStyle}
                    hideSubmitButton
                    styleRowList={commonStyles.padding5}
                    styleMainWrapper={styles.ddStyleMainWrapper}
                    styleInputGroup={styles.ddStyleInputGroup}
                    styleDropdownMenu={styles.ddMenuStyle}
                    styleListContainer={styles.ddListContainerStyle}
                  />
                </SafeAreaView>
              </ListItem.Accordion>
            </SafeAreaView>
            <SafeAreaView style={[styles.filterSafeArea]}>
              <ListItem.Accordion
                content={
                  <ListItem.Content>
                    <ListItem.Title style={commonStyles.title}>
                      {appText.year}
                    </ListItem.Title>
                  </ListItem.Content>
                }
                isExpanded={carColorExpanded}
                onPress={() => {
                  setCarColorExpanded(!carColorExpanded);
                  setExpanded(false);
                  setCarPriceExpanded(false);
                  setCarYearExpanded(false);
                  setCarAvailabilityExpanded(false);
                }}
              >
                <SafeAreaView
                  style={[
                    commonStyles.marginVertical10,
                    commonStyles.marginTopZero,
                  ]}
                >
                  <MultiSelect
                    items={years}
                    uniqueKey='label'
                    onSelectedItemsChange={onSelectedCarYearChange}
                    selectedItems={yearValue}
                    selectText='Pick Car Model Year'
                    searchInputPlaceholderText='Search Car Years...'
                    onChangeInput={(text) => console.log(text)}
                    tagRemoveIconColor='red'
                    tagTextColor='#000'
                    selectedItemTextColor='#397af8'
                    selectedItemIconColor='#397af8'
                    itemTextColor='#000'
                    displayKey='label'
                    searchInputStyle={styles.searchInputDDStyle}
                    hideSubmitButton
                    styleRowList={commonStyles.padding5}
                    styleMainWrapper={styles.ddStyleMainWrapper}
                    styleInputGroup={styles.ddStyleInputGroup}
                    styleDropdownMenu={styles.ddMenuStyle}
                    styleListContainer={styles.ddListContainerStyle}
                  />
                </SafeAreaView>
              </ListItem.Accordion>
            </SafeAreaView>
            <SafeAreaView style={styles.filterSafeArea}>
              <ListItem.Accordion
                content={
                  <ListItem.Content>
                    <ListItem.Title style={commonStyles.title}>
                      {appText.carAvailability}
                    </ListItem.Title>
                  </ListItem.Content>
                }
                isExpanded={carAvailabilityExpanded}
                onPress={() => {
                  setCarAvailabilityExpanded(!carAvailabilityExpanded);
                  setExpanded(false);
                  setCarPriceExpanded(false);
                  setCarYearExpanded(false);
                  setCarColorExpanded(false);
                }}
              >
                <SafeAreaView style={commonStyles.marginVertical10}>
                  <CheckBox
                    containerStyle={styles.checkBoxContainer}
                    title='Availability'
                    checked={availability}
                    onPress={() => setAvailability(!availability)}
                  />
                </SafeAreaView>
              </ListItem.Accordion>
            </SafeAreaView>
          </View>
        </Overlay>
      )}
    </ReacNavigationSafeView>
  );
};

export default ListingsScreen;
