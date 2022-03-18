import React from "react";
import { View , ImageBackground} from "react-native";
import { Text } from "react-native-elements";

const Profile = ({navigation}) => {

    let user = navigation.getParam('user')

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
                    </View>
            </View>
            <View style={{flex: 2.8}}>
                <Text>User Info</Text>
            </View>
        </View>
    )
}

export default Profile