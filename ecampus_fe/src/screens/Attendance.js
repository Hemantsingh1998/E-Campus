import React, {useState, useEffect} from "react";
import { View, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import { Text } from "react-native-elements";
import MultiSelect from 'react-native-multiple-select';
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
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [teacher, setTeacher] = useState({})
    const [students, setStudents] = useState([])
    const [present, setPresent] = useState([])
    const [absent, setAbsent] = useState([])

    useEffect(() => {
        getStream()
        getSingleTeacher()
    }, [])

    // const getStudents = () => {
    //     console.log()
    // }
    const onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems);
        // console.log(selectedItems)
    };

    const onSelectSubjectChange = (selectedSubject) => {
        setSelectedSubject(selectedSubject);
        // console.log(selectedItems)
    };

    const getStream = () => {
        actions.get(`/api/get-streams`).then(res => {
            // console.log(res.data)
            setStreams(res.data.reverse())
        }).catch(err => {
            console.log(err)
        })
    }

    const getSingleTeacher = () => {
        let params = {
            id: user.id
         }
        actions.get(`/api/getsingleteacher`, {params}).then(res => {
            console.log(res.data)
            setTeacher(res.data)
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

    const onSubmitAttendance = () => {
        if (present.length + absent.length !== students.length) {
            return Alert.alert(
                "Students remaining",
                `Please make sure you mark the attendance of all students`,
                [
                    {
                    text: "OK"
                    }
                ]
            )
        }
        if (selectedSubject.length === 0) {
            return Alert.alert(
                "Select subject",
                `Select atleast one subject`,
                [
                    {
                    text: "OK"
                    }
                ]
            )
        }
        console.log("clicked")
        actions.post('/api/postattendance', {stream: selectedItems[0], year: checked, 
            studentPresent: present, subject: selectedSubject[0], studentAbsent: absent, postedBy: user.id}).then(res => {
                // console.log(res.data)
                navigation.navigate('TeacherHome')
            }).catch(err => {
                console.log(err)
            })
    }

    const onClickPresent = ({id}) => {
        if (!present.includes(id)) {
            setPresent([id, ...present])
            for( let i = 0; i < absent.length; i++) { 
                if ( absent[i] === id) {
                    absent.splice(i, 1);
                }
            }
        }
    }

    const onClickAbsent = ({id}) => {
        if (!absent.includes(id)) {
            setAbsent([id, ...absent])
            for( let i = 0; i < present.length; i++) { 
                if ( present[i] === id) {
                    present.splice(i, 1);
                }
            }
        }
    }

    return(
        <View >
            {user.role === 1 ? 
      <View >
      {isVisible ? <View>
          <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: "center"}}>
              <View>
            <TouchableOpacity onPress={() => {setIsVisible(false)
            setChecked('')
            setAbsent([])
            setPresent([])
            setSelectedSubject([])
            setSelectedItems([])}}>
                <Text h4>Back to select student</Text>
            </TouchableOpacity>
            </View>
            <View style={{backgroundColor: 'blue', padding: 5, borderRadius: 10, elevation: 6}}>
            <TouchableOpacity><Text onPress={() => onSubmitAttendance()} h4 style={{color: 'white'}}>Submit</Text></TouchableOpacity>
            </View>
            </View>
            <View  style={{width: "90%", justifyContent: 'center', alignSelf:'center'}}>
            <MultiSelect
                single
                flatListProps={{height: 100, keyboardShouldPersistTaps:'handled'}}
                items={teacher.subjects}
                uniqueKey={teacher.subjects._id}
                onSelectedItemsChange={onSelectSubjectChange}
                selectedItems={selectedSubject}
                selectText="Select Subject"
                searchInputPlaceholderText="Search Subject..."
                onChangeInput={ (text)=> console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                textInputProps={{ autoFocus: false }}
                tagBorderColor="green"
                tagTextColor="green"
                selectedItemTextColor="green"
                selectedItemIconColor="green"
                itemTextColor="#000"
                displayKey={`${'subjectName'}`}
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="skyblue"
                submitButtonText="Submit"
                    />
            </View>
                <View>
                <FlatList
            style={{width: '100%', height:"85%"}}
                data={students}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => <View style={{ padding: 5}}
                // onPress={() => {navigation.navigate('TodoDetails', { _id: item._id })}}
                ><View style={{backgroundColor: 'white', elevation:12, borderRadius:20, padding: 10}}><View>
                    <Text h3>{item.studentId.firstName} {item.studentId.lastName}</Text></View>
                    <View>
                    {item.attendanceStatus === 'null' && item.attendanceStatus !== 'present' && item.attendanceStatus !== 'absent' ? 
                    <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: "center"}}>
                    <TouchableOpacity onPress={() => {onClickPresent({id: item.studentId._id})
                        item.attendanceStatus = 'present'}}>
                        <Text h4 style={{color: 'blue'}}>Present</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {onClickAbsent({id: item.studentId._id})
                        item.attendanceStatus = 'absent'}}>
                        <Text h4 style={{color: 'red'}}>Absent</Text>
                    </TouchableOpacity>
                    </View> : null}
                    {item.attendanceStatus !== 'null' && item.attendanceStatus === 'present' && item.attendanceStatus !== 'absent' ? 
                    <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: "center"}}>
                    <TouchableOpacity onPress={() => {onClickAbsent({id: item.studentId._id})
                    item.attendanceStatus = 'absent'}}>
                        <Text h4 style={{color: 'red'}}>Absent</Text>
                    </TouchableOpacity></View>: null}
                    {item.attendanceStatus !== 'null' && item.attendanceStatus !== 'present' && item.attendanceStatus === 'absent' ? 
                    <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: "center"}}>
                    <TouchableOpacity onPress={() => {onClickPresent({id: item.studentId._id})
                    item.attendanceStatus = 'present'}}>
                        <Text h4 style={{color: 'blue'}}>Present</Text>
                    </TouchableOpacity></View> : null}
                    </View></View>
                </View>}
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
             
            <Text h4 style={{color:'white'}}>Get Students</Text> 
          </TouchableOpacity>:  <TouchableOpacity style={{alignSelf: 'center', backgroundColor:'#0275d8', padding: 10, borderRadius: 20}} 
          onPress={() => navigation.navigate('ViewPastAttendance', {user})}>
             <Text h4 style={{color:'white'}}>View Past Attendance</Text> 
           </TouchableOpacity> }
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