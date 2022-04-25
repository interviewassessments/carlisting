import React from 'react';
import { Provider } from 'react-redux';
import Test from './app/features/test/Test';
import { store } from './app/store';

const App = () => {
  return (
    <Provider store={store}>
      <Test />
    </Provider>
  );
};

export default App;
