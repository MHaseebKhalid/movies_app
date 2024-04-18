import React from "react";
import FastImage from "react-native-fast-image";
import { View, Text, FlatList, TouchableWithoutFeedback } from "react-native";
import { Styles } from "./Styles";
import { useRoute } from "@react-navigation/native";
import { getImageUrl } from "../../../services/utils";

export const MovieRecommendations = ({ recommendations, navigation }) => {
  const movieData = recommendations.results.slice(0, 10);
  const route = useRoute().name;

  if (movieData.length === 0) return null;

  return (
    <View>
      <Text style={Styles.titleText}>Recommendations</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={movieData}
        renderItem={({ item }) => Recommendations(item, navigation, route)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const Recommendations = (data, navigation, route) => {
  const imageUrl = getImageUrl(data.poster_path, "uri", "w185");

  return (
    <TouchableWithoutFeedback onPress={() => navigation.push(route, { id: data.id })}>
      <View>
        <View style={[Styles.imagePlaceholder, Styles.movieRecommImages]}>
          <FastImage source={imageUrl} style={Styles.movieRecommImages} />
        </View>
        <Text style={[Styles.bottomText, { width: 100 }]} numberOfLines={2}>
          {data.title}
          {data.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};


