import React, {useContext} from "react";
import { View,Text, TouchableOpacity, ImageBackground, Image} from "react-native";
import { Context as AuthContext } from '../context/AuthContext'
import FastImage from 'react-native-fast-image'
const Splash = ({navigation})=> {

  const { tryLocalLogin } = useContext(AuthContext)
  setTimeout(() => {
      tryLocalLogin()
  }, 3000);

  return (
    // <View><View><TouchableOpacity onPress={() => {navigation.navigate('loginScreen')}}><Text>Next</Text></TouchableOpacity></View><Text>
    // Waant to know who is Hemant? Click here</Text></View>
    <View style={{flex: 1, flexDirection:'row', justifyContent:"center", alignItems: 'center'}}>
                <FastImage
        style={{ width: "100%", height: '100%' }}
        source={require('../../Assets/E-Campus.gif')}
        resizeMode={FastImage.resizeMode.cover}
    />
            {/* <View style = {{flex:1,justifyContent: 'center', alignItems:"center", backgroundColor: "transparent"}}>

            <Text>E-CAMPUS</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('registerScreen')}}><Text>Register</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('loginScreen')}}><Text>Login</Text></TouchableOpacity>
            </View> */}
    </View>        
  )
}
export default Splash