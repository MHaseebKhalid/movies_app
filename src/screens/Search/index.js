import React, { useState,useEffect } from "react";
import { Text, TextInput, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";



import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign'

import { useDispatch } from "react-redux";
import { MoviesPosterandInfo } from "../../components";
import { commonStyles } from "../../constants/commonStyles";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { styles } from "./styles";
import { searchMovie } from "../../redux/movieSearchSlice/movieSearchSlice";

export const SearchScreen =(props)=> {
  let {navigation,route} = props;
  const { type } = route.params;

  const dispatch = useDispatch();
  const [state, setstate] = useState({
    search:{},
  })

  const requestMovie = async (text) => {
    if (text !== "") {
       await dispatch(searchMovie(text)).then((response) => {
        setstate({search:response.payload})
       })
    }
  };

 const renderHeaderTitle = () => {
    const title =  "Movies";

    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <AntDesign name="left" size={heightPercentageToDP(3)} color={commonStyles.colors.black} style={{paddingHorizontal:12}}/>
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

  renderSearchText = () => {
    return (
      <View style={styles.searchContainer}>
        <Icon name={"search"} size={20} style={{ margin: 12 }} />
        <View style={{ alignSelf: "center", flex: 1 }}>
          <TextInput
            style={styles.searchInput}
            placeholder={"Avengers: End Game"}
            onChangeText={(text) => requestMovie(text)}
            returnKeyType={"search"}
            autoCorrect={false}
          />
        </View>
      </View>
    );
  };
  const MovieList = ({ results, navigation, type, onReachEnd }) => {
    return (
      <FlatList
        keyExtractor={(item,index) => item.id.toString()}
        // keyboardShouldPersistTaps={"handled"}
        data={results}
        renderItem={({ item }) => <MoviesPosterandInfo data={item} navigation={navigation} type={type} />}
        contentContainerStyle={{ marginVertical: 8 }}
        onEndReached={onReachEnd}
        onEndReachedThreshold={0.9}
      />
    );
  };

  const renderListMovies = () => {
    const { results = [] } = state.search;
    return <MovieList results={results} navigation={navigation} type={type} />;
  };

    return (
      <View style={{flex:1,backgroundColor:commonStyles.colors.white}}>
        {renderHeaderTitle()}
        {renderSearchText()}
        {renderListMovies()}
      </View>
    );  
}
