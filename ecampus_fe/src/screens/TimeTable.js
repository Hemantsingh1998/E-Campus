import React, { useEffect, useState } from 'react'
import {
  View,
  RefreshControl,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Button, FlatList, ImageBackground
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel'
import MultiSelect from 'react-native-multiple-select';
import actions from '../api/actions'
import { Text } from "react-native-elements";
import {launchImageLibrary} from 'react-native-image-picker';
import DropDown from "react-native-paper-dropdown";
import { Provider } from 'react-native-paper'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const TimeTable = ({navigation}) => {

  const yearList = [
    {
      label: "Third Year",
      value: "Third Year",
    },
    {
      label: "Second Year",
      value: "Second Year",
    },
    {
      label: "First Year",
      value: "First Year",
    },
  ];

    const [timeTableList, setTimeTableList] = useState([])
    const [year, setYear] = useState ("")
    const [refreshing, setRefreshing] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showDropDown, setShowDropDown] = useState(false);
    const [stream, setStream] = useState([])
    const user = navigation.getParam('user')
    const [photo, setPhoto] = useState('https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg');

    useEffect(() => {
      getCourse()
      getTimeTable()
    }, [])

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getTimeTable()
      wait(1000).then(() => setRefreshing(false));
    }, []);

    const selectPhotoTapped = () => {
        const options = {
          title: 'Select Photo',
          selectionLimit: 1, 
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, (response) => {
    
          console.log('Response = ', response.assets);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            const uri = response.assets[0].uri;
            const type = response.assets[0].type;
            const name = response.assets[0].fileName;
            const source = {
              uri,
              type,
              name,
            }
            cloudinaryUpload(source)
          }
        });
      }
  const cloudinaryUpload = (photo) => {
    console.log(photo.uri)
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'kuzeowmj')
    data.append("cloud_name", "drklghmwt")
    fetch("https://api.cloudinary.com/v1_1/drklghmwt/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).then(data => {
          console.log("DATA", data)
        setPhoto(data.secure_url)
      }).catch(err => {
        Alert.alert("An Error Occured While Uploading")
      })
    }
    const onSelectedItemsChange = (selectedItems) => {
      setSelectedItems(selectedItems);
      console.log(selectedItems)
  };

  const getCourse = () => {
    actions.get(`/api/get-streams`).then(res => {
        console.log("STREAMS", res.data)
        setStream(res.data)
    }).catch(err => {
        console.log(err)
    })
  }
  const getTimeTable = () => {
    actions.get(`/api/get-timetable/${user.id}`).then(res => {
        console.log(res.data.classes)
        setTimeTableList(res.data.classes.reverse())
    }).catch(err => {
        console.log(err)
    })
  }

  const handleSubmit = ({stream, image, postedBy}) => {
    console.log(stream, image, postedBy)
    actions.post(`/api/add-timetable`, {stream, image, postedBy}).then(res => {
      // console.log(res.data)
      _panel.hide()
      onRefresh()
      setPhoto('https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg')
      setSelectedItems('')
    }).catch(err => {
      console.log(err)
    })
  }

    const styles = {
      container: {
        flex: 1,
        zIndex: 1,
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: 'flex-end'
      },
      dragHandler: {
        alignSelf: 'stretch',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
      }
  }


    return(

      <View style={styles.container}>
      {timeTableList.length === 0 ? <View>
          <Text>No TimeTable</Text>
      </View> : 
      <FlatList       
          refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          />}
          style={{width: '100%', height:"100%"}}
          data={timeTableList}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => <View style={{padding: 10}}><View style={{
            backgroundColor: 'white', elevation:12, borderRadius:20, padding: 10}}
          >
            <View style={{ justifyContent: 'center', alignSelf: 'center',height: 200, width: 200, padding: 5}}>
              <ImageBackground source ={{uri: item.image}} resizeMode='contain' style={{
                flex:1,
                }}> 
                </ImageBackground>
              </View><View style={{}}><Text h4>{item.stream.streamName}</Text></View></View><View style={{padding: 1, margin: 10, backgroundColor: 'black'}}></View></View>}
            />}
      {user.role === 0 ? 
      null: 
      <View style={{padding: 10}}>
          <Button onPress={() => _panel.show()} title="Add Time Table" />
      </View>}

  <SlidingUpPanel draggableRange={{ top: 600, bottom: 0 }}ref={c => (_panel = c)}>
    {dragHandler => (
      <View style={{backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
      <ScrollView>
      <KeyboardAvoidingView  style={{ padding: 5, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          <View style={{width:"100%"}}>
          <Provider>

          <View style={{
                  flex: 1,
                  marginHorizontal:  5,
                  justifyContent:'center',
                  }}>
              <DropDown
                  label={"Year"}
                  mode={"outlined"}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={year}
                  setValue={setYear}
                  list={yearList}
                  />
              </View>
              <View style={{justifyContent: "center",alignSelf: 'center', width: '90%'}}>
              <MultiSelect
                  single
                  flatListProps={{height: 100, keyboardShouldPersistTaps:'handled'}}
                  items={stream}
                  uniqueKey={stream._id}
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={selectedItems}
                  selectText="Select Stream"
                  searchInputPlaceholderText="Search Stream..."
                  onChangeInput={ (text)=> console.log(text)}
                  altFontFamily="ProximaNova-Light"
                  tagRemoveIconColor="#CCC"
                  textInputProps={{ autoFocus: false }}
                  tagBorderColor="green"
                  tagTextColor="green"
                  selectedItemTextColor="green"
                  selectedItemIconColor="green"
                  itemTextColor="#000"
                  displayKey={`${'streamName'}`}
                  searchInputStyle={{ color: '#CCC' }}
                  submitButtonColor="skyblue"
                  submitButtonText="Submit"
              />
              </View>
              </Provider>
              </View>
                <View style={{height: 200, width: 200}}>
                 <ImageBackground source ={{uri: photo}} resizeMode='contain' style={{
                   flex:1,
                   JustifyContent: 'center',
                   alignItems: 'center',
                   }}> 
                   </ImageBackground>
                </View>
                <View style={{ flexDirection: 'row', justifyContent:'space-around', alignItems: 'center', padding: 20, width:'100%'}}>
                  <View>
                <TouchableOpacity style={{
                   borderColor: "#0275d8",
                   borderWidth: 2,
                   borderRadius: 10,
                   backgroundColor: "#0275d8",
                   elevation: 12
                   }} onPress={selectPhotoTapped}>
                     <Text style={{padding: 10, color:"white"}}>Upload Image</Text>
                   </TouchableOpacity>
                  </View>
                  <View>
               <TouchableOpacity style={{
                   borderColor: "#0275d8",
                   borderWidth: 2,
                   borderRadius: 10,
                   backgroundColor: "#0275d8",
                   elevation: 12
                   }} onPress={() => handleSubmit({stream: selectedItems[0], image: photo,  postedBy: user.id})} >
                   <Text style={{padding: 10, color:"white"}}>Submit</Text>
               </TouchableOpacity>
                  </View>
             </View>    
      </KeyboardAvoidingView >
      </ScrollView>
  </View>


    )}
  </SlidingUpPanel>
  </View>
    )
}

export default TimeTable