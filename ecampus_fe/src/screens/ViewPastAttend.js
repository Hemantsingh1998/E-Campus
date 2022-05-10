import React, {useEffect, useState} from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import actions from '../api/actions'
import moment from 'moment'
const ViewPastAttend = ({navigation}) => {
    let user = navigation.getParam('user')
    const [pastAttendance, setPastAttendance] = useState([])

    useEffect(() => {
        getAttend()
    }, [])

    const getAttend = () => {
        let params = {
            id: user.id
         }
         actions.get(`/api/getattendbyteacher`, {params}).then(res => {
             console.log(res.data[0])
            setPastAttendance(res.data.reverse())
         })
    }

    return(
        <View>
        <FlatList
          style={{width: '100%', height:"100%"}}
              data={pastAttendance}
              keyExtractor={(item) => item._id}
              renderItem={({item}) => <View style={{ padding: 5}}>
                  <View style={{backgroundColor: 'white'}}>
                      <TouchableOpacity onPress={() => navigation.navigate('SingleAttend', {item: item})} style={{padding: 5}}>
                          <Text h4>{item.subject.subjectName} {`(${item.stream.streamName})`}</Text>
                          {/* <Text>{item.year}</Text> */}
                          <Text>{moment(item.postedDate).format("DD/MM/YYYY")}</Text>
                      </TouchableOpacity>
                  </View>
              </View>}
          />
        </View>
    )
}

export default ViewPastAttend