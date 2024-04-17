import {
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit';
  import { getTrendingMoviesList } from '../../services/api/methods/getMovies'
  import Toast from 'react-native-toast-message';

  
  export const fetchTrending = createAsyncThunk(
    'get/fetchTrending',
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
      },
    },
    extraReducers:(builders) => {
        builders
        .addCase(fetchTrending.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchTrending.fulfilled, (state, action) => {
            state.trendingMovies = action.payload;
            state.loading = false;
        })
        .addCase(fetchTrending.rejected, (state, action) => {
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
  