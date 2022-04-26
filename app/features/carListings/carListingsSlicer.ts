import { createSlice } from '@reduxjs/toolkit';
import { CarState } from '../../utils/types';

const initialCarListingsData = [
  {
    id: 1,
    car: 'Mitsubishi',
    car_model: 'Montero',
    car_color: 'Yellow',
    car_model_year: 2002,
    car_vin: 'SAJWJ0FF3F8321657',
    price: '$2814.46',
    availability: false,
  },
  {
    id: 2,
    car: 'Volkswagen',
    car_model: 'Passat',
    car_color: 'Maroon',
    car_model_year: 2008,
    car_vin: 'WBANV9C51AC203320',
    price: '$1731.98',
    availability: false,
  },
];



const initialState: CarState = {
  loading: false,
  cars: initialCarListingsData,
  error: {
    message: '',
  },
};

const carListingsSlice = createSlice({
  name: 'carlistings',
  initialState,
  reducers: {},
});

export default carListingsSlice.reducer;