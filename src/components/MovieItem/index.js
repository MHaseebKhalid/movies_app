import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback,Image } from "react-native";
import FastImage from "react-native-fast-image";
import {getImageUrl} from '../../services/utils'
import { styles } from "./styles";


export const MovieItem = ({ item, navigation, height, width, type }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (type === "tv") {
        //   navigation.navigate("TVDetail", { id: item.id });
        } else {
        //   navigation.navigate("MovieDetail", { id: item.id });
        }
      }}
    >
      <View style={styles.imageContainer}>
        <FastImage style={[styles.imgStyle, height && width && {height,width}]} resizeMode="cover" source={getImageUrl(item.poster_path)} />
      </View>
    </TouchableWithoutFeedback>
  );
};


