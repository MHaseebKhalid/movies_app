import React, { useState, useEffect, FC } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MoviesPosterandInfo } from '../../components';
import { styles } from "./styles";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../../redux/movieSlice/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { commonStyles } from "../../constants/commonStyles";
import { heightPercentageToDP } from "react-native-responsive-screen";

interface RouteParams {
  title: string;
  type: number;
  data: any[]; // Specify the type more specifically if possible
}

interface MovieListScreenProps {
  navigation: any; 
  route: {
    params: RouteParams;
  };
}

interface Movie {
  id: number;
  // other properties
}

interface MovieState {
  [key: string]: {
    results: Movie[];
    page: number;
    total_pages: number;
  };
}

const movieTypes = {
  1: 'trendingMovies',
  2: 'upComingMovies',
  3: 'topRatedMovies'
};

const fetchActions = {
  1: fetchTrendingMovies,
  2: fetchUpcomingMovies,
  3: fetchTopRatedMovies
};

export const MovieListScreen: FC<MovieListScreenProps> = ({ navigation, route }) => {
    const { title, type } = route.params;
    const dispatch = useDispatch();
    const moviesReducer = useSelector((state: { moviesReducer: MovieState }) => state.moviesReducer);

    const [data, setData] = useState<Movie[]>(route.params.data);

    useEffect(() => {
      const key = movieTypes[type];
      const movies = moviesReducer[key]?.results || [];
      setData(movies);
    }, [moviesReducer, type]);
    

    const onReachEnd = async () => {
      const key = movieTypes[type];
      const currentPage = moviesReducer[key]?.page;
      const totalPages = moviesReducer[key]?.total_pages;
    
      if (currentPage !== totalPages) {
        const fetchMoreMovies = fetchActions[type];
        dispatch(fetchMoreMovies(currentPage + 1)).then((res) => {
          // Assuming `res.payload.results` exists and is an array of movies
          // setData(existingMovies => [...existingMovies, ...res.payload.results]);
        })
      }
    };

  const MovieList: FC<{ results: Movie[]; navigation: any; onReachEnd: () => void; type: number }> = ({ results, navigation, onReachEnd }) => {
    return (
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={results}
        renderItem={({ item }) => <MoviesPosterandInfo data={item} navigation={navigation} type={type} />}
        contentContainerStyle={{ marginVertical: 8 }}
        onEndReached={onReachEnd}
        onEndReachedThreshold={0.9}
      />
    );
  };

  const renderTitle = () => {
    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={heightPercentageToDP(3)} color={commonStyles.colors.black} style={{ paddingHorizontal: 12 }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={{ flex: 1, paddingRight: 12 }}></View>
        </View>
        <View style={styles.titleBar} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: commonStyles.colors.white }}>
      {renderTitle()}
      <MovieList results={data} navigation={navigation} onReachEnd={onReachEnd} type={type} />
    </View>
  );
}
