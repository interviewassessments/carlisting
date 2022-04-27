import { DefaultNavigatorOptions, ParamListBase } from '@react-navigation/native';
import { Icon, ListItem, Image, Button } from '@rneui/themed';
import React from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  ScrollView,
  Alert,
} from 'react-native';

import { appText } from '../../utils/constants';
import { commonStyles } from '../../utils/styles';
import { styles } from './styles';

const DetailsScreen = ({ route }: any) => {
  const carDetails = route?.params?.carDetails;
  const image = route?.params?.image;
  return (
    <SafeAreaView style={styles.detailsContainer}>
      <ScrollView>
        <Image
          source={{ uri: image }}
          containerStyle={{ aspectRatio: 1 }}
          PlaceholderContent={
            <ActivityIndicator color='#0000ff' style={styles.imageLoader} />
          }
        />
        <ListItem containerStyle={commonStyles.paddingHorizontal10}>
          <ListItem.Content>
            <ListItem.Title style={commonStyles.title}>
              {carDetails.car}
            </ListItem.Title>
            <ListItem.Subtitle style={commonStyles.subTitle}>
              {carDetails.car_model}
            </ListItem.Subtitle>
            <ListItem.Subtitle
              style={commonStyles.subTitle}
            >{`${carDetails.price} / day`}</ListItem.Subtitle>
            <ListItem.Subtitle style={commonStyles.subTitle}>
              {carDetails.car_model_year}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem containerStyle={commonStyles.paddingHorizontal10}>
          <ListItem.Content>
            <ListItem.Title style={commonStyles.title}>
              {appText.details.text}
            </ListItem.Title>
            <ListItem.Subtitle style={commonStyles.subTitle}>
              {appText.details.sampleDesc}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ScrollView>
      <View style={styles.bookingBtnContainer}>
        <Button
          buttonStyle={styles.bookingBtn}
          title={appText.details.btnBook}
          disabled={!carDetails.availability}
          onPress={() => Alert.alert(appText.details.bookBtnAlertText)}
        />
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;
