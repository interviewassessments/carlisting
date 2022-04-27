import { CarData } from './types';

export const generateUniqueColors = (cars: CarData[]) => {
  const colorValues = cars.map((car) => car.car_color);
  const uniqueColorValues = new Set(colorValues);
  let colorValuesFromSet = [];
  for (let color of uniqueColorValues) {
    colorValuesFromSet.push({
      label: color,
      value: color,
    });
  }
  return colorValuesFromSet;
};

export const generateUniqueYears = (cars: CarData[]) => {
  const yearValues = cars.map((car) => car.car_model_year);
  yearValues.sort((a, b) => Number(a) - Number(b));
  const uniqueYearValues = new Set(yearValues);
  let yearValuesFromSet = [];
  for (let year of uniqueYearValues) {
    yearValuesFromSet.push({
      label: `${year}`,
      value: `${year}`,
    });
  }
  return yearValuesFromSet;
};

export const generateUniqueCarMakes = (cars: CarData[]) => {
  const carMakeValues = cars.map((car) => car.car);
  const uniqueYearValues = new Set(carMakeValues);
  let makeValuesFromSet = [];
  for (let make of uniqueYearValues) {
    makeValuesFromSet.push({
      label: make,
      value: make,
    });
  }
  return makeValuesFromSet;
};

export const generateMinMaxPriceValues = (cars: CarData[]) => {
    const carPrices = cars.map(car => car.price);
    carPrices.sort((a, b) => {
        let price1 = Number(a.substring(1));
        let price2 = Number(b.substring(1));
        return price1 - price2;
    });
    return {
        minimum: carPrices[0],
        maximum: carPrices[carPrices.length - 1]
    }
}
