import React, { useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import store from '../redux/store';
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';
isIphoneX = DeviceInfo.hasNotch();

LogBox.ignoreAllLogs(true);
StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor('transparent');
StatusBar.setBarStyle('dark-content');
//local imports
import App from './app';

let persistor = persistStore(store);
const Setup = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <App />
          <Toast topOffset={0} visibilityTime={7000} />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default Setup;
