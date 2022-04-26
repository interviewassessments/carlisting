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
} from 'react-native';
import {
  Button,
  Icon,
  Image,
  Overlay,
  Header as HeaderRNE,
  HeaderProps,
  ListItem,
  CheckBox,
} from '@rneui/themed';
import { CarData, CarStackParamList } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCars } from './carListingsSlicer';
import { generateRandomImage } from '../../utils/randomImageGenerator';

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
});

type ListingScreenProp = StackNavigationProp<CarStackParamList, 'Listings'>;

const ListingsScreen: React.FC<CarStackParamList> = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [text, onChangeText] = useState('');
  const [check1, setCheck1] = useState(false);
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
    return (
      <ActivityIndicator style={styles.loader} color='#0000ff' size='large' />
    );
  }

  const imagesArray: string[] = [];

  images?.map((image) => {
    imagesArray.push(image.download_url);
  });

  const clickHandler = () => {
    setVisible(true);
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const playgroundNavigate = () => {
    toggleOverlay();
  };

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
          <FlatList
            numColumns={2}
            data={cars}
            style={styles.list}
            renderItem={renderItem}
            keyExtractor={(car) => car.car_vin}
            refreshing={isFetching}
            onRefresh={refreshCars}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={clickHandler}
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
        <SafeAreaView style={{ flex: 1, width: '100%' }}>
          <Overlay
            overlayStyle={{ width: '100%', height: '80%' }}
            isVisible={visible}
            onBackdropPress={toggleOverlay}
          >
            <HeaderRNE
              leftComponent={
                <TouchableOpacity onPress={playgroundNavigate}>
                  <Icon type='font-awesome' name='close' color='white' />
                </TouchableOpacity>
              }
              rightComponent={
                <View style={styles.headerRight}>
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={playgroundNavigate}
                  >
                    <Text style={styles.textSecondary}>Clear</Text>
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
                    onChangeText={onChangeText}
                    value={text}
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
                    onChangeText={onChangeText}
                    value={text}
                  />
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>Car Day Rental Price</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content>
                  <CheckBox
                    center
                    title='< $200'
                    checked={check1}
                    onPress={() => setCheck1(!check1)}
                  />
                  <CheckBox
                    center
                    title='> $200'
                    checked={check1}
                    onPress={() => setCheck1(!check1)}
                  />
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>Year</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content>
                  <CheckBox
                    center
                    title='< 2000'
                    checked={check1}
                    onPress={() => setCheck1(!check1)}
                  />
                  <CheckBox
                    center
                    title='2000 - 2010'
                    checked={check1}
                    onPress={() => setCheck1(!check1)}
                  />
                  <CheckBox
                    center
                    title='2011 - 2020'
                    checked={check1}
                    onPress={() => setCheck1(!check1)}
                  />
                  <CheckBox
                    center
                    title='> 2020'
                    checked={check1}
                    onPress={() => setCheck1(!check1)}
                  />
                </ListItem.Content>
              </ListItem>
              <Button
                style={{ paddingVertical: 20, marginTop: 20 }}
                icon={
                  <Icon
                    name='check'
                    type='font-awesome'
                    color='white'
                    size={25}
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                title='Apply'
                onPress={toggleOverlay}
              />
            </View>
          </Overlay>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

export default ListingsScreen;
