import React from "react"
import { View } from "react-native"
import { Text } from "react-native-elements"

const SingleEvent = ({navigation}) => {

    let event = navigation.getParam('item')

    return (
        <View style={{padding: 5}}>
            <Text h3>{event.title}</Text>
            <Text h4>{event.description}</Text>
        </View>
    )
}

export default SingleEvent