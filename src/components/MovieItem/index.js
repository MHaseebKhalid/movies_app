import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback,Image } from "react-native";
import FastImage from "react-native-fast-image";
import {getImageUrl} from '../../services/utils'
import { styles } from "./styles";
import { fetchMovieDetails } from "../../redux/movieDetailSlice/movieDetailSlice";
import { useDispatch } from "react-redux";


export const MovieItem = ({ item, navigation, height, width, type }) => {
  const dispatch=useDispatch()
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dispatch(fetchMovieDetails(item.id)).then(()=>{
          navigation.navigate("MovieDetailScreen", { id: item.id });
        });
        
      }}
    >
      <View style={styles.imageContainer}>
        <FastImage style={[styles.imgStyle, height && width && {height,width}]} resizeMode="cover" source={getImageUrl(item.poster_path)} />
      </View>
    </TouchableWithoutFeedback>
  );
};


