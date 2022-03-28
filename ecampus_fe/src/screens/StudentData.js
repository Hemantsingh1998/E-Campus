import React, {useState, useEffect, useContext} from "react";
import { View, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from "react-native"
import { Text } from 'react-native-elements'
import actions from '../api/actions'
import { TextInput } from 'react-native-paper'
import AsyncStorage from "@react-native-async-storage/async-storage";

const StudentData = ({navigation}) => {

    const [dateofbirth, setDateOfBirth] = useState('35-ocb-1002')
    const [year, setYear] = useState('1')
    const [course, setCourse] = useState('BSc.IT')
    const [admissionNumber, setAdmissionNumber] = useState('DEMO001')
    const [fatherName, setFatherName] = useState('Joe')
    const [motherName, setMotherName] = useState('Dane')
    const [user, setUser] = useState({})
    // const user = navigation.getParam('user')

    const getAsyUser = async () => {
        const asyUser = await AsyncStorage.getItem('user')
        setUser(JSON.parse(asyUser))
        // console.log(user)
    }

    useEffect(() => {
        getAsyUser()
    },[])
    
    const handleSubmit = ({
        dateofbirth,
        year,
        course,
        addmissionNumber,
        fatherName,
        motherName,
        studentId= user.id}) => {
        console.log(
            dateofbirth,
            year,
            course,
            addmissionNumber,
            fatherName,
            motherName,
            studentId
        )

        if (
            dateofbirth === '' ||
            year === '' ||
            course === '' ||
            addmissionNumber === '' ||
            fatherName === '' ||
            motherName === '' ) {
                return Alert.alert(
                "Form Empty",
                "Fill all the Credentials",
                [
                    {
                      text: "OK",
                    }
                ]
            )
            } else {
                actions.post('/api/add-student', {
                    dateofbirth,
                    year,
                    course,
                    admissionNumber,
                    fatherName,
                    motherName, studentId}).then(res => {
                        console.log(res.data)
                        user.dataAvailable = true
                        AsyncStorage.setItem( 'user', JSON.stringify( user ) )
                        navigation.navigate('StudentHome')
                    }).catch(error => {
                        console.log("error",error)
                        return Alert.alert(
                            "Login Error",
                            `${error}`,
                            [
                                {
                                text: "OK"
                                }
                            ]
                        )
                    })
            }
    }

    return (
        <View>
            <ScrollView>
            <KeyboardAvoidingView  style={{ padding: 5, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <View style={{width:"100%"}}>
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    errorText={'Date Required'}
                    editable={true}
                        style={{}}
                        mode="outlined"
                        label="Birth Date"
                        value={dateofbirth}
                        onChangeText={setDateOfBirth}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    errorText={'Year Required'}
                    editable={true}
                        style={{}}
                        mode="outlined"
                        keyboardType="number-pad"
                        label="year"
                        value={year}
                        onChangeText={setYear}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{ borderColor:'#0275d8'}}
                        mode="outlined"
                        label='course'
                        autoCapitalize='none'
                        returnKeyType="send"
                        autoCorrect={false}
                        value={course}
                        onChangeText={setCourse}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{ borderColor:'#0275d8'}}
                        mode="outlined"
                        label='Addmission Number'
                        autoCapitalize='none'
                        returnKeyType="send"
                        autoCorrect={false}
                        value={admissionNumber}
                        onChangeText={setAdmissionNumber}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{ borderColor:'#0275d8'}}
                        mode="outlined"
                        label={`Father's Name`}
                        autoCapitalize='none'
                        returnKeyType="send"
                        autoCorrect={false}
                        value={fatherName}
                        onChangeText={setFatherName}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{ borderColor:'#0275d8'}}
                        mode="outlined"
                        label={`Mother's Name`}
                        autoCapitalize='none'
                        returnKeyType="send"
                        autoCorrect={false}
                        value={motherName}
                        onChangeText={setMotherName}
                    />
                    </View>
                <View>
                    <TouchableOpacity style={{
                    borderColor: "#0275d8",
                    borderWidth: 2,
                    borderRadius: 10,
                    backgroundColor: "#0275d8",
                    elevation: 12
                    }} onPress={() => handleSubmit({
                        dateofbirth,
                        year : parseInt(year),
                        course,
                        admissionNumber,
                        fatherName,
                        motherName })} >
                        <Text style={{padding: 10, color:"white"}}>Submit Data</Text>
                    </TouchableOpacity>
                </View>            
            </KeyboardAvoidingView >
            </ScrollView>
        </View>
    )
}

StudentData.navigationOptions = {
    headerShown: false
}

export default StudentData