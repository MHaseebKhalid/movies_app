
import {  StyleSheet } from "react-native";
import { commonStyles } from "../../constants/commonStyles";


export const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    flex: 8,
    textAlign: "center",
    alignSelf: "center",
  },

  titleBar: {
    width: 40,
    height: 5,
    backgroundColor:commonStyles.colors.orange,
    marginTop: 4,
    alignSelf: "center",
  },

  subTitle: {
    margin: 16,
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center",
    width: "70%",
  },
});
