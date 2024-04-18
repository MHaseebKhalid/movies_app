import {getRequest} from '../';
import { defaultQuery, queryString } from '../../utils';

export const getSearchMovieUrl = (keyword) =>
  getRequest(`/search/movie?${queryString({ ...defaultQuery, ...{ query: keyword } })}`);