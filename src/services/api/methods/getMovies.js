import Config from 'react-native-config';
import {getRequest} from '../';

export const getTrendingMoviesList = () =>
  getRequest(`/trending/movie/day?api_key=${Config.API_KEY}`);

export const getUpcomingMoviesList = () =>
  getRequest(`/movie/upcoming?api_key=${Config.API_KEY}`);

export const getTopRatedMoviesList = () =>
  getRequest(`/movie/top_rated?api_key=${Config.API_KEY}`);
