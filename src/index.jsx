import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import getStore from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

const { ToastContainer, toast } = createStandaloneToast();
const store = getStore(toast);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
