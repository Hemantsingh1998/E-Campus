import React, {useState, useEffect, useContext} from 'react'
import {View, TouchableOpacity, ScrollView, ImageBackground, PermissionsAndroid, Button} from 'react-native'
import { Text, Avatar } from 'react-native-elements'
import { Context as AuthContext } from '../../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
const TeacherHome = ({navigation}) => {

    const { logout } = useContext(AuthContext)
    
    const [user, setuser] = useState({})
    
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            )
        //   const granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.CAMERA,
        //     {
        //       title: "E-Campus requires permission",
        //       message:
        //         "E-Campus needs to access your storage" +
        //         "so you can take awesome pictures.",
        //       buttonNeutral: "Ask Me Later",
        //       buttonNegative: "Cancel",
        //       buttonPositive: "OK"
        //     }
        //   );
          if (granted) {
            console.log("You can use the camera");
          } else {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                  title: "E-Campus requires permission",
                  message:
                    "E-Campus needs to access your storage" ,
                  buttonNeutral: "Ask Me Later",
                  buttonNegative: "Cancel",
                  buttonPositive: "OK"
                }
              );
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };
    useEffect(() => {
          requestCameraPermission()
        getAsyncUser()
    },[])
    const getAsyncUser = async () => {
        try {
            let userAsync = await AsyncStorage.getItem('user')
            let user = JSON.parse(userAsync)
            // alert(user)
            console.log(user)
            setuser(user)
        } catch (error) {
            alert(error)
        }
    }


    return(
        <View style={{flex:1, backgroundColor:"white"}}>
            <View style={{flex:1, flexDirection:'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <View style={{height: 100, width: 100, padding: 5}}>
                    <ImageBackground source ={require('../../../Assets/User.png')} resizeMode='cover' style={{
                    flex:1,
                    JustifyContent: 'center',
                    alignItems: 'center',
                    
                    }}> 
                    </ImageBackground>
                </View>
                <View>
                    <View>
                        <Text h3>
                            {user.firstName} {user.lastName}
                        </Text>
                    </View>
                    <View>
                    </View>
                </View>
            </View>
            <View style={{flex:2, width: '100%', backgroundColor:"whitesmoke"}}>
                <ScrollView style={{flex: 1}}>
                    <View style={{flex: 1.4, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 5}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        
                  <TouchableOpacity onPress={() => navigation.navigate('Profile', {user:user}, {user:user})}>
                      <View style={{height: 80, width: 80, padding: 5}}>
                          <ImageBackground source ={require('../../../Assets/Profile.jpg')} resizeMode='cover' style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            
                            }}> 
                            </ImageBackground>
                      </View><View style={{
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                      }}><Text>Profile</Text></View></TouchableOpacity>
                </View>
                <View  style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                  <TouchableOpacity onPress={() => navigation.navigate('AnnounceMent', {user:user})}>
                      <View style={{height: 80, width: 80, padding: 5}}>
                          <ImageBackground source ={require('../../../Assets/announcement.png')} resizeMode="cover" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            
                            }}> 
                            </ImageBackground>
                      </View><View style={{
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                      }}><Text>Announcement</Text></View></TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                  <TouchableOpacity onPress={() => navigation.navigate('TimeTable', {user:user})}>
                      <View style={{height: 80, width: 80, padding: 5}}>
                          <ImageBackground source ={require('../../../Assets/timetable.png')} resizeMode="cover" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            
                            }}> 
                            </ImageBackground>
                      </View><View style={{
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                      }}><Text>Time Table</Text></View></TouchableOpacity>
                </View>
                    </View>
                    <View style={{flex: 1.4, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>

                    </View>
                <View style={{flex: 1.4, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        
                  <TouchableOpacity onPress={() => navigation.navigate('Attendance', {user:user})}>
                      <View style={{height: 80, width: 80, padding: 5}}>
                          <ImageBackground source ={require('../../../Assets/attendance.jpg')} resizeMode="cover" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            
                            }}> 
                            </ImageBackground>
                      </View><View style={{
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                      }}><Text>Attendance</Text></View></TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                  <TouchableOpacity onPress={() => navigation.navigate('Fees', {user:user})}>
                      <View style={{height: 80, width: 80, padding: 5}}>
                          <ImageBackground source ={require('../../../Assets/fees.png')} resizeMode="cover" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            
                            }}> 
                            </ImageBackground>
                      </View><View style={{
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                      }}><Text>Fees</Text></View></TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                  <TouchableOpacity onPress={() => navigation.navigate('Ecard', {user:user})}>
                      <View style={{height: 80, width: 80, padding: 5}}>
                          <ImageBackground source ={require('../../../Assets/ecard.png')} resizeMode="cover" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            
                            }}> 
                            </ImageBackground>
                      </View><View style={{
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                      }}><Text>E-Card</Text></View></TouchableOpacity>
                </View>
                </View>

