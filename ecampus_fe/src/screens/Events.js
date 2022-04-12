import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { RefreshControl, View, TouchableOpacity, ScrollView, Button, Alert, FlatList } from "react-native";
import { Text } from "react-native-elements";
import { TextInput } from "react-native-paper";
import SlidingUpPanel from 'rn-sliding-up-panel'
import actions from '../api/actions'
import {addCourseAd} from '../../context/AuthContext'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Events = ({navigation}) => {

    const [events, setEvents] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [refreshing, setRefreshing] = useState(false);

    const user = navigation.getParam('user')
    console.log(user)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getEvents()
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getEvents()
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

    const handleSubmit = ({title, description}) => {
        console.log(title, description, user.id)
        actions.post(`/api/add-event`, {title, description, postedBy: user.id}).then(res => {
            _panel.hide()
            onRefresh()
        }).catch(err => {
            console.log(err)
        })
    }

    const getEvents = () => {
        actions.get('/api/get-events').then(res => {
            // console.log(res.data)s
            setEvents(res.data.reverse())
        }).catch(err => {
            console.log(err)
        })
    }   

    return(
        <View style={styles.container}>
            {events.length === 0 ? <View>
                <Text>No  Events</Text>
            </View> : 
        <FlatList       
                refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />}
            style={{width: '100%', height:"100%"}}
                data={events}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => <TouchableOpacity onPress={() => navigation.navigate('SingleEvent', {item} )} style={{ padding: 5}}
                ><Text h4 style={{backgroundColor: 'white', elevation:12, borderRadius:20, padding: 10}}>{item.title}</Text></TouchableOpacity>}
            />}
            {user.role === 0 ? 
            null: 
            <View style={{padding: 50}}>
                <Button onPress={() => _panel.show()} title="CREATE EVENT" />
            </View>}

        <SlidingUpPanel draggableRange={{ top: 300, bottom: 0 }}ref={c => (_panel = c)}>
          {dragHandler => (
            <View style={{backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
              <View style={styles.dragHandler} {...dragHandler}>
                <Text>Add New Course</Text>
              </View>
                  {/* <ScrollView> */}
              <View style={{flexDirection: 'row'}}>
                  <View style={{ backgroundColor: 'white', width: "100%", justifyContent: 'center', alignItems: "center"}}>
              <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    style={{ width: "90%"}}
                        mode="outlined"
                        label="Title"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    style={{ width: "90%", marginVertical:10}}
                        mode="outlined"
                        label="Desctiption"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <View style={{padding: 50}}>
                    <TouchableOpacity style={{
                    borderColor: "#0275d8",
                    borderWidth: 2,
                    borderRadius: 10,
                    backgroundColor: "#0275d8",
                    elevation: 12
                    }} onPress={() => handleSubmit({title, description})} >
                        <Text style={{padding: 10, color:"white"}}>Submit</Text>
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

export default Events