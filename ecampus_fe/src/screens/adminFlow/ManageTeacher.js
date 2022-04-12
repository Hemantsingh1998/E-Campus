import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { RefreshControl, View, TouchableOpacity, ScrollView, Button, Alert, FlatList } from "react-native";
import { Text } from "react-native-elements";
import { TextInput } from "react-native-paper";
import SlidingUpPanel from 'rn-sliding-up-panel'
import actions from '../../api/actions'
import MultiSelect from 'react-native-multiple-select';
import SelectMultiple from 'react-native-select-multiple'
import { addTeacher } from "../../context/AuthContext";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const ManageTeacher = ({navigation}) => {

    const [teachers, setTeachers] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [course, setCourse] = useState([])
    const [addedTeacher, setAddedTeacher] = useState([])
    const [salutation, setSalutaion] = useState('')
    const [stream, setStream] = useState(0)

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getCourse()
      getTeacher()
      getAddedTeacher()
      wait(1000).then(() => setRefreshing(false));
  }, []);

  const getTeacher = () => {
    actions.get(`/api/get-teacher`).then(res => {
      // console.log(res.data)
      setTeachers(res.data)
    }).catch( err =>
      console.log(err)
    )
  }

  const getAddedTeacher = () => {
    actions.get(`/api/added-teacher`).then(res => {
      // console.log(res.data[1].teacherId)
      setAddedTeacher(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getCourse()
    getTeacher()
    getAddedTeacher()
  },[])

  const getCourse = () => {
    actions.get(`/api/get-course`).then(res => {
        // console.log(res.data)
        setCourse(res.data.reverse())
    }).catch(err => {
        console.log(err)
    })
  }

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    console.log(selectedItems)
};

const handleSubmit = ({selectedCourse, selectedItems, salutation, stream}) => {
  console.log(selectedCourse, selectedItems, stream)
  if (selectedCourse.length === 0 || selectedItems.length === 0 || stream === '' ) {
    return Alert.alert(
      "Form Error",
      "All fields required",
      [
          {
          text: "OK",
          onPress:() => {
              // setemail('')
          }
          }
      ]
    )
  } else {
    actions.post('/api/add-teacher', {teacherId: selectedItems,
      course: selectedCourse,
      salutation, stream}).then(res => {
      console.log("ADDED TEACHER RESPONSE", res.data)
      // setCourse([])
      setSelectedItems([])
      setSelectedCourse([])
      setSalutaion('')
      setStream('')
      _panel.hide()
    }).catch(err => {
      console.log("ADD TEACHER ERR", err)
    })
  }
}

const onSelectedCourseChange = (selectedCourse) => {
  setSelectedCourse(selectedCourse);
  console.log(selectedCourse)
};
    const styles = {
      container: {
        flex: 1,
        zIndex: 1,
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: 'flex-end'
      },
      dragHandler: {
        alignSelf: 'stretch',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
      }
  }

  
    return(
        // <View>
        <View style={styles.container}>
        <FlatList       
                refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />}
            style={{width: '100%', height:"100%"}}
                data={addedTeacher}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => <TouchableOpacity style={{ padding: 5}}
                onPress={() => {navigation.navigate('TodoDetails', { _id: item._id })}}
                ><Text h4 style={{backgroundColor: 'white', elevation:12, borderRadius:20, padding: 10}}>{item.salutation} {item.teacherId.firstName} {item.teacherId.lastName}</Text></TouchableOpacity>}
            />
            <View style={{padding: 50}}>
                <Button onPress={() => _panel.show()} title="Create Course" />
            </View>
        <SlidingUpPanel draggableRange={{ top: 500, bottom: 0 }}ref={c => (_panel = c)}>
          {dragHandler => (
            <View style={{margin:15,  backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
              <View style={styles.dragHandler} {...dragHandler}>
                <Text>Manage teacher</Text>
              </View>
                  {/* <ScrollView> */}
              <View>
                  <View style={{width: "90%", justifyContent: 'center', alignSelf:'center'}} >
                  <MultiSelect
                        single
                        flatListProps={{height: 100, keyboardShouldPersistTaps:'handled'}}
                        items={teachers}
                        uniqueKey={teachers._id}
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="Select teacher"
                        searchInputPlaceholderText="Search Teacher..."
                        onChangeInput={ (text)=> console.log(text)}
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#CCC"
                        textInputProps={{ autoFocus: false }}
                        tagBorderColor="green"
                        tagTextColor="green"
                        selectedItemTextColor="green"
                        selectedItemIconColor="green"
                        itemTextColor="#000"
                        displayKey={`${'lastName'}`}
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="skyblue"
                        submitButtonText="Submit"
                    />
                  <MultiSelect
                        flatListProps={{height: 100, keyboardShouldPersistTaps:'handled'}}
                        items={course}
                        uniqueKey={course._id}
                        onSelectedItemsChange={onSelectedCourseChange}
                        selectedItems={selectedCourse}
                        selectText="Select course to assign teacher"
                        searchInputPlaceholderText="Search teamMember..."
                        onChangeInput={ (text)=> console.log(text)}
                        altFontFamily="ProximaNova-Light"
                        tagRemoveIconColor="#CCC"
                        textInputProps={{ autoFocus: false }}
                        tagBorderColor="green"
                        tagTextColor="green"
                        selectedItemTextColor="green"
                        selectedItemIconColor="green"
                        itemTextColor="#000"
                        displayKey={`${'courseName'}`}
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="skyblue"
                        submitButtonText="Submit"
                    /> 
                  <View style={{width:"100%"}}>
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    errorText={'Salutation required'}
                    editable={true}
                        style={{}}
                        mode="outlined"
                        autoFocus={false}
                        label="Designation"
                        value={salutation}
                        onChangeText={setSalutaion}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    errorText={'Stream required'}
                    editable={true}
                        style={{}}
                        mode="outlined"
                        autoFocus={false}
                        label="Stream"
                        value={stream}
                        onChangeText={setStream}
                    />
                    </View>
                    <View style={{padding: 30}}>
                    <TouchableOpacity style={{
                    borderColor: "#0275d8",
                    borderWidth: 2,
                    borderRadius: 10,
                    backgroundColor: "#0275d8",
                    elevation: 12
                    }} onPress={() => handleSubmit({selectedCourse, selectedItems, salutation, stream})}>
                        <Text style={{padding: 10, color:"white", alignSelf: "center"}}>Submit</Text>
                    </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                    {/* </ScrollView> */}
            </View>
          )}
        </SlidingUpPanel>
      </View>
    )
}

export default ManageTeacher