import React,{useEffect,useState} from 'react'
import { View, Text,ScrollView,RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from '../../components';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../../redux/movieSlice/movieSlice';

import {MoviesRow} from '../../components'

export const HomeScreen=(props)=> {
  let {navigation}=props;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { moviesReducer } = useSelector(state=>state)

  const [loading, setloading] = useState(false)
  const [trendingMovies, settrendingMovies] = useState([])
  const [upcomingMovies, setupcomingMovies] = useState([])
  const [topRated, settopRated] = useState([])

  useEffect(() => {
    refreshList()
  }, [isFocused])

  useEffect(() => {
    setloading(moviesReducer?.loading)

    settrendingMovies(moviesReducer?.trendingMovies?.results)
    setupcomingMovies(moviesReducer?.upComingMovies?.results)
    settopRated(moviesReducer?.topRatedMovies?.results)
  }, [moviesReducer])
  

  const refreshList=()=>{
   dispatch(fetchTrendingMovies(1))
   dispatch(fetchUpcomingMovies(1))
   dispatch(fetchTopRatedMovies(1))
  }
  

  return (
    <View style={styles.container}>
      <Header navigation={navigation} type={'movie'} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshList} />
        }
        showsVerticalScrollIndicator={false}>
        <MoviesRow
          key={'Trending'}
          data={trendingMovies}
          title={'Trending Movies'}
          navigation={navigation}
          type={1}
        />
        <MoviesRow
          key={'Upcoming'}
          data={upcomingMovies}
          title={'Upcoming Movies'}
          navigation={navigation}
          type={2}
        />
        <MoviesRow
          key={'Top'}
          data={topRated}
          title={'Top Rated Movies'}
          navigation={navigation}
          type={3}
        />
      </ScrollView>
    </View>
  );
}