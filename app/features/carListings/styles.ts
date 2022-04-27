import { StyleSheet, Platform } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  detailsContainer: {
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
    borderWidth: 0,
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
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 100,
    height: 50,
    right: 5,
    bottom: 0,
  },
  floatingButtonStyle: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#397af8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
    marginRight: 10,
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
    marginLeft: 0,
  },
  overlayStyle: {
    flex: 2,
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 0 : 50,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    borderStyle: 'solid',
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  },
  searchInput: {
    backgroundColor: '#fff',
  },
  filterButton: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#397af8',
    paddingHorizontal: 20,
    color: '#fff',
  },
  overlayHeaderLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  bookingBtnContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  bookingBtn: {
    height: 50,
    marginTop: 10,
  },
  filterSafeArea: {
    borderBottomWidth: 1,
    marginHorizontal: 5,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  sliderTrack: {
    height: 5,
    backgroundColor: 'transparent',
  },
  sliderThumb: {
    height: 10,
    width: 10,
    backgroundColor: 'transparent',
  },
  sliderIcon: { 
    bottom: 20, 
    right: 10
  },
});
