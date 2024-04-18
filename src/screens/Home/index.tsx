import React, { useEffect, useState, FC } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header, MovieRating, MoviesRow } from '../../components';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../../redux/movieSlice/movieSlice';
import { MovieBackdrop, MovieTitle } from '../Details/components';

interface HomeScreenProps {
  navigation: any; 
}

interface MovieState {
  loading: boolean;
  trendingMovies: MovieList;
  upComingMovies: MovieList;
  topRatedMovies: MovieList;
}

interface MovieList {
  results: Movie[];
}

interface Movie {
  backdrop_path: string;
  title: string;
  vote_average: number;
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const moviesReducer = useSelector((state: { moviesReducer: MovieState }) => state.moviesReducer);

  const [loading, setLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);

  const [movieData, setMovieData] = useState<Movie | null>(null);

  useEffect(() => {
    refreshList();
  }, [isFocused]);

  useEffect(() => {
    setLoading(moviesReducer.loading);

    setTrendingMovies(moviesReducer.trendingMovies.results);
    setUpcomingMovies(moviesReducer.upComingMovies.results);
    setTopRated(moviesReducer.topRatedMovies.results);

    if (moviesReducer.trendingMovies.results) {
      const randomNumber = Math.floor(Math.random() * moviesReducer.trendingMovies.results.length);
      setMovieData(moviesReducer.trendingMovies.results[randomNumber]);
    }
  }, [moviesReducer]);

  const refreshList = () => {
    dispatch(fetchTrendingMovies(1));
    dispatch(fetchUpcomingMovies(1));
    dispatch(fetchTopRatedMovies(1));
  };

  const movieInfoGeneral = () => {
    const title = 'Movie of the Day:\n';
    if (!movieData) return null;
    return (
      <MovieBackdrop backdrop={movieData.backdrop_path}>
        <View>
          <MovieTitle title={title + movieData.title} />
          <MovieRating rating={movieData.vote_average} />
        </View>
      </MovieBackdrop>
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} type="movie" />
      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshList} />}
        showsVerticalScrollIndicator={false}>
        {movieInfoGeneral()}
        <MoviesRow key="Trending" data={trendingMovies} title="Trending Movies" navigation={navigation} type={1} />
        <MoviesRow key="Upcoming" data={upcomingMovies} title="Upcoming Movies" navigation={navigation} type={2} />
        <MoviesRow key="Top" data={topRated} title="Top Rated Movies" navigation={navigation} type={3} />
      </ScrollView>
    </View>
  );
};
