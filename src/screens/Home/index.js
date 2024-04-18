import React,{useEffect,useState} from 'react'
import { View, Text,ScrollView,RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from '../../components';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../../redux/movieSlice/movieSlice';

import {MoviesRow} from '../../components'

export const HomeScreen=(props)=> {
  let {navigation}=props;
  const dispatch = useDispatch();
  const { moviesReducer } = useSelector(state=>state)
  console.log("🚀 ~ HomeScreen ~ moviesReducer:", moviesReducer)

  const [loading, setloading] = useState(false)
  const [trendingMovies, settrendingMovies] = useState([])
  const [upcomingMovies, setupcomingMovies] = useState([])
  const [topRated, settopRated] = useState([])

  const MovieTypes = ["Trending", "Upcoming", "Top Rated"];


  useEffect(() => {
    refreshList()
  }, [])

  useEffect(() => {
    setloading(moviesReducer?.loading)

    settrendingMovies(moviesReducer?.trendingMovies)
    setupcomingMovies(moviesReducer?.upComingMovies)
    settopRated(moviesReducer?.topRatedMovies)
  }, [moviesReducer])
  

  const refreshList=()=>{
   dispatch(fetchTrendingMovies())
   dispatch(fetchUpcomingMovies())
   dispatch(fetchTopRatedMovies())
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
          type={'movie'}
        />
        <MoviesRow
          key={'Upcoming'}
          data={upcomingMovies}
          title={'Upcoming Movies'}
          navigation={navigation}
          type={'movie'}
        />
        <MoviesRow
          key={'Top'}
          data={topRated}
          title={'Top Rated Movies'}
          navigation={navigation}
          type={'movie'}
        />
      </ScrollView>
    </View>
  );
}