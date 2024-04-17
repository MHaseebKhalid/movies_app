import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Preference from 'react-native-preference';
import Qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { showErrorMsg } from '../utils'

const ServerURL = 'https://dev.letribe.com';
const LiveURL = 'https://api.letribe.com';
const local = 'http://192.168.50.198:8000';
const ngURL='https://26c6-180-92-147-86.ap.ngrok.io';

const ROOT_URL = __DEV__ ? LiveURL : LiveURL;

const BASE_URL = `${ROOT_URL}/api/v1`;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const clientWithOutToken = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const clientMultiPart = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

clientMultiPart.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    let authToken = await AsyncStorage.getItem('userToken');
    if (authToken) {
      authToken = JSON.parse(authToken);
    }
    if (authToken) {
      requestConfig.headers = {
        Authorization: `Bearer ${authToken}`,
      };
    }
    requestConfig.paramsSerializer = (params) => {
      return Qs.stringify(params, {
        arrayFormat: 'brackets',
        encode: false,
      });
    };
    return requestConfig;
  },
  (err) => {
    return Promise.reject(err);
  },
);

client.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    let authToken = await AsyncStorage.getItem('userToken');
    if (authToken) {
      authToken = JSON.parse(authToken);
    }
    if (authToken) {
      requestConfig.headers = {
        Authorization: `Bearer ${authToken}`,
      };
    }
    requestConfig.paramsSerializer = (params) => {
      return Qs.stringify(params, {
        arrayFormat: 'brackets',
        encode: false,
      });
    };
    return requestConfig;
  },
  (err) => {
    return Promise.reject(err);
  },
);

clientWithOutToken.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    requestConfig.paramsSerializer = (params) => {
      return Qs.stringify(params, {
        arrayFormat: 'brackets',
        encode: false,
      });
    };
    return requestConfig;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export { ROOT_URL, BASE_URL, client, clientMultiPart, clientWithOutToken };
