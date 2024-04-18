import {
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit';
  import { getTopRatedMoviesList, getTrendingMoviesList, getUpcomingMoviesList } from '../../services/api/methods/getMovies'
  import Toast from 'react-native-toast-message';

  
  export const fetchTrendingMovies = createAsyncThunk(
    'get/fetchTrendingMovies',
    async () => {
      try {
        const response = await getTrendingMoviesList();
        const data = response.data;
        return data;
      } catch (err) {
        throw err.message == 'Network Error' ? err?.message : err?.response?.data;
      }
    },
  );

  export const fetchUpcomingMovies = createAsyncThunk(
    'get/fetchUpcomingMovies',
    async () => {
      try {
        const response = await getUpcomingMoviesList();
        const data = response.data;
        return data;
      } catch (err) {
        throw err.message == 'Network Error' ? err?.message : err?.response?.data;
      }
    },
  );

  export const fetchTopRatedMovies = createAsyncThunk(
    'get/fetchTopRatedMovies',
    async () => {
      try {
        const response = await getTopRatedMoviesList();
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
      trendingMovies: [],
      upComingMovies: [],
      topRatedMovies: [],
      loading: false,
      error: '',
    },
    reducers: {
      resetData: (state, action) => {
        state.trendingMovies = [];
        state.upComingMovies = [];
        state.topRatedMovies = [];
      },
    },
    extraReducers: builders => {
      builders
        .addCase(fetchTrendingMovies.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
          state.trendingMovies = action.payload.results;
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
          state.upComingMovies = action.payload.results;
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
          state.topRatedMovies = action.payload.results;
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
  
  export const { resetData } = movieSlice.actions;
  export default movieSlice.reducer;
  