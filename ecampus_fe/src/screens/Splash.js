import React, {useContext} from "react";
import { View,Text, TouchableOpacity, ImageBackground} from "react-native";
import { Context as AuthContext } from '../context/AuthContext'
const Splash = ({navigation})=> {

  const { tryLocalLogin } = useContext(AuthContext)
  setTimeout(() => {
      tryLocalLogin()
  }, 2000);

  return (
    // <View><View><TouchableOpacity onPress={() => {navigation.navigate('loginScreen')}}><Text>Next</Text></TouchableOpacity></View><Text>
    // Waant to know who is Hemant? Click here</Text></View>
    <View style={{flex: 1}}>
        {/* <ImageBackground source ={require('./../Assets/logo.png')} resizeMode="contain" style={{
            flex:1,
            JustifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
            marginLeft:15
            }}> 
            </ImageBackground> */}
            <View style = {{flex:1,justifyContent: 'center', alignItems:"center"}}>
            <Text>E-CAMPUS</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('registerScreen')}}><Text>Register</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('loginScreen')}}><Text>Login</Text></TouchableOpacity>
            </View>
    </View>        
  )
}
export default Splash