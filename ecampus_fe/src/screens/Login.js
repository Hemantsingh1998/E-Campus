import React, {useEffect, useContext, useState} from 'react'
import { View, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from "react-native"
import { Text } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext'
import { TextInput } from 'react-native-paper'
import actions from '../api/actions'
const Login = ({navigation}) => {

    const {state, login} = useContext(AuthContext)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')    
    const [mobileNumber, setmobileNumber] = useState('')
    const [name, setname] = useState('')
    const [registerStatus, setRegisterStatus] = useState(false)
    // const [error, setError] = useState('')

    const emailRegex = /\S+@\S+\.\S+/;

    useEffect(() => {
        actions.get(`/api/get-register-status`).then(res => {
            // console.log(res.data)
            setRegisterStatus(res.data.status)
        })
    }, [])

    const handleLogin = ({ email, password}) => {
        if ( email == '' || password == "" || password.length <= 7){
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
                login({ email, password})
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
        <View>
            <ScrollView>
            <KeyboardAvoidingView  style={{ padding: 5, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <View style={{width:"100%"}}>
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    errorText={'Email Required'}
                    editable={true}
                        style={{}}
                        mode="outlined"
                        label="Email"
                        value={email}
                        onChangeText={setemail}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{ borderColor:'#0275d8'}}
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
                    }} onPress={() => handleLogin({name, mobileNumber, email, password})} >
                        <Text style={{padding: 10, color:"white"}}>Login</Text>
                    </TouchableOpacity>
                </View>          
                {registerStatus ? <TouchableOpacity onPress={() => {navigation.navigate('registerScreen')}}><Text>Register</Text></TouchableOpacity> : null}  
            
            </KeyboardAvoidingView >
            </ScrollView>
        </View>
    )
}

Login.navigationOptions = {
    headerShown: false
}

export default Login