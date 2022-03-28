import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { RefreshControl, View, TouchableOpacity, ScrollView, Button, Alert, FlatList } from "react-native";
import { Text } from "react-native-elements";
import { TextInput } from "react-native-paper";
import SlidingUpPanel from 'rn-sliding-up-panel'
import actions from '../../api/actions'
import {addCourseAd} from '../../context/AuthContext'
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const AddCourse = ({navigation}) => {

    const [courseName, setCourseName] = useState('')
    const [duration, setDuration] = useState(0)
    const [courses, setCourses] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    // const {state, addCourseAd} = useContext(AuthContext)
    
    const user = navigation.getParam('user')
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getCourse()
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getCourse()
    }, [])

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

    const handleSubmit = ({courseName, duration}) => {
        console.log(courseName, duration)
        if (courseName === '' || duration === 0) {
            return Alert.alert(
            "Form Empty",
            "Fill Your Credentials",
            [
                {
                    text: "OK",
                }
            ]
        )
        } else {
            addCourseAd({courseName, duration, postedBy: user.id})
            _panel.hide()
        }
    }
    
    const getCourse = () => {
        actions.get(`/api/get-course`).then(res => {
            console.log(res)
            setCourses(res.data.reverse())
        }).catch(err => {
            console.log(err)
        })
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
                data={courses}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => <TouchableOpacity style={{ padding: 5}}
                // onPress={() => {navigation.navigate('TodoDetails', { _id: item._id })}}
                ><Text h4 style={{backgroundColor: 'white', elevation:12, borderRadius:20, padding: 10}}>{item.courseName}</Text></TouchableOpacity>}
            />
            <View style={{padding: 50}}>
                <Button onPress={() => _panel.show()} title="Create Course" />
            </View>
        <SlidingUpPanel draggableRange={{ top: 300, bottom: 0 }}ref={c => (_panel = c)}>
          {dragHandler => (
            <View style={{backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
              <View style={styles.dragHandler} {...dragHandler}>
                <Text>Add New Course</Text>
              </View>
                  <ScrollView>
              <View style={{flexDirection: 'row'}}>
                  <View style={{ backgroundColor: 'white', width: "100%", justifyContent: 'center', alignItems: "center"}}>
              <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    style={{ width: "90%"}}
                        mode="outlined"
                        label="Course Name"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={courseName}
                        onChangeText={setCourseName}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    style={{ width: "90%", marginVertical:10}}
                        mode="outlined"
                        label="Duration"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={duration}
                        onChangeText={setDuration}
                    />
                    <View style={{padding: 50}}>
                    <TouchableOpacity style={{
                    borderColor: "#0275d8",
                    borderWidth: 2,
                    borderRadius: 10,
                    backgroundColor: "#0275d8",
                    elevation: 12
                    }} onPress={() => handleSubmit({courseName, duration})} >
                        <Text style={{padding: 10, color:"white"}}>Submit</Text>
                    </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                    </ScrollView>
            </View>
          )}
        </SlidingUpPanel>
      </View>
        // </View>
    )
}

export default AddCourse