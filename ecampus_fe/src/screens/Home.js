import React, {useState, useEffect, useContext} from 'react'
import {View, TouchableOpacity, ScrollView, ImageBackground} from 'react-native'
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
                <ImageBackground source ={require('../../Assets/Profile.jpg')} resizeMode="contain" style={{
                flex:1,
                JustifyContent: 'center',
                alignItems: 'center',
                marginTop: 100,
                }}> 
                </ImageBackground>
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
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        
                  <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                      <View>
                          <ImageBackground source ={require('../../Assets/Profile.jpg')} resizeMode="contain" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 100,
                            }}> 
                            </ImageBackground>
                      </View><Text>Profile</Text></TouchableOpacity>
                </View>
                <View  style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                  <TouchableOpacity onPress={() => navigation.navigate('AnnounceMent')}>
                      <View>
                          <ImageBackground source ={require('../../Assets/announcement.png')} resizeMode="contain" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 100,
                            }}> 
                            </ImageBackground>
                      </View><Text>Announcement</Text></TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                  <TouchableOpacity onPress={() => navigation.navigate('TimeTable')}>
                      <View>
                          <ImageBackground source ={require('../../Assets/timetable.png')} resizeMode="contain" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 100,
                            }}> 
                            </ImageBackground>
                      </View><Text>TimeTable</Text></TouchableOpacity>
                </View>
                    </View>
                    <View style={{flex: 1.4, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    < View style={{justifyContent: 'center', alignItems: 'center'}}>
                        
                  <TouchableOpacity onPress={() => navigation.navigate('Attendance')}>
                      <View>
                          <ImageBackground source ={require('../../Assets/attendance.jpg')} resizeMode="contain" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 100,
                            }}> 
                            </ImageBackground>
                      </View><Text>Attendance</Text></TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                  <TouchableOpacity onPress={() => navigation.navigate('OnlineClass')}>
                      <View>
                          <ImageBackground source ={require('../../Assets/onlieclass.png')} resizeMode="contain" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 100,
                            }}> 
                            </ImageBackground>
                      </View><Text>OnlineClass</Text></TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                  <TouchableOpacity onPress={() => navigation.navigate('OnlineExams')}>
                      <View>
                          <ImageBackground source ={require('../../Assets/onlineexam.png')} resizeMode="contain" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 100,
                            }}> 
                            </ImageBackground>
                      </View><Text >OnlineExams</Text></TouchableOpacity>
                </View>
                    </View>
                <View style={{flex: 1.4, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View  style={{justifyContent: 'center', alignItems: 'center'}}>
                        
                  <TouchableOpacity onPress={() => navigation.navigate('Results')}>
                      <View>
                          <ImageBackground source ={require('../../Assets/Result.png')} resizeMode="contain" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 100,
                            }}> 
                            </ImageBackground>
                      </View><Text>Results</Text></TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                  <TouchableOpacity onPress={() => navigation.navigate('Fees')}>
                      <View>
                          <ImageBackground source ={require('../../Assets/fees.png')} resizeMode="contain" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 100,
                            }}> 
                            </ImageBackground>
                      </View><Text>Fees</Text></TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                  <TouchableOpacity onPress={() => navigation.navigate('Ecard')}>
                      <View>
                          <ImageBackground source ={require('../../Assets/ecard.png')} resizeMode="contain" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 100,
                            }}> 
                            </ImageBackground>
                      </View><Text>ECard</Text></TouchableOpacity>
                </View>
                </View>
                <View style={{flex: 1.4, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>

                <View style={{justifyContent: 'center', alignItems: 'center'}} >
                                
                  <TouchableOpacity onPress={() => navigation.navigate('Application')}>
                      <View>
                          <ImageBackground source ={require('../../Assets/applicationform.png')} resizeMode="contain" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 100,
                            }}> 
                            </ImageBackground>
                      </View><Text>Application</Text></TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                  <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
                      <View>
                          <ImageBackground source ={require('../../Assets/aboutus.jpg')} resizeMode="contain" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 100,
                            }}> 
                            </ImageBackground>
                      </View><Text>Aout Us</Text></TouchableOpacity>
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