import { StyleSheet } from "react-native";
import { commonStyles } from "../../constants/commonStyles";

export const styles = StyleSheet.create({
    star: {
      position: "absolute",
      flexDirection: "row",
      overflow: "hidden",
    },
  
    ratingText: {
      color:commonStyles.colors.white,
      marginLeft: 75,
    },
  });