import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { RefreshControl, View, TouchableOpacity, ScrollView, Linking, Button, Alert, FlatList } from "react-native";
import { Text } from "react-native-elements";
import { TextInput } from "react-native-paper";
import SlidingUpPanel from 'rn-sliding-up-panel'
import actions from '../api/actions'
import Dialog from "react-native-dialog";
import {AddSubjectAd} from '../../context/AuthContext'
import MultiSelect from 'react-native-multiple-select';
import Collapsible from 'react-native-collapsible';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const OnlineClass = ({navigation}) => {

    const [classes, setClasses] = useState([])
    const [subject, setSubject] = useState('')
    const [link, setLink] = useState('')
    const [selectedItems, setSelectedItems] = useState([]);
    const [data, setData] = useState({})
    const [refreshing, setRefreshing] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [visible, setVisible] = useState(false);
    const user = navigation.getParam('user')
    // console.log(user)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getClasses()
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getCourse()
        getClasses()
    }, [])

    const showDialog = (item) => {
        // handleDialog(item)
        setVisible(true);
        setData(item)
        // handleDisplay()
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

    const handleSubmit = ({subject, link}) => {
        console.log(subject, link, user.id)
        actions.post(`/api/add-onlinelecture`, {subject, link, postedBy: user.id}).then(res => {
            _panel.hide()
            onRefresh()
        }).catch(err => {
            console.log(err)
        })
    }

    const getCourse = () => {
        actions.get(`/api/get-course`).then(res => {
            // console.log(res.data)
            setSubject(res.data.reverse())
        }).catch(err => {
            console.log(err)
        })
      }

    const getClasses = () => {
        actions.get(`/api/get-class/${user.id}`).then(res => {
            console.log(res.data)
            setClasses(res.data.classes)
        }).catch(err => {
            console.log(err)
        })
    }   

    const handleCancel = () => {
        setVisible(false);
      };
    
    const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
    };

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedItems(selectedItems);
        console.log(selectedItems)
    };

    const handleDialog = () => {
        // console.log("DATA",data)
        return(
        <View>
        <Dialog.Container visible={visible}>
        <Dialog.Title>Lecture Url</Dialog.Title>
        <Dialog.Description>
            Click on below url to open the lecture
        </Dialog.Description>
        <TouchableOpacity
            onPress={() => Linking.openURL(`https://${data.link}`)}>
            <Text style={{color: '#0275d8'}}>{data.link}</Text>
        </TouchableOpacity>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Open Url" 
        onPress={() => Linking.openURL(`https://${data.link}`)} />
        </Dialog.Container>
    </View>
        )
    }

    return(
        <View style={styles.container}>
            {/* <Text>{JSON.stringify(classes)}</Text> */}
        {classes.length === 0 ? <View>
                <Text>No Lectures</Text>
            </View> : 
        <FlatList       
                refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />}
            style={{width: '100%', height:"100%"}}
                data={classes}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => <TouchableOpacity onPress={() =>showDialog(item)} style={{ padding: 5}}
                ><Text h4 style={{backgroundColor: 'white', elevation:12, borderRadius:20, padding: 10}}>{item.subject.subjectName}</Text></TouchableOpacity>}
            />}
            {user.role === 0 ? 
            null: 
            <View style={{padding: 50}}>
                <Button onPress={() => _panel.show()} title="Online Class" />
            </View>}

        <SlidingUpPanel draggableRange={{ top: 300, bottom: 0 }}ref={c => (_panel = c)}>
          {dragHandler => (
            <View style={{backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
              <View style={styles.dragHandler} {...dragHandler}>
                <Text>Make OnlineClass</Text>
              </View>
                  {/* <ScrollView> */}
              <View style={{flexDirection: 'row'}}>
                  <View style={{ backgroundColor: 'white', width: "100%", justifyContent: 'center', alignItems: "center"}}>
              {/* <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    style={{ width: "90%"}}
                        mode="outlined"
                        label="Course"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={subject}
                        onChangeText={setSubject}
                    /> */}
                    <View style={{width:'90%'}}>
                    <MultiSelect
                    single
                        flatListProps={{height: 100, keyboardShouldPersistTaps:'handled'}}
                        items={subject}
                        uniqueKey={subject._id}
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="Select subject"
                        searchInputPlaceholderText="Search subject..."
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
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    style={{ width: "90%", marginVertical:10}}
                        mode="outlined"
                        label="Post Link"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={link}
                        onChangeText={setLink}
                    />
                    <View style={{padding: 50}}>
                    <TouchableOpacity style={{
                    borderColor: "#0275d8",
                    borderWidth: 2,
                    borderRadius: 10,
                    backgroundColor: "#0275d8",
                    elevation: 12
                    }} onPress={() => handleSubmit({subject: selectedItems[0], link})} >
                        <Text style={{padding: 10, color:"white"}}>Submit</Text>
                    </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                    {/* </ScrollView> */}
            </View>
          )}
        </SlidingUpPanel>
        {handleDialog()}
        </View>
    )
}

export default OnlineClass