import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getSearchMovieUrl
} from '../../services/api/methods/searchMovie';
import Toast from 'react-native-toast-message';


export const searchMovie = createAsyncThunk(
  'movies/searchMovie',
  async (keyword, { rejectWithValue }) => { 
    try {
     
      const response = await getSearchMovieUrl(keyword)
      
      const data =  response.data 
      return data
    } catch (err) {
      console.error("Error fetching movie details:", err);
      return rejectWithValue(
        err.message === 'Network Error' ? 'Network Error' : err?.response?.data
      );
    }
  }
);

const movieSearchSlice = createSlice({
  name: 'movies',
  initialState: {
    movieList:null,
    loading: false,
    error: '',
  },
  reducers: {
    resetSearchData: (state, action) => {
      state.details=null;
    },
  },
  extraReducers: builders => {
    builders
      .addCase(searchMovie.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchMovie.fulfilled, (state, action) => {
        state.movieList = action.payload
        state.loading = false;
      })
      .addCase(searchMovie.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: action?.error?.message,
        });
      })
  },
});

export const {resetSearchData} = movieSearchSlice.actions;
export default movieSearchSlice.reducer;
