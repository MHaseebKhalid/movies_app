import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { commonStyles } from "../../../constants/commonStyles";

export const MovieGenres = ({ genre }) => {
  let component = genre.map((item, index) => {
    return (
      <View key={index} style={_styles.view}>
        <Text style={_styles.text}>{item.name}</Text>
      </View>
    );
  });

  return <View style={_styles.container}>{component}</View>;
};


const _styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "70%",
  },

  view: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 0.75,
    borderColor: commonStyles.colors.darkBlue,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },

  text: {
    color: commonStyles.colors.darkBlue,
    fontSize: 12,
  },
});
