// React Navigation ParamList
export type MainBottomTabParamList = {
  Home: undefined;
  'Car Listings': undefined;
};

export type CarStackParamList = {
  Listings: undefined;
  Details: {
    carDetails: object;
  };
};

// Application State Types
export interface CarData {
  id: number;
  car: string;
  car_model: string;
  car_color: string;
  car_model_year: number;
  car_vin: string;
  price: string;
  availability: boolean;
}

export interface CarState {
  loading: boolean;
  cars: CarData[];
  error: error;
}

export interface error {
  message: string;
}

export interface ImageState {
  loading: boolean;
  images: ImageData[];
  error: error;
}
export interface ImageData {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}
