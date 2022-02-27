import React from "react";
import { View,Text} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from './navigationnRef'
import splashScreen from './screens/Splash'
import loginScreen from './screens/Login'

const switchNavigator = createSwitchNavigator({
  splashScreen : splashScreen,
  loginScreen : loginScreen,
})

const App = createAppContainer(switchNavigator)

export default () => {
  return(
    <App ref={(navigator) => {setNavigator(navigator)}}/>
  )
}