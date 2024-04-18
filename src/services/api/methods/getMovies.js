import Config from 'react-native-config';
import {getRequest} from '../';

export const getTrendingMoviesList = (page) =>
  getRequest(`/trending/movie/day?api_key=${Config.API_KEY}&page=${page}`);

export const getUpcomingMoviesList = (page) =>
  getRequest(`/movie/upcoming?api_key=${Config.API_KEY}&page=${page}`);

export const getTopRatedMoviesList = (page) =>
  getRequest(`/movie/top_rated?api_key=${Config.API_KEY}&page=${page}`);
