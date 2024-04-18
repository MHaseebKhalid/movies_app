import React from "react";
import { View, Text } from "react-native";
import { commonStyles } from "../../../constants/commonStyles";

export const MovieTitle = ({ title }) => {
  return (
    <View>
      <Text style={{ fontSize: 24, color: commonStyles.colors.white }}>{title}</Text>
      <View style={{ width: 30, height: 5, backgroundColor: commonStyles.colors.white, marginTop: 4, marginBottom: 8 }} />
    </View>
  );
};
