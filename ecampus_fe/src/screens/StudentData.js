import React, {useState, useEffect, useContext} from "react";
import { View, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from "react-native"
import { Text } from 'react-native-elements'
import actions from '../api/actions'
import { Provider, TextInput } from 'react-native-paper'
import AsyncStorage from "@react-native-async-storage/async-storage";
import MultiSelect from 'react-native-multiple-select';
import DropDown from "react-native-paper-dropdown";
const StudentData = ({navigation}) => {
    const yearList = [
        {
          label: "Third Year",
          value: "Third Year",
        },
        {
          label: "Second Year",
          value: "Second Year",
        },
        {
          label: "First Year",
          value: "First Year",
        },
    ];
    const [dateofbirth, setDateOfBirth] = useState('02-jeb-2098')
    // const [year, setYear] = useState('1')
    const [course, setCourse] = useState('')
    const [admissionNumber, setAdmissionNumber] = useState('DEMO001')
    const [fatherName, setFatherName] = useState('John')
    const [motherName, setMotherName] = useState('Jane')  
    const [showDropDown, setShowDropDown] = useState(false);
    const [year, setYear] = useState ("")
    const [stream, setStreams] = useState([])
    const [user, setUser] = useState({})
    const [selectedItems, setSelectedItems] = useState();

    // const user = navigation.getParam('user')

    const getAsyUser = async () => {
        const asyUser = await AsyncStorage.getItem('user')
        setUser(JSON.parse(asyUser))
        // console.log(user)
    }

    useEffect(() => {
        getAsyUser()
        getStream()
    },[])

    const getStream = () => {
        actions.get(`/api/get-streams`).then(res => {
            console.log(res.data)
            setStreams(res.data.reverse())
        }).catch(err => {
            console.log(err)
        })
    }

    
    const handleSubmit = ({
        dateofbirth,
        year,
        stream,
        addmissionNumber,
        fatherName,
        motherName,
        studentId= user.id}) => {
        console.log(
            dateofbirth,
            year,
            stream,
            addmissionNumber,
            fatherName,
            motherName,
            studentId
        )

        if (
            dateofbirth === '' ||
            year === '' ||
            stream === '' ||
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
                    stream,
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

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems);
        console.log(selectedItems)
    };


    return (
        <View>
            <ScrollView>
            <KeyboardAvoidingView  style={{ padding: 5, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <View style={{width:"100%"}}>
                <Provider>
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    errorText={'Date Required'}
                    editable={true}
                        style={{margin: 5}}
                        mode="outlined"
                        label="Birth Date"
                        value={dateofbirth}
                        onChangeText={setDateOfBirth}
                    />
                    {/* <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    errorText={'Year Required'}
                    editable={true}
                        style={{margin: 5}}
                        mode="outlined"
                        keyboardType="number-pad"
                        label="year"
                        value={year}
                        onChangeText={setYear}
                    /> */}

                    <View style={{justifyContent: "center",alignSelf: 'center', width: '90%'}}>
                        <MultiSelect
                            single
                            flatListProps={{height: 100, keyboardShouldPersistTaps:'handled'}}
                            items={stream}
                            uniqueKey={stream._id}
                            onSelectedItemsChange={onSelectedItemsChange}
                            selectedItems={selectedItems}
                            selectText="Select Stream"
                            searchInputPlaceholderText="Search Stream..."
                            onChangeInput={ (text)=> console.log(text)}
                            altFontFamily="ProximaNova-Light"
                            tagRemoveIconColor="#CCC"
                            textInputProps={{ autoFocus: false }}
                            tagBorderColor="green"
                            tagTextColor="green"
                            selectedItemTextColor="green"
                            selectedItemIconColor="green"
                            itemTextColor="#000"
                            displayKey={`${'streamName'}`}
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="skyblue"
                            submitButtonText="Submit"
                        />
                    </View>
                        <View style={{
                        flex:  1,
                        marginHorizontal:  5,
                        justifyContent:  'center',
                        }}>
                    <DropDown
                        label={"Year"}
                        mode={"outlined"}
                        visible={showDropDown}
                        showDropDown={() => setShowDropDown(true)}
                        onDismiss={() => setShowDropDown(false)}
                        value={year}
                        setValue={setYear}
                        list={yearList}
                        />
                        </View>
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent',}}}
                    style={{ borderColor:'#0275d8', margin: 5}}
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
                    style={{ borderColor:'#0275d8', margin: 5}}
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
                    style={{ borderColor:'#0275d8', margin: 5}}
                        mode="outlined"
                        label={`Mother's Name`}
                        autoCapitalize='none'
                        returnKeyType="send"
                        autoCorrect={false}
                        value={motherName}
                        onChangeText={setMotherName}
                    />
                    </Provider>
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
                        year : year,
                        stream: selectedItems[0],
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