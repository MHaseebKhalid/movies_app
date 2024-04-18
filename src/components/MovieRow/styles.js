import { StyleSheet } from "react-native";
import { commonStyles } from "../../constants/commonStyles";
import {heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'


export const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight:'bold',
    margin: 16,
    marginBottom: 0,
    fontFamily: "Montserrat-SemiBold",
  },

  textMore: {
    fontSize: 12,
    margin: 16,
    marginBottom: 0,
    fontFamily: "Montserrat-SemiBold",
    alignSelf: "flex-end",
    color: commonStyles.colors.orange,
  },
})