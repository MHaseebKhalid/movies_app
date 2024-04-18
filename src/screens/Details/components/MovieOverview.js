import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

import { Styles } from "./Styles";

export const MovieOverview = ({ overview }) => {
  const [textShown, setTextShown] = useState(false);

  if (!overview) return null;

  return (
    <View>
      <Text style={Styles.titleText}>Overview</Text>
      <TouchableWithoutFeedback onPress={() => setTextShown(!textShown)}>
        <Text numberOfLines={textShown ? 0 : 3} style={Styles.textOverview}>
          {overview}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

