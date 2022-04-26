import { Icon, ListItem, Image, Button } from '@rneui/themed';
import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { styles } from './styles';

const DetailsScreen = ({ route }: any) => {
  const carDetails = route?.params?.carDetails;
  const image = route?.params?.image;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
        <Image
          source={{ uri: image }}
          containerStyle={{ aspectRatio: 1 }}
          PlaceholderContent={
            <ActivityIndicator color='#0000ff' style={styles.imageLoader} />
          }
        />
        <ListItem containerStyle={{ paddingHorizontal: 0 }}>
          <ListItem.Content>
            <ListItem.Title
              style={{ fontSize: 20, paddingBottom: 5, fontWeight: '700' }}
            >
              {carDetails.car}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 16, paddingBottom: 5 }}>
              {carDetails.car_model}
            </ListItem.Subtitle>
            <ListItem.Subtitle
              style={{ fontSize: 16, paddingBottom: 5 }}
            >{`${carDetails.price} / day`}</ListItem.Subtitle>
            <ListItem.Subtitle style={{ fontSize: 16, paddingBottom: 5 }}>
              {carDetails.car_model_year}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem containerStyle={{ paddingHorizontal: 0 }}>
          <ListItem.Content>
            <ListItem.Title
              style={{ fontSize: 20, paddingBottom: 5, fontWeight: '700' }}
            >
              Details about the rental
            </ListItem.Title>
            <ListItem.Subtitle
              style={{ fontSize: 16, paddingBottom: 5, textAlign: 'left' }}
            >
              Car Rental. In the U.S., compact cars will be rented when
              available, and comparable models will be rented when traveling
              internationally. All optional insurance for rental cars while on
              L-3 business in the U.S. and Canada, are not reimbursable.
              Optional collision insurance purchased internationally is
              acceptable where obligatory. Fines for parking or traffic
              violations are not reimbursable expenses whether incurred in a
              rental car or while using one’s personal automobile for L-3
              business.
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          marginHorizontal: 5,
          backgroundColor: '#fff',
        }}
      >
        <Button
          buttonStyle={{
            height: 50,
            marginTop: 10,
          }}
          title='Book'
          onPress={() => Alert.alert('Booking flow goes from here')}
        />
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;
