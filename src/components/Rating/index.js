import React from "react";
import { View, Text, StyleSheet } from "react-native";


import Icon from "react-native-vector-icons/FontAwesome";
import { commonStyles } from "../../constants/commonStyles";
import { styles } from "./styles";

export const MovieRating = ({ rating, style, textColor }) => {
  const Rating = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Star color={commonStyles.colors.white} />
        <Star color={commonStyles.colors.yellow} rating={rating} />
        <Text style={[styles.ratingText, { color: textColor }]}>{(rating / 2).toFixed(1)}</Text>
      </View>
    );
  };

  const Star = ({ color, rating = 10 }) => {
    const items = [];
    for (let i = 1; i <= 5; i++) {
      items.push(<Icon key={i} name="star" size={15} color={color} />);
    }
    return <View style={[styles.star, { width: 75 * (rating / 10) }]}>{items}</View>;
  };

  return <View style={{ flexDirection: "row", ...style }}>{rating !== 0 && <Rating />}</View>;
};