<View style={{flex: 1.4, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 5}}>
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
        
  <TouchableOpacity onPress={() => navigation.navigate('Results', {user:user}, {user:user})}>
      <View style={{height: 80, width: 80, padding: 5}}>
          <ImageBackground source ={require('../../../Assets/Result.png')} resizeMode='cover' style={{
            flex:1,
            JustifyContent: 'center',
            alignItems: 'center',
            
            }}> 
            </ImageBackground>
      </View><View style={{
          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
      }}><Text>Results</Text></View></TouchableOpacity>
</View>
<View  style={{justifyContent: 'center', alignItems: 'center'}}>
                
  <TouchableOpacity onPress={() => navigation.navigate('OnlineExams', {user:user})}>
      <View style={{height: 80, width: 80, padding: 5, flexDirection: 'column', justifyContent: 'center', alignSelf:"center"}}>
          <ImageBackground source ={require('../../../Assets/onlineexam.png')} resizeMode="cover" style={{
            flex:1,
            JustifyContent: 'center',
            alignItems: 'center',
            
            }}> 
            </ImageBackground>
      </View><View style={{
          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
      }}><Text>Online Exam</Text></View></TouchableOpacity>
</View>
<View style={{justifyContent: 'center', alignItems: 'center'}}>
                
  <TouchableOpacity onPress={() => navigation.navigate('OnlineClass', {user:user})}>
      <View style={{height: 80, width: 80, padding: 5}}>
          <ImageBackground source ={require('../../../Assets/onlieclass.png')} resizeMode="cover" style={{
            flex:1,
            JustifyContent: 'center',
            alignItems: 'center',
            
            }}> 
            </ImageBackground>
      </View><View style={{
          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
      }}><Text>Online Class</Text></View></TouchableOpacity>
</View>
    </View>
                <View style={{flex: 1.4, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>

                <View style={{justifyContent: 'center', alignItems: 'center'}} >
                                
                  <TouchableOpacity onPress={() => navigation.navigate('Application', {user:user})}>
                      <View style={{height: 80, width: 80, padding: 5}}>
                          <ImageBackground source ={require('../../../Assets/applicationform.png')} resizeMode="cover" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            
                            }}> 
                            </ImageBackground>
                      </View><View style={{
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                      }}><Text>Application</Text></View></TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                  <TouchableOpacity onPress={() => navigation.navigate('Events', {user:user})}>
                      <View style={{height: 80, width: 80, padding: 5}}>
                          <ImageBackground source ={require('../../../Assets/Result.png')} resizeMode="cover" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            
                            }}> 
                            </ImageBackground>
                      </View><View style={{
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                      }}><Text>Events</Text></View></TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                
                  <TouchableOpacity onPress={() => navigation.navigate('AboutUs', {user:user})}>
                      <View style={{height: 80, width: 80, padding: 5}}>
                          <ImageBackground source ={require('../../../Assets/aboutus.jpg')} resizeMode="cover" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            
                            }}> 
                            </ImageBackground>
                      </View><View style={{
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                      }}><Text>About Us</Text></View></TouchableOpacity>
                </View>
                    </View>
                <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>           
                      <View style={{height: 100, width: "50%"}}>
                          <ImageBackground source ={require('../../../Assets/PoweredBy.png')} resizeMode="cover" style={{
                            flex:1,
                            JustifyContent: 'center',
                            alignItems: 'center',
                            
                            }}> 
                            </ImageBackground>
                      </View><View style={{
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                      }}></View>
                </View>
                </ScrollView>
            </View>
        </View>
    )
}
TeacherHome.navigationOptions = {
    title: "Teacher Dashboard"
}
export default TeacherHome