import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native";

import { commonStyles } from "../../constants/commonStyles";
import {HomeScreen,SearchScreen} from '../../screens'
import { TouchableOpacity } from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Movies"
      drawerType={"slide"}
      drawerStyle={{ width: "50%", backgroundColor: commonStyles.colors.black }}
      drawerContentOptions={{
        activeBackgroundColor: "transparent",
        activeTintColor: commonStyles.colors.orange,
        inactiveTintColor: commonStyles.colors.white,
      }}
      screenOptions={{headerShown: false}}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          drawerLabel: ({ color, focused }) => CustomDrawerStyle(color, focused, "Home"),
        }}
      />
      <Drawer.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          drawerLabel: ({ color, focused }) => CustomDrawerStyle(color, focused, "Search"),
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerStyle = (color, focused, title) => {
  return (
    <TouchableOpacity>
    <Text
      style={{
        fontSize: focused ? 20 : 16,
        fontWeight: null,
        color: color,
      }}
    >
      {title}
    </Text>
    </TouchableOpacity>
  );
};

export default HomeDrawer;
