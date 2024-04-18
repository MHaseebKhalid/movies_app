import React, { useState, useEffect, FC } from 'react';
import { Text, TextInput, View, FlatList, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { MoviesPosterandInfo } from '../../components';
import { commonStyles } from '../../constants/commonStyles';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { styles } from './styles';
import { searchMovie } from '../../redux/movieSearchSlice/movieSearchSlice';

interface SearchScreenProps {
  navigation: any; // Specify the correct type if using @react-navigation
  route: {
    params: {
      type: number;
    };
  };
}

interface Movie {
  id: number;
  // other properties you may need
}

interface SearchState {
  results: Movie[];
}

export const SearchScreen: FC<SearchScreenProps> = ({ navigation, route }) => {
  const { type } = route.params;
  const dispatch = useDispatch();
  const [searchState, setSearchState] = useState<SearchState>({ results: [] });

  const requestMovie = async (text: string) => {
    if (text !== "") {
      await dispatch(searchMovie(text)).then((response: any) => {
        // Assuming response.payload contains the results
        setSearchState({ results: response.payload.results });
      });
    }
  };

  const renderHeaderTitle = () => {
    const title = "Movies";
    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={heightPercentageToDP(3)} color={commonStyles.colors.black} style={{ paddingHorizontal: 12 }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{`Search ${title}`}</Text>
          <View style={{ flex: 1, paddingRight: 12 }}></View>
        </View>
        <View style={styles.titleBar} />
        <Text style={styles.subTitle}>
          {`Find best ${title.toLowerCase()}. Discover wonderful ${title.toLowerCase()}.`}
        </Text>
      </View>
    );
  };

  const renderSearchText = () => {
    return (
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} style={{ margin: 12 }} />
        <View style={{ alignSelf: "center", flex: 1 }}>
          <TextInput
            style={styles.searchInput}
            placeholder="Avengers: End Game"
            onChangeText={requestMovie}
            returnKeyType="search"
            autoCorrect={false}
          />
        </View>
      </View>
    );
  };

  const MovieList: FC<{ results: Movie[]; navigation: any; type: number }> = ({ results, navigation, type }) => {
    return (
      <FlatList
        keyExtractor={(item, index) => item.id.toString()}
        data={results}
        renderItem={({ item }) => <MoviesPosterandInfo data={item} navigation={navigation} type={type} />}
        contentContainerStyle={{ marginVertical: 8 }}
      />
    );
  };

  const renderListMovies = () => {
    return <MovieList results={searchState.results} navigation={navigation} type={type} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: commonStyles.colors.white }}>
      {renderHeaderTitle()}
      {renderSearchText()}
      {renderListMovies()}
    </View>
  );
};
