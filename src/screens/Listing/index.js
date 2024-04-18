import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, FlatList } from "react-native";

import {MoviesPosterandInfo} from '../../components'
import { styles } from "./styles";

export const MovieListScreen=(props)=>{
    const {navigation,route}=props;
    const { title, type } = route.params;

    const [page, setPage] = useState(1)
    const [data, setData] = useState(route.params.data)

  const onReachEnd = async () => {
    const page = { page: page + 1 };

    // const fetchUrl = fetchFunctionListScreen(type, title);
    // const response = await fetchUrl(page);

    // if (response) {
    //   this.setState((prevState) => ({ page: prevState.page + 1, data: [...prevState.data, ...response.results] }));
    // }
  };

  const MovieList = ({ results, navigation, type, onReachEnd }) => {
    return (
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps={"handled"}
        data={results}
        renderItem={({ item }) => <MoviesPosterandInfo data={item} navigation={navigation} type={type} />}
        contentContainerStyle={{ marginVertical: 8 }}
        onEndReached={onReachEnd}
        onEndReachedThreshold={0.9}
      />
    );
  };

  renderTitle = () => {
    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          {/* <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} /> */}
          <Text style={styles.headerTitle}>{`${title} ${type === "tv" ? "TV Show" : "Movies"}`}</Text>
          <View style={{ flex: 1, paddingRight: 12 }}></View>
        </View>
        <View style={styles.titleBar} />
      </View>
    );
  };

    return (
      <View style={{flex:1}}>
        {renderTitle()}
        <MovieList results={data} navigation={navigation} onReachEnd={onReachEnd} type={type} />
      </View>
    );
  }



