import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getMovieDetailUrl,
getMovieCreditUrl,
getMovieRecommendationsUrl,
} from '../../services/api/methods/getMovieDetails';
import Toast from 'react-native-toast-message';


export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (id, { rejectWithValue }) => { 
    try {
     
      const responses = await Promise.all([
        getMovieDetailUrl(id),
        getMovieCreditUrl(id),
        getMovieRecommendationsUrl(id),
      ]);
      
      const data = responses.map(response => response.data); 
      return {
        movieDetails: data[0],
        moviecredits: data[1],
        movieRecommendations: data[2]
      };
    } catch (err) {
      console.error("Error fetching movie details:", err);
      return rejectWithValue(
        err.message === 'Network Error' ? 'Network Error' : err?.response?.data
      );
    }
  }
);



const movieDetailSlice = createSlice({
  name: 'movies',
  initialState: {
    details:null,
    loading: false,
    error: '',
  },
  reducers: {
    resetDetailsData: (state, action) => {
      state.details=null;
    },
  },
  extraReducers: builders => {
    builders
      .addCase(fetchMovieDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.details = action.payload
        state.loading = false;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: action?.error?.message,
        });
      })
  },
});

export const {resetDetailsData} = movieDetailSlice.actions;
export default movieDetailSlice.reducer;
