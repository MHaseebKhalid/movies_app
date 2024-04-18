import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen,MovieListScreen } from '../screens';
import HomeDrawer from './Drawer';
import { commonStyles } from '../constants/commonStyles';


const StackApp = createNativeStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,
  headerTitle: false,
  headerTransparent: true,
  headerBackTitleVisible: false,
});

const App = () => {

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:commonStyles.colors.white }}>
      <NavigationContainer>
        <StackApp.Navigator
          detachInactiveScreens={false}
          initialRouteName="Home"
        >
          {/* Splah */}
          {/* <StackApp.Screen
            name="Splash"
            component={Splash}
            options={navOptionHandler}
          /> */}
          {/* onBoarding */}
          <StackApp.Screen name="Home" component={HomeDrawer} options={{ headerShown: false }} />
          <StackApp.Screen
            name="MovieListScreen"
            component={MovieListScreen}
            options={navOptionHandler}
          />


        </StackApp.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default App;
