import React from 'react';
import store from './store';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, ToastContainer } from 'coderui';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
