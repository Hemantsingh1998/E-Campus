import React, {useState, useEffect, useContext} from 'react'
import {View, TouchableOpacity, ScrollView} from 'react-native'
import { Text, Avatar } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Home = ({navigation}) => {

    const { logout } = useContext(AuthContext)
    
    const [name, setname] = useState('')
    
    useEffect(() => {
        getAsyncUser()
    },[])
    const getAsyncUser = async () => {
        try {
            let userAsync = await AsyncStorage.getItem('user')
            let user = JSON.parse(userAsync)
            // alert(user.name)
            setname(user.name)
        } catch (error) {
            alert(error)
        }
    }

    return(
        <View style={{flex:1, backgroundColor:"white"}}>
            <View style={{flex:1, flexDirection:'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <View>
                    <Avatar
                    size={100}
                    rounded
                    icon={{name: 'user-circle', type: 'font-awesome', color:"black"}}
                    activeOpacity={0.7}
                    />
                </View>
                <View>
                    <View>
                        <Text h3>
                            {name}
                        </Text>
                    </View>
                    <View>
                <Text>
                    Class: class
                </Text>
                    </View>
                </View>
            </View>
            <View style={{flex:2, width: '100%', backgroundColor:"whitesmoke"}}>
                <ScrollView style={{flex: 1}}>
                    <View style={{flex: 1.4, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View>
                                    <View>
                    <Avatar
                    size={100}
                    rounded
                    icon={{name: 'user-circle', type: 'font-awesome', color:"black"}}
                    activeOpacity={0.7}
                    />
                </View>
                  <TouchableOpacity onPress={() => navigation.navigate('Profile')}><Text>Profile</Text></TouchableOpacity>
                </View>
                <View>
                                <View>
                    <Avatar
                    size={100}
                    rounded
                    icon={{name: 'user-circle', type: 'font-awesome', color:"black"}}
                    activeOpacity={0.7}
                    />
                </View>
                  <TouchableOpacity onPress={() => navigation.navigate('AnnounceMent')}><Text>Announcement</Text></TouchableOpacity>
                </View>
                <View>
                                <View>
                    <Avatar
                    size={100}
                    rounded
                    icon={{name: 'user-circle', type: 'font-awesome', color:"black"}}
                    activeOpacity={0.7}
                    />
                </View>
                  <TouchableOpacity onPress={() => navigation.navigate('TimeTable')}><Text>TimeTable</Text></TouchableOpacity>
                </View>
                    </View>
                    <View style={{flex: 1.4, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View>
                                    <View>
                    <Avatar
                    size={100}
                    rounded
                    icon={{name: 'user-circle', type: 'font-awesome', color:"black"}}
                    activeOpacity={0.7}
                    />
                </View>
                  <TouchableOpacity onPress={() => navigation.navigate('Attendance')}><Text>Attendance</Text></TouchableOpacity>
                </View>
                <View>
                                <View>
                    <Avatar
                    size={100}
                    rounded
                    icon={{name: 'user-circle', type: 'font-awesome', color:"black"}}
                    activeOpacity={0.7}
                    />
                </View>
                  <TouchableOpacity onPress={() => navigation.navigate('OnlineClass')}><Text>OnlineClass</Text></TouchableOpacity>
                </View>
                <View>
                                <View>
                    <Avatar
                    size={100}
                    rounded
                    icon={{name: 'user-circle', type: 'font-awesome', color:"black"}}
                    activeOpacity={0.7}
                    />
                </View>
                  <TouchableOpacity onPress={() => navigation.navigate('OnlineExams')}><Text>OnlineExams</Text></TouchableOpacity>
                </View>
                    </View>
                <View style={{flex: 1.4, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View>
                                    <View>
                    <Avatar
                    size={100}
                    rounded
                    icon={{name: 'user-circle', type: 'font-awesome', color:"black"}}
                    activeOpacity={0.7}
                    />
                </View>
                  <TouchableOpacity onPress={() => navigation.navigate('Results')}><Text>Results</Text></TouchableOpacity>
                </View>
                <View>
                                <View>
                    <Avatar
                    size={100}
                    rounded
                    icon={{name: 'user-circle', type: 'font-awesome', color:"black"}}
                    activeOpacity={0.7}
                    />
                </View>
                  <TouchableOpacity onPress={() => navigation.navigate('Fees')}><Text>Fees</Text></TouchableOpacity>
                </View>
                <View>
                                <View>
                    <Avatar
                    size={100}
                    rounded
                    icon={{name: 'user-circle', type: 'font-awesome', color:"black"}}
                    activeOpacity={0.7}
                    />
                </View>
                  <TouchableOpacity onPress={() => navigation.navigate('ECard')}><Text>ECard</Text></TouchableOpacity>
                </View>
                </View>
                <View style={{flex: 1.4, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>

                <View>
                                <View>
                    <Avatar
                    size={100}
                    rounded
                    icon={{name: 'user-circle', type: 'font-awesome', color:"black"}}
                    activeOpacity={0.7}
                    />
                </View>
                  <TouchableOpacity onPress={() => navigation.navigate('Applicaion')}><Text>Application</Text></TouchableOpacity>
                </View>
                <View>
                                <View>
                    <Avatar
                    size={100}
                    rounded
                    icon={{name: 'user-circle', type: 'font-awesome', color:"black"}}
                    activeOpacity={0.7}
                    />
                </View>
                  <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}><Text>Aout Us</Text></TouchableOpacity>
                </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
Home.navigationOptions = {
    headerShown: false
}
export default Home