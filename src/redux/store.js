import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import {thunk} from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Reducers

//Auth reducers
import moviesReducer from './movieSlice/movieSlice';
import moviesDetailReducer from './movieDetailSlice/movieDetailSlice';
import movieSearchReducer from './movieSearchSlice/movieSearchSlice';

const reducers = combineReducers({
    moviesReducer,
    moviesDetailReducer,
    movieSearchReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([thunk]),
});

export default store;
