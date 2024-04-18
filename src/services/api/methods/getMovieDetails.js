import {getRequest} from '../';
import { defaultQuery, queryString } from '../../utils';

export const getMovieDetailUrl = id =>
  getRequest(`/movie/${id}?${queryString(defaultQuery)}`);

export const getMovieCreditUrl = id =>
  getRequest(`/movie/${id}/credits?${queryString(defaultQuery)}`);
  
export const getMovieRecommendationsUrl = id =>
  getRequest(`/movie/${id}/recommendations?${queryString(defaultQuery)}`);
