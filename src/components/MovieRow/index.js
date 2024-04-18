import React from "react";
import { View, Text, FlatList, TouchableNativeFeedback } from "react-native";

import {MovieItem} from '../'
import { styles } from "./styles";


export const MoviesRow = ({ data, title, navigation, type }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>{title}</Text>
        <TouchableNativeFeedback onPress={() => navigation.navigate("MovieListScreen", { data, type, title })}>
          <Text style={styles.textMore}>More</Text>
        </TouchableNativeFeedback>
      </View>
      <FlatList
        data={data}
        horizontal
        renderItem={({ item }) => <MovieItem item={item} navigation={navigation} type={type} />}
        keyExtractor={(item) => item.id.toString()}
        style={{ margin: 8, marginTop: 4 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};



