import { StyleSheet } from "react-native";
import { commonStyles } from "../../constants/commonStyles";

export const Styles = StyleSheet.create({
    scrollview: {
      backgroundColor: commonStyles.colors.white,
      flexGrow: 1,
    },
  
    movieDetailWrapper: {
      flex: 1,
      backgroundColor: commonStyles.colors.black,
    },
  
    movieDetail: {
      flex: 1,
      padding: 16,
      paddingTop: 24,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      backgroundColor: commonStyles.colors.white,
    },
    topIcon:{position:'absolute',top:10,left:0,zIndex:10000}
  });