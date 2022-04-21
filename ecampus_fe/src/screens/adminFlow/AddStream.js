import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { RefreshControl, View, TouchableOpacity, ScrollView, Button, Alert, FlatList } from "react-native";
import { Text } from "react-native-elements";
import { TextInput } from "react-native-paper";
import SlidingUpPanel from 'rn-sliding-up-panel'
import actions from '../../api/actions'
import {addStreamAd} from '../../context/AuthContext'
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const AddStream = ({navigation}) => {

    const [streamName, setStreamName] = useState('')
    const [duration, setDuration] = useState(0)
    const [streams, setStreams] = useState([])
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

    const handleSubmit = ({streamName, duration}) => {
        console.log(streamName, duration)
        if (streamName === '' || duration === 0) {
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
            addStreamAd({streamName, duration, postedBy: user.id})
            _panel.hide()
        }
    }
    
    const getCourse = () => {
        actions.get(`/api/get-streams`).then(res => {
            console.log(res.data)
            setStreams(res.data.reverse())
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
                data={streams}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => <View style={{ padding: 5}}
                // onPress={() => {navigation.navigate('TodoDetails', { _id: item._id })}}
                ><View style={{backgroundColor: 'white', elevation:12, borderRadius:20, padding: 10}}><Text h4>{item.streamName}</Text>
                <Text>Duration:{item.duration} year</Text></View></View>}
            />
            <View style={{padding: 50}}>
                <Button onPress={() => _panel.show()} title="Add Stream" />
            </View>
        <SlidingUpPanel draggableRange={{ top: 300, bottom: 0 }}ref={c => (_panel = c)}>
          {dragHandler => (
            <View style={{backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
              <View style={styles.dragHandler} {...dragHandler}>
                <Text>Add New Stream</Text>
              </View>
                  <ScrollView>
              <View style={{flexDirection: 'row'}}>
                  <View style={{ backgroundColor: 'white', width: "100%", justifyContent: 'center', alignItems: "center"}}>
              <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    style={{ width: "90%"}}
                        mode="outlined"
                        label="Stream Name"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={streamName}
                        onChangeText={setStreamName}
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
                    <View style={{padding: 50}}>
                    <TouchableOpacity style={{
                    borderColor: "#0275d8",
                    borderWidth: 2,
                    borderRadius: 10,
                    backgroundColor: "#0275d8",
                    elevation: 12
                    }} onPress={() => handleSubmit({streamName, duration})} >
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

export default AddStream