import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { RefreshControl, View, TouchableOpacity, ScrollView, Button, Alert, FlatList } from "react-native";
import { Text } from "react-native-elements";
import { TextInput } from "react-native-paper";
import SlidingUpPanel from 'rn-sliding-up-panel'
import actions from '../api/actions'
import Collapsible from 'react-native-collapsible';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Announcement = ({navigation}) => {
    const [announce, setAnnounce] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [refreshing, setRefreshing] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true)
    
    const user = navigation.getParam('user')
    // console.log(user)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAnnounce()
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getAnnounce()
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
        actions.post(`/api/add-announce`, {title, description, postedBy: user.id}).then(res => {
            _panel.hide()
            onRefresh()
        }).catch(err => {
            console.log(err)
        })
    }

    const getAnnounce = () => {
        actions.get('/api/get-announce').then(res => {
            // console.log(res.data)s
            setAnnounce(res.data.reverse())
        }).catch(err => {
            console.log(err)
        })
    }   

    return(
        <View style={styles.container}>
            {announce.length === 0 ? <View>
                <Text>No  Announcements</Text>
            </View> : 
        <FlatList       
                refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />}
            style={{width: '100%', height:"100%"}}
                data={announce}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => 
                // <TouchableOpacity style={{ padding: 5}}
                // ><Text h4 style={{backgroundColor: 'white', elevation:12, borderRadius:20, padding: 10}}>
                //     {item.title}</Text>
                //     </TouchableOpacity>
                <View>
                {isCollapsed ? <TouchableOpacity onPress={() => setIsCollapsed(false)}><Text h4 style={{backgroundColor: 'white', elevation:12, borderRadius:20, padding: 10}}>{item.title}</Text></TouchableOpacity> : 
                
                <Collapsible collapsed={isCollapsed}>
                    <Text h4>Title: {item.title}</Text>
                    <TouchableOpacity onPress={() => setIsCollapsed(true)} style={{ padding: 5}}
                ><Text h4 style={{backgroundColor: 'white', elevation:12, borderRadius:20, padding: 10}}>
                    {item.description}</Text>
                    </TouchableOpacity>
                    <View style={{backgroundColor: 'black', paddingVertical: 3}}></View>
              </Collapsible>}
              </View>
                }
            />}
            {user.role === 0 ? 
            null: 
            <View style={{padding: 50}}>
                <Button onPress={() => _panel.show()} title="make Announcement" />
            </View>}

        <SlidingUpPanel draggableRange={{ top: 300, bottom: 0 }}ref={c => (_panel = c)}>
          {dragHandler => (
            <View style={{backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
              <View style={styles.dragHandler} {...dragHandler}>
                <Text>Make Announcement</Text>
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

export default Announcement