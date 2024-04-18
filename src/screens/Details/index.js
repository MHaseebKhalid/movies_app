import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import {
  MovieTitle,
  MovieGenres,
  MovieRecommendations,
  MovieCast,
  MovieOverview,
  MovieBackdrop,
} from './components';
import {MovieRating} from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovieDetails} from '../../redux/movieDetailSlice/movieDetailSlice';
import {commonStyles} from '../../constants/commonStyles';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export const MovieDetailScreen = props => {
  let {navigation, route} = props;
  const {id} = route.params;
  const dispatch = useDispatch();
  const {moviesDetailReducer} = useSelector(state => state);
  let {loading, details} = moviesDetailReducer;
  let {movieDetails, moviecredits,  movieRecommendations} = details;
  
  const [state, setState] = useState({
    movieData:movieDetails,
    credit:moviecredits,
    recommendations:movieRecommendations,
    isLoaded: false,
  });

  useEffect(() => {
    requestInfoDetail();
  }, []);

  useEffect(() => {
   setState({
      movieData:movieDetails,
      credit:moviecredits,
      recommendations:movieRecommendations,
      isLoaded: !loading,
    });
  }, [moviesDetailReducer]);

  const requestInfoDetail = async () => {
    dispatch(fetchMovieDetails(id));
  };


  const movieInfoGeneral = () => {
    const {movieData, isLoaded} = state;
    return (
      <MovieBackdrop backdrop={movieData.backdrop_path}>
        {isLoaded && (
          <View>
            <MovieTitle title={movieData.title} />
            <MovieRating rating={movieData.vote_average} />
          </View>
        )}
      </MovieBackdrop>
    );
  };

  const movieInfoDetail = () => {
    const {movieData, credit, isLoaded,   recommendations} =
    state;
    return (
      <View style={Styles.movieDetailWrapper}>
        <View style={Styles.movieDetail}>
          {isLoaded && (
            <View>
              <MovieGenres genre={movieData.genres} />
              <MovieOverview overview={movieData.overview} />
              <MovieCast credit={credit} />
              <MovieRecommendations
                recommendations={recommendations}
                navigation={navigation}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: commonStyles.colors.white}}>
      <TouchableOpacity style={Styles.topIcon} onPress={() => navigation.goBack()}>
        <AntDesign
          name="left"
          size={heightPercentageToDP(3)}
          color={commonStyles.colors.white}
          style={{paddingHorizontal: 12}}
        />
      </TouchableOpacity>
      <ScrollView
        style={Styles.scrollview}
        contentContainerStyle={{flexGrow: 1}}
        bounces={false}>
        <StatusBar translucent backgroundColor={'transparent'} />
        {movieInfoGeneral()}
        {movieInfoDetail()}
      </ScrollView>
      
     </View>
  );
};
