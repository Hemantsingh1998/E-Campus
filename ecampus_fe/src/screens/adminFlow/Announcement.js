
import React from 'react'
import {View, TouchableOpacity, ScrollView} from 'react-native'
import { Text } from 'react-native-elements'
import SlidingUpPanel from 'rn-sliding-up-panel'

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
    backgroundColor: '#ccc'
  }
}

const Announcement = ({navigation}) => {

    const user = navigation.getParam('user')

    return (
        <View style={styles.container}>
        <TouchableOpacity  onPress={() => _panel.show()}>
          <View>
            <Text>Make Announcement</Text>
          </View>
        </TouchableOpacity>
        <SlidingUpPanel draggableRange={{ top: 200, bottom: 0 }}ref={c => (_panel = c)}>
          {dragHandler => (
            <View style={styles.container}>
              <View style={styles.dragHandler} {...dragHandler}>
                <Text>Drag handler</Text>
              </View>
              <ScrollView>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
              </ScrollView>
            </View>
          )}
        </SlidingUpPanel>
      </View>
    )
}

export default Announcement