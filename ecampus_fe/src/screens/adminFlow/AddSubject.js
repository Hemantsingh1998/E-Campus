import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { RefreshControl, View, TouchableOpacity, ScrollView, Button, Alert, FlatList } from "react-native";
import { Text } from "react-native-elements";
import { TextInput } from "react-native-paper";
import SlidingUpPanel from 'rn-sliding-up-panel'
import actions from '../../api/actions'
import {AddSubjectAd} from '../../context/AuthContext'
import MultiSelect from 'react-native-multiple-select';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const AddSubject = ({navigation}) => {

    const [subjectName, setSubjectName] = useState('')
    const [duration, setDuration] = useState(0)
    const [courses, setCourses] = useState([])
    const [stream, setStreams] = useState([])
    const [selectedItems, setSelectedItems] = useState();
    const [refreshing, setRefreshing] = useState(false);
    // const {state, AddSubjectAd} = useContext(AuthContext)
    
    const user = navigation.getParam('user')
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getCourse()
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getCourse()
        getStream()
    }, [])

    const getStream = () => {
        actions.get(`/api/get-streams`).then(res => {
            console.log(res.data)
            setStreams(res.data.reverse())
        }).catch(err => {
            console.log(err)
        })
    }

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

    const handleSubmit = ({subjectName, duration}) => {
        console.log(subjectName, duration, selectedItems)
        if (subjectName === '' || duration === 0) {
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
            AddSubjectAd({subjectName, duration, belongsTo: selectedItems[0], postedBy: user.id})
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

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems);
        console.log(selectedItems)
    };

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
                renderItem={({item}) => <View style={{ padding: 5}}
                // onPress={() => {navigation.navigate('TodoDetails', { _id: item._id })}}
                ><View style={{backgroundColor: 'white', elevation:12, borderRadius:20, padding: 10}}><Text h4>{item.subjectName}</Text>
                <Text>Duration:{item.duration} year</Text></View></View>}
            />
            <View style={{padding: 50}}>
                <Button onPress={() => _panel.show()} title="Add Subject" />
            </View>
        <SlidingUpPanel draggableRange={{ top: 500, bottom: 0 }}ref={c => (_panel = c)}>
          {dragHandler => (
            <View style={{backgroundColor: 'white', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20}}>
              <View style={styles.dragHandler} {...dragHandler}>
                <Text>Add New Subject</Text>
              </View>
                  <View>
              <View style={{flexDirection: 'row'}}>
                  <View style={{ backgroundColor: 'white', width: "100%", justifyContent: 'center', alignItems: "center"}}>
              <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    style={{ width: "90%"}}
                        mode="outlined"
                        label="Subject Name"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={subjectName}
                        onChangeText={setSubjectName}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    style={{ width: "90%", marginVertical:10}}
                        mode="outlined"
                        label="Duration as per year"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={duration}
                        onChangeText={setDuration}
                    />
                    <View style={{width: '90%'}}>
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
                    <View style={{padding: 50}}>
                    <TouchableOpacity style={{
                    borderColor: "#0275d8",
                    borderWidth: 2,
                    borderRadius: 10,
                    backgroundColor: "#0275d8",
                    elevation: 12
                    }} onPress={() => handleSubmit({subjectName, duration})} >
                        <Text style={{padding: 10, color:"white"}}>Submit</Text>
                    </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                    </View>
            </View>
          )}
        </SlidingUpPanel>
      </View>
        // </View>
    )
}

export default AddSubject