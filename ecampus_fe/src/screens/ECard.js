import React, { useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import { Text } from "react-native-elements";
import actions from '../api/actions'
const ECard = ({navigation}) => {

    let user = navigation.getParam('user')
    // console.log("USER", user)
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
        if (user.role === 0) {
            let params={
                id: user.id
            }
            actions.get(`/api/getsinglestudent`, {params}).then(res => {
                console.log(res.data)
                setUserData(res.data)
                setStream(res.data.stream)
            })
        }
    }
    return(
        <View style={{flex: 1}}>
        <View style={{flex:0.3,flexDirection:'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center'}}>
            <View style={{height: 80, width: 80, padding: 5}}>
                <ImageBackground source ={require('../../Assets/Profile.jpg')} resizeMode='cover' style={{
                flex:1,
                JustifyContent: 'center',
                alignItems: 'center',
                
                }}> 
                </ImageBackground>
            </View>
            <View>
                <View>
                    <Text h3>
                       College Name
                    </Text>
                </View>
                <View>
                </View>
            </View>
        </View>
            <View style={{flex:1, flexDirection:'row', 
        justifyContent: 'center', 
        alignItems: 'center'}}>
                <View style={{height: 200, width: 200, padding: 5}}>
                    <ImageBackground source ={require('../../Assets/Profile.jpg')} resizeMode='cover' style={{
                    flex:1,
                    JustifyContent: 'center',
                    alignItems: 'center',
                    
                    }}> 
                    </ImageBackground>
                </View>
            </View>
            <View style={{flex:0.5,flexDirection:'row', 
        justifyContent: 'center', 
        alignItems: 'flex-start'}}>
            <View>
                <Text h2>{userData.salutation} {user.firstName} {user.lastName}</Text>
                <Text style={{alignSelf: 'center'}} h4>{stream.streamName}</Text>
            </View>
            </View>
            <View style={{padding: 5, justifyContent: 'center', alignItems: 'center'}}>           
                      <View style={{height: 100, width: "50%"}}>
                          <ImageBackground source ={require('../../Assets/PoweredBy.png')} resizeMode="cover" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            
                            }}> 
                            </ImageBackground>
                      </View><View style={{
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                      }}></View>
                </View>
        </View>
    )
}

export default ECard