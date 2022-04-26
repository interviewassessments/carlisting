import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/apiConstants';
import { fetchRandomImagesAPI } from '../../api/randomImagesApi';
import {
  GENERAL_ERROR_MESSAGE,
  initialRandomImageData,
} from '../../utils/constants';
import { ImageState, ImageData } from '../../utils/types';

const initialState: ImageState = {
  loading: false,
  images: initialRandomImageData,
  error: {
    message: '',
  },
};

export const fetchRandomImages = createAsyncThunk(
  'images/fetchRanomImage',
  async () => {
    const response = await fetch(api.randomImages);
    return (await response.json()) as ImageData[];
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomImages.pending, (state) => {
        state.loading = true;
        state.error.message = '';
      })
      .addCase(fetchRandomImages.fulfilled, (state, action) => {
        state.images = action.payload;
        state.loading = false;
        state.error.message = '';
      })
      .addCase(fetchRandomImages.rejected, (state) => {
        state.loading = false;
        state.error.message = GENERAL_ERROR_MESSAGE;
      });
  },
});

export default homeSlice.reducer;
