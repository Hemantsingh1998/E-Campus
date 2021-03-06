import React, { useContext, useState, useEffect} from 'react'
import { View, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from "react-native"
import { Text,Avatar } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext'
import { TextInput } from 'react-native-paper'

const Register = ({navigation}) => {

    const {state, register} = useContext(AuthContext)
    const [email, setemail] = useState('')
    const [firstName, setFirstName] = useState('Student')
    const [middleName, setMiddleName] = useState('Test')
    const [lastName, setLastName] = useState('')
    const [password, setpassword] = useState('12345678')    
    const [mobileNumber, setmobileNumber] = useState('5424987526')
    // const [name, setname] = useState('')
    // const [error, setError] = useState('')

    const emailRegex = /\S+@\S+\.\S+/;

    useEffect(() => {
    // setemail('demo@gmail.com')
    // return Alert.alert(
        //     "From Developer TODO 2.0",
        //     "Thank you for trusting this application. This application is in it's beta version, user data will be only used for testing, in this process the data may get deleted. Share your feedback in contact developer as it will help me to improve the stability of the application and build nice user friendly UI. Further updates will be provided through notification"
        // )

    },[])

    const handleRegister = ({firstName, middleName, lastName, mobileNumber, email, password}) => {
        if ( mobileNumber.length != 10 || email == '' || password == "" || password.length <= 7){
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
                register({firstName, middleName, lastName, mobileNumber, email, password})
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
        <View style={{flex:1}}>
            <ScrollView style={{flex:2, backgroundColor:"white",
            elevation: 24}}>
            <KeyboardAvoidingView  style={{ padding: 5, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <View style={{width:"100%"}}>
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{margin:5}}
                        mode="outlined"
                        label="First Name"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{margin:5}}
                        mode="outlined"
                        label="Middle Name"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={middleName}
                        onChangeText={setMiddleName}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{margin:5}}
                        mode="outlined"
                        label="Last Name"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{margin:5}}
                        mode="outlined"
                        label="Mobile Number"
                        returnKeyType="next"
                        autoCapitalize='none'
                        keyboardType='number-pad'
                        autoCorrect={false}
                        value={mobileNumber}
                        onChangeText={setmobileNumber}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    errorText={'Email Required'}
                    editable={true}
                        style={{margin:5}}
                        mode="outlined"
                        label="Email"
                        value={email}
                        onChangeText={setemail}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{margin:5}}
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
                    }} onPress={() => handleRegister({firstName, middleName, lastName, mobileNumber, email, password})} >
                        <Text style={{padding: 10, color:"white"}}>Register</Text>
                    </TouchableOpacity>
                </View>            
            </KeyboardAvoidingView >
            </ScrollView>
        </View>
    )
}

Register.navigationOptions = {
    title: 'Register'
}

export default Register