import React, {useContext} from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { Context as AuthContext } from '../context/AuthContext'

const AboutUs = ({navigation}) => {

    const {state, logout} = useContext(AuthContext)

    return(
        <View>
            <Text h1>AboutUs</Text>
            <TouchableOpacity onPress={() => logout()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AboutUs