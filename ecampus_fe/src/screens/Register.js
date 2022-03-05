import React, { useContext, useState, useEffect} from 'react'
import { View, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from "react-native"
import { Text,Avatar } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext'
import { TextInput } from 'react-native-paper'

const Register = ({navigation}) => {

    const {state, register} = useContext(AuthContext)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')    
    const [mobileNumber, setmobileNumber] = useState('')
    const [name, setname] = useState('')
    // const [error, setError] = useState('')

    const emailRegex = /\S+@\S+\.\S+/;

    useEffect(() => {
    // setemail('demo@gmail.com')
    // return Alert.alert(
        //     "From Developer TODO 2.0",
        //     "Thank you for trusting this application. This application is in it's beta version, user data will be only used for testing, in this process the data may get deleted. Share your feedback in contact developer as it will help me to improve the stability of the application and build nice user friendly UI. Further updates will be provided through notification"
        // )

    },[])

    const handleRegister = ({name, mobileNumber, email, password}) => {
        if (name == '' || mobileNumber.length != 10 || email == '' || password == "" || password.length <= 7){
            return Alert.alert(
                "Form Empty",
                "Fill Your Credentials & Password Must Be 8 character",
                [
                    {
                      text: "OK",
                    }
                ]
            )
        } else{
            if (emailRegex.test(email)){
                // console.log("SSRVZDRS")
                register({name, mobileNumber, email, password})
            }else {
                return Alert.alert(
                    "Invalid Email",
                    "Please enter a valid email",
                    [
                        {
                        text: "OK",
                        onPress:() => {
                            // setemail('')
                        }
                        }
                    ]
                )
            }
        }
    }

    return (
        <View style={{flex:1, backgroundColor:"#0275d8"}}>
            <ScrollView style={{flex:2, backgroundColor:"white",
            elevation: 24,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20}}>
            <KeyboardAvoidingView  style={{ padding: 5, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <View style={{width:"100%"}}>
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{padding:10}}
                        mode="outlined"
                        label="Name"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={name}
                        onChangeText={setname}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{padding:10}}
                        mode="outlined"
                        label="Mobile Number"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={mobileNumber}
                        onChangeText={setmobileNumber}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    errorText={'Email Required'}
                    editable={true}
                        style={{padding:10}}
                        mode="outlined"
                        label="Email"
                        value={email}
                        onChangeText={setemail}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{padding:10, borderColor:'#0275d8'}}
                        mode="outlined"
                        label='Password' 
                        secureTextEntry={true}
                        autoCapitalize='none'
                        returnKeyType="send"
                        autoCorrect={false}
                        value={password}
                        onChangeText={setpassword}
                    />
                    </View>
                <View>
                    <TouchableOpacity style={{
                    borderColor: "#0275d8",
                    borderWidth: 2,
                    borderRadius: 10,
                    backgroundColor: "#0275d8",
                    elevation: 12
                    }} onPress={() => handleRegister({name, mobileNumber, email, password})} >
                        <Text style={{padding: 10, color:"white"}}>Register</Text>
                    </TouchableOpacity>
                </View>            
            </KeyboardAvoidingView >
            </ScrollView>
        </View>
    )
}

// Register.navigationOptions = {
//     headerShown: false
// }

export default Register