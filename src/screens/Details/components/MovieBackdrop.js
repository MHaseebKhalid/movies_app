import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";

import { getImageUrl } from "../../../services/utils";
import { commonStyles } from "../../../constants/commonStyles";

export const MovieBackdrop = ({ backdrop, children }) => {
  const url = getImageUrl(backdrop, "uri", "original");
  return (
    <View style={_styles.container}>
      <FastImage source={url} resizeMode={"cover"} style={_styles.imageStyle} />
      <LinearGradient colors={[commonStyles.colors.transparent, commonStyles.colors.black]} locations={[0.45, 0.9]} style={_styles.gradientImage} />
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, margin: 16, borderTopLeftRadius: 16 }}>
        {children}
      </View>
    </View>
  );
};


const _styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height / 2.5,
    backgroundColor: commonStyles.colors.black,
  },

  imageStyle: {
    flex: 1,
    height: Dimensions.get("window").width * 1.7777,
    width: Dimensions.get("window").width,
  },

  gradientImage: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});
