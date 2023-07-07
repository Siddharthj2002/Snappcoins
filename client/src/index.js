import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import merchantStore from './redux/merchant-store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { BrowserRouter } from 'react-router-dom';

const persistor = persistStore(merchantStore);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer bodyStyle={{ fontFamily: "Roboto" }} />
    <Provider store={merchantStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </>
);