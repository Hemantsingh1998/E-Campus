import React, {useEffect, useState} from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import actions from '../api/actions'
import moment from 'moment'

const SingleDayAttend = ({navigation}) => {

    let item = navigation.getParam('item')

    const [display, setDisplay] = useState(true)

    let present = item.studentPresent
    let absent = item.studentAbsent

    return (
        <View>
            {display ? 
            <View>
            <Text style={{alignSelf: 'center'}} h3>Students present</Text>
                <FlatList
                style={{width: '100%', height:"85%"}}
                    data={present}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => <View style={{ padding: 5}}>
                        <View style={{elevation: 12, backgroundColor: 'white'}}>
                            <TouchableOpacity 
                            onPress={() => navigation.navigate('SingleAttend', {id: item})} style={{padding: 5}}>
                                <Text style={{padding: 5}} h4>{item.firstName} {item.lastName}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                />
            </View> : 
            <View>
            <Text style={{alignSelf: 'center'}} h3>Students absent</Text>
                <FlatList
                style={{width: '100%', height:"85%"}}
                    data={absent}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => <View style={{ padding: 5}}>
                        <View style={{elevation: 12, backgroundColor: 'white'}}>
                            <TouchableOpacity 
                            onPress={() => navigation.navigate('SingleAttend', {id: item})} style={{padding: 5}}>
                                <Text style={{padding: 5}} h4>{item.firstName} {item.lastName}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                />
            </View>}
            <View style={{alignSelf: 'center'}}>
                {display ?
                <TouchableOpacity 
                style={{backgroundColor: 'blue', borderRadius: 20, elevation: 6}}
                onPress={() => setDisplay(false)}>
                    <Text style={{padding: 10, color:"white"}} h4>Show Absent</Text>
                </TouchableOpacity> : 
                <TouchableOpacity 
                style={{backgroundColor: 'blue', borderRadius: 20, elevation: 6}}
                onPress={() => setDisplay(true)}>
                    <Text style={{padding: 10, color:"white"}} h4>Show Present</Text>
                </TouchableOpacity>}
            </View>
            </View>
    )
}

export default SingleDayAttend