import axios from 'axios';
import Qs from 'qs';
import Config from "react-native-config";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ROOT_URL = Config.API_URL;

const BASE_URL = `${ROOT_URL}`;

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
