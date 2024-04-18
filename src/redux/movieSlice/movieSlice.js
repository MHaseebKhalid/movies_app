import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getTopRatedMoviesList,
  getTrendingMoviesList,
  getUpcomingMoviesList,
} from '../../services/api/methods/getMovies';
import Toast from 'react-native-toast-message';

export const fetchTrendingMovies = createAsyncThunk(
  'get/fetchTrendingMovies',
  async page => {
    try {
      const response = await getTrendingMoviesList(page);
      const data = response.data;
      return data;
    } catch (err) {
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

export const fetchUpcomingMovies = createAsyncThunk(
  'get/fetchUpcomingMovies',
  async page => {
    try {
      const response = await getUpcomingMoviesList(page);
      const data = response.data;
      return data;
    } catch (err) {
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

export const fetchTopRatedMovies = createAsyncThunk(
  'get/fetchTopRatedMovies',
  async page => {
    try {
      const response = await getTopRatedMoviesList(page);
      const data = response.data;
      return data;
    } catch (err) {
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    trendingMovies: {
      page: 1,
      total_pages: 1,
      total_results: 0,
      results: [],
    },
    upComingMovies: {
      page: 1,
      total_pages: 1,
      total_results: 0,
      results: [],
    },
    topRatedMovies: {
      page: 1,
      total_pages: 1,
      total_results: 0,
      results: [],
    },
    loading: false,
    error: '',
  },
  reducers: {
    resetData: (state, action) => {
      state.trendingMovies = {
        page: 1,
        total_pages: 1,
        total_results: 0,
        results: [],
      };
      state.upComingMovies = {
        page: 1,
        total_pages: 1,
        total_results: 0,
        results: [],
      };
      state.topRatedMovies = {
        page: 1,
        total_pages: 1,
        total_results: 0,
        results: [],
      };
    },
  },
  extraReducers: builders => {
    builders
      .addCase(fetchTrendingMovies.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trendingMovies.total_pages = action.payload.total_pages;
        state.trendingMovies.page = action.payload.page;
        state.trendingMovies.total_results = action.payload.total_results;
        if (action.payload.page !== 1) {
           state.trendingMovies.results = [...state.trendingMovies.results, ...action.payload.results];
          } else {
          state.trendingMovies.results = action.payload.results;
        }
        state.loading = false;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: action?.error?.message,
        });
      })

      //upcoming
      .addCase(fetchUpcomingMovies.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upComingMovies.total_pages = action.payload.total_pages;
        state.upComingMovies.page = action.payload.page;
        state.upComingMovies.total_results = action.payload.total_results;
        if (action.payload.page !== 1) {
          state.upComingMovies.results = [...state.upComingMovies.results, ...action.payload.results];
        } else {
          state.upComingMovies.results = action.payload.results;
        }
        state.loading = false;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: action?.error?.message,
        });
      })

      //top
      .addCase(fetchTopRatedMovies.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRatedMovies.total_pages = action.payload.total_pages;
        state.topRatedMovies.page = action.payload.page;
        state.topRatedMovies.total_results = action.payload.total_results;
        if (action.payload.page !== 1) {
          state.topRatedMovies.results = [...state.topRatedMovies.results, ...action.payload.results];
        } else {
          state.topRatedMovies.results = action.payload.results;
        }
        state.loading = false;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: action?.error?.message,
        });
      });
  },
});

export const {resetData} = movieSlice.actions;
export default movieSlice.reducer;
