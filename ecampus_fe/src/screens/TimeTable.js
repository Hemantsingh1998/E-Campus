import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { Text } from "react-native-elements";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import actions from '../api/actions'
import ImgToBase64 from 'react-native-image-base64';
const TimeTable = ({navigation}) => {

    const user = navigation.getParam('user')
    const [photo, setPhoto] = useState('https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg');

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
            // console.log("SOURCE" ,source)
            cloudinaryUpload(source)
            // ImageResizer.createResizedImage(uri, 720, 720, "JPEG", 100, 0)
            // .then(response => {
            //     ImgToBase64.getBase64String(response.uri)
            //         .then(base64String => {
            //         actions.post('/api/upload-timetable-image', {image: base64String}).then(res => {
            //             console.log(res)
            //         }).catch(err => {
            //             console.log(err)
            //         })
            //     })
            //     .catch(err => console.log(err));
            // })
            // .catch(err => {
            //     console.log(err)
            // });
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
    return(
        <View>
        <View style={styles.imageContainer}>
        <Image source={{ uri: photo }} style={styles.backgroundImage}/>
        </View>
        <View style={styles.uploadContainer}>
          <Text style={styles.uploadContainerTitle}>ImagePicker to Cloudinary</Text>
          <TouchableOpacity onPress={selectPhotoTapped} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>
  
      </View >
    )
}

const styles = StyleSheet.create({
    imageContainer: {
      backgroundColor: '#fe5b29',
      height: Dimensions.get('window').height
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    uploadContainer: {
      backgroundColor: '#f6f5f8',
      borderTopLeftRadius: 45,
      borderTopRightRadius: 45,
      position: 'absolute',
      bottom: 0,
      width: Dimensions.get('window').width,
      height: 200,
    },
    uploadContainerTitle: {
      alignSelf: 'center',
      fontSize: 25,
      margin: 20,
      fontFamily: 'Roboto'
    },
    uploadButton: {
      borderRadius: 16,
      alignSelf: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 7,
        height: 5,
      },
      shadowOpacity: 1.58,
      shadowRadius: 9,
      elevation: 4,
      margin: 10,
      padding: 10,
      backgroundColor: '#fe5b29',
      width: Dimensions.get('window').width - 60,
      alignItems: 'center'
    },
    uploadButtonText: {
      color: '#f6f5f8',
      fontSize: 20,
      fontFamily: 'Roboto'
    }
  });

export default TimeTable