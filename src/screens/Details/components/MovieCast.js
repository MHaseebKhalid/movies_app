import React from "react";
import { FlatList, View, Text } from "react-native";
import FastImage from "react-native-fast-image";

import { Styles } from "./Styles";
import { getImageUrl } from "../../../services/utils";

export const MovieCast = ({ credit }) => {
  let cast = [...credit?.cast].sort((a, b) => (a.order > b.order ? 1 : -1));
  cast = cast.slice(0, 10);

  if (cast.length === 0) return null;

  return (
    <View>
      <Text style={Styles.titleText}>Cast</Text>
      <FlatList
        keyExtractor={(item,index) => index.toString()}
        data={cast}
        renderItem={({ item }) => Cast(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const Cast = (cast) => {
  const imageUrl = getImageUrl(cast.profile_path, "uri", "w185");
  return (
    <View>
      <View style={Styles.castImageContainer}>
        <FastImage source={imageUrl} style={Styles.castImage} resizeMode={"cover"} />
      </View>
      <Text style={Styles.bottomText} numberOfLines={2}>
        {cast.name}
      </Text>
    </View>
  );
};


