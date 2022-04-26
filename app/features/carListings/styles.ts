import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
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