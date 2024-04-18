
import {  StyleSheet } from "react-native";
import { commonStyles } from "../../constants/commonStyles";
import { widthPercentageToDP } from "react-native-responsive-screen";


export const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    flex: 8,
    textAlign: "center",
    alignSelf: "center",
  },

  titleBar: {
    width: widthPercentageToDP(30),
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
