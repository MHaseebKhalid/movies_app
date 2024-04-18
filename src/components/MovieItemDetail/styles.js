import { StyleSheet } from "react-native";
import { commonStyles } from "../../constants/commonStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    imageContainer: {
      margin: hp(0.5),
      backgroundColor: commonStyles.colors.gray,
      borderRadius: 12,
      overflow: "hidden",
    },
    imgStyle:{
      height:hp(20),
      width:wp(30),
      borderRadius: hp(1),
    }
  });