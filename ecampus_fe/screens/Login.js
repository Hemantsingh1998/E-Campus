import React from "react";
import { View,Text, TouchableOpacity} from "react-native";

const Login = ({navigation})=> {
  return (
    <View><View><TouchableOpacity onPress={() => {navigation.navigate('splashScreen')}}><Text>Back</Text></TouchableOpacity></View><Text>Hemant is god</Text></View>
  )
}
export default Login