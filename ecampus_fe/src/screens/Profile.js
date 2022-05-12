import React, { useEffect, useState } from "react";
import { View , ImageBackground, FlatList, TouchableOpacity} from "react-native";
import { Text } from "react-native-elements";
import actions from '../api/actions'
const Profile = ({navigation}) => {

    let user = navigation.getParam('user')
    console.log("USER", user)

    const [userData, setUserData] = useState({})
    const [stream, setStream] = useState('')

    useEffect(() => {
        getUser()
    },[])

    const getUser = () => {
        console.log('loaded')
        if (user.role === 1) {
            let params={
                id: user.id
            }
            actions.get(`/api/getsingleteacher`, {params}).then(res => {
                console.log(res.data)
                setUserData(res.data)
                setStream(res.data.stream)
            })
        }
    }

    return(
        <View style={{flex: 1}}>
            <View style={{flex: 1.2, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center"}}>
            <View style={{height: 100, width: 100, padding: 5}}>
                    <ImageBackground source ={require('../../Assets/Profile.jpg')} resizeMode='cover' style={{
                    flex:1,
                    JustifyContent: 'center',
                    alignItems: 'center',
                    
                    }}> 
                    </ImageBackground>
                </View>
                    <View>
                        <Text h1>{user.firstName} {user.lastName}</Text>
                        <Text h4>{stream.streamName}</Text>
                    </View>
            </View>
            <View style={{flex: 2.8}}>
                <View>
                    <Text h3>Subjects</Text>
                <FlatList
                style={{width: '100%', height:"100%"}}
                    data={userData.subjects}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => <View style={{ padding: 5}}>
                        <View style={{backgroundColor: 'white'}}>
                            <TouchableOpacity style={{padding: 5}}>
                                <Text h4>{item.subjectName}</Text>
                                {/* <Text>{item.year}</Text> */}
                            </TouchableOpacity>
                        </View>
                    </View>}
                />
                </View>
            </View>
        </View>
    )
}

export default Profile