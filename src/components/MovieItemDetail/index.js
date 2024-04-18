import React, { useEffect,useState } from "react";
import PropTypes from "prop-types";
import { genres } from '../../services/utils'
import { View, TouchableWithoutFeedback, Text } from "react-native";
import {MovieItem,MovieRating} from '../'
import { commonStyles } from "../../constants/commonStyles";
import moment from "moment";
import { fetchMovieDetails } from "../../redux/movieDetailSlice/movieDetailSlice";
import { useDispatch } from "react-redux";

export const  MoviesPosterandInfo =(props)=>{
  const { data, navigation, type } = props;
  const dispatch = useDispatch();

  const Genres = (genreId = []) => {
    const text = genreId.map((item) => genres[item.toString()].name);
    return text.join(", ");
  };

    return (
      <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            dispatch(fetchMovieDetails(data.id)).then(()=>{
              navigation.navigate("MovieDetailScreen", { id: data.id });
            })
          
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <MovieItem item={data} height={150} width={100} navigation={navigation} type={type} />
            <View style={{ margin: 16, marginBottom: 24, flex: 1 }}>
              <Text style={{ fontSize: 16, marginBottom: 10 }} numberOfLines={2}>
                {data.name}
                {data.title}
              </Text>
              <MovieRating rating={data.vote_average} textColor={commonStyles.colors.black} />
              <Text style={{ fontSize: 12, marginTop: 10, width: "75%" }}>
                {Genres(data.genre_ids)}
              </Text>

              <Text style={{ fontSize: 12, marginTop: 10, width: "75%" }}>
                {moment(data.release_date).format("MMM DD, yyyy")}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }


