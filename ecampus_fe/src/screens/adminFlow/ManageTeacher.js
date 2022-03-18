import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { addTeacher } from "../../context/AuthContext";
const ManageTeacher = ({navigation}) => {

    const [teachers, setTeachers] = useState([])

    return(
        // <View>
        <View style={styles.container}>
        <FlatList       
                refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />}
            style={{width: '100%', height:"100%"}}
                data={courses}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => <TouchableOpacity style={{ padding: 5}}
                onPress={() => {navigation.navigate('TodoDetails', { _id: item._id })}}
                ><Text h4 style={{backgroundColor: 'white', elevation:12, borderRadius:20, padding: 10}}>{item.courseName}</Text></TouchableOpacity>}
            />
            <View style={{padding: 50}}>
                <Button onPress={() => _panel.show()} title="Create Course" />
            </View>
        {/* <TouchableOpacity  onPress={() => _panel.show()}>
          <View>
            <Text>Make Announcement</Text>
          </View>
        </TouchableOpacity> */}
        <SlidingUpPanel draggableRange={{ top: 300, bottom: 0 }}ref={c => (_panel = c)}>
          {dragHandler => (
            <View style={{backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
              <View style={styles.dragHandler} {...dragHandler}>
                <Text>Add New Course</Text>
              </View>
                  <ScrollView>
              <View style={{flexDirection: 'row'}}>
                  <View style={{ backgroundColor: 'white', width: "100%", justifyContent: 'center', alignItems: "center"}}>
              <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    style={{ width: "90%"}}
                        mode="outlined"
                        label="Course Name"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={courseName}
                        onChangeText={setCourseName}
                    />
                    <TextInput
                    theme={{ colors: { primary: '#0275d8',underlineColor:'transparent'}}}
                    style={{ width: "90%", marginVertical:10}}
                        mode="outlined"
                        label="Duration"
                        returnKeyType="next"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={duration}
                        onChangeText={setDuration}
                    />
                    <View style={{padding: 50}}>
                    <TouchableOpacity style={{
                    borderColor: "#0275d8",
                    borderWidth: 2,
                    borderRadius: 10,
                    backgroundColor: "#0275d8",
                    elevation: 12
                    }} onPress={() => handleSubmit({courseName, duration})} >
                        <Text style={{padding: 10, color:"white"}}>Submit</Text>
                    </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                    </ScrollView>
            </View>
          )}
        </SlidingUpPanel>
      </View>
    )
}

export default ManageTeacher