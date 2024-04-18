import { StyleSheet } from "react-native";
import { commonStyles } from "../../constants/commonStyles";
import {heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'


export const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:commonStyles.colors.white,
  }
})