import {getRequest} from '../';
import Config from 'react-native-config';
const API_KEY = Config.API_KEY;

const defaultQuery = {
  api_key: API_KEY,
  language: 'en-US',
  // include_adult: true,
  // region: "ID",
};
const queryString = obj => {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join('&');
};

export const getMovieDetailUrl = id =>
  getRequest(`/movie/${id}?${queryString(defaultQuery)}`);

export const getMovieCreditUrl = id =>
  getRequest(`/movie/${id}/credits?${queryString(defaultQuery)}`);
  
export const getMovieRecommendationsUrl = id =>
  getRequest(`/movie/${id}/recommendations?${queryString(defaultQuery)}`);
