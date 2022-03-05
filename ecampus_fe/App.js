import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from './navigationnRef'
import { Provider as AuthContext} from './src/context/AuthContext'
import splashScreen from './src/screens/Splash'  
import loginScreen from './src/screens/Login'
import registerScreen from './src/screens/Register'
import home from './src/screens/Home'
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const switchNavigator = createSwitchNavigator({
  splashScreen : splashScreen,
  homeFlow: createStackNavigator({
    home: home
  }),
  authFlow: createStackNavigator({
    loginScreen : loginScreen,
    registerScreen : registerScreen,
  })
})

const App = createAppContainer(switchNavigator)

export default () => {
  return(
    <AuthContext>
      <App ref={(navigator) => {setNavigator(navigator)}}/>
    </AuthContext>
  )
}