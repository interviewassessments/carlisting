import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/apiConstants';
import { fetchCarsAPI } from '../../api/carListingsApi';
import { GENERAL_ERROR_MESSAGE, initialCarListingsData } from '../../utils/constants';
import { CarData, CarState } from '../../utils/types';



const initialState: CarState = {
  loading: false,
  cars: initialCarListingsData,
  error: {
    message: '',
  },
};

const requestParams = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  const response = await fetchCarsAPI(
    api.cars,
    requestParams
  );
  return response.cars as CarData[];
});

const carListingsSlice = createSlice({
  name: 'carlistings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCars.pending, (state) => {
      state.loading = true;
      state.error.message = '';
    }).addCase(fetchCars.fulfilled, (state, action) => {
      state.cars = action.payload;
      state.loading = false;
      state.error.message = '';
    }).addCase(fetchCars.rejected, (state) => {
      state.loading = false;
      state.error.message = GENERAL_ERROR_MESSAGE;
    });
  },
});

export default carListingsSlice.reducer;