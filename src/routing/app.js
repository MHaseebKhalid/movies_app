import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen } from '../screens';


const StackApp = createNativeStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,
  animationEnabled: false,
});

const App = () => {

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <StackApp.Navigator
          detachInactiveScreens={false}
          initialRouteName="HomeScreen"
        >
          {/* Splah */}
          {/* <StackApp.Screen
            name="Splash"
            component={Splash}
            options={navOptionHandler}
          /> */}
          {/* onBoarding */}
          <StackApp.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={navOptionHandler}
          />


        </StackApp.Navigator>
      </NavigationContainer>
    </View>
  );
};
export default App;
