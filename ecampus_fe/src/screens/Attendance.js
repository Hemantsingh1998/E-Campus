import React, {useState, useEffect} from "react";
import { View, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView  } from "react-native";
import { Text } from "react-native-elements";
import MultiSelect from 'react-native-multiple-select';
import { Provider } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { RadioButton } from 'react-native-paper';
import actions from '../api/actions'
import { FlatList } from "react-native-gesture-handler";

const Attendance = ({navigation}) => {

    const user = navigation.getParam('user')
    // console.log(user)
    const [selectedItems, setSelectedItems] = useState([]);
    const [checked, setChecked] = useState();
    const [isVisible, setIsVisible] = useState(false)
    const [stream, setStreams] = useState([])
    const [students, setStudents] = useState([])
    const [showDropDown, setShowDropDown] = useState(false);
    const [year, setYear] = useState ("")

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

    useEffect(() => {
        getStream()
    }, [])

    // const getStudents = () => {
    //     console.log()
    // }
    const onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems);
        // console.log(selectedItems)
    };

    const getStream = () => {
        actions.get(`/api/get-streams`).then(res => {
            console.log(res.data)
            setStreams(res.data.reverse())
        }).catch(err => {
            console.log(err)
        })
    }

    const setSearch = (checked, selectedItems) => {
        if (checked === '' && selectedItems === undefined) {
            console.log('Data needed')
        } else {
            console.log(checked, selectedItems[0])
            setIsVisible(true)
            let params = {
               stream: selectedItems[0],
               year: checked
            }
            actions.get(`/api/getstudentforattendance/`, {params}).then(res => {
                setStudents(res.data)
            })
        }
    }

    return(
        <View >
            {user.role === 1 ? 
      <View >
      {isVisible ? <View>
            <TouchableOpacity onPress={() => {setIsVisible(false)
            setChecked('')
            setSelectedItems([])}}>
                <Text h3>Back</Text>
            </TouchableOpacity>
                <View>
                <FlatList
            style={{width: '100%', height:"100%"}}
                data={students}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => <View style={{ padding: 5}}
                // onPress={() => {navigation.navigate('TodoDetails', { _id: item._id })}}
                ><View style={{backgroundColor: 'white', elevation:12, borderRadius:20, padding: 10}}><Text h4>{item.studentId.firstName}</Text></View></View>}
            />
                </View>
      </View> : <View>
      <KeyboardAvoidingView  style={{ padding: 5, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          <View style={{width:"100%"}}>
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

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{width: '90%', flexDirection: 'row', 
                  justifyContent: 'space-between', alignItems: 'center'}}>
                      <TouchableOpacity onPress={() => setChecked('First Year')}>
                        <Text>
                            First Year
                        </Text>
                      </TouchableOpacity>
                    <RadioButton
                        value="First Year"
                        status={ checked === 'First Year' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('First Year')}
                    />
                  </View>
                  <View style={{width: '90%', flexDirection: 'row', 
                  justifyContent: 'space-between', alignItems: 'center'}}>
                      <TouchableOpacity onPress={() => setChecked('Second Year')}>
                        <Text>
                            Second Year
                        </Text>
                      </TouchableOpacity>
                    <RadioButton
                        value="Second Year"
                        status={ checked === 'Second Year' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Second Year')}
                    />
                  </View>
                  <View style={{width: '90%', flexDirection: 'row', 
                  justifyContent: 'space-between', alignItems: 'center'}}>
                      <TouchableOpacity onPress={() => setChecked('Third Year')}>
                        <Text>
                            Third Year
                        </Text>
                      </TouchableOpacity>
                    <RadioButton
                        value="Third Year"
                        status={ checked === 'Third Year' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('Third Year')}
                    />
                  </View>
            </View>
              </View>
      </KeyboardAvoidingView >
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      {checked && selectedItems.length !== 0 ?
          <TouchableOpacity style={{backgroundColor:'#0275d8', padding: 10, borderRadius: 20}} onPress={() => setSearch(checked, selectedItems)}>
             
            <Text h3 style={{color:'white'}}>Get Students</Text> 
          </TouchableOpacity>: null}
      </View>
          </View>}
  </View>: <View>
                    <Text h1>Students Dashboard</Text>
                </View>}
        </View>
    )
}

Attendance.navigationOptions = {
    title: "Attendance"
}

export default Attendance