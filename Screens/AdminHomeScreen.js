import React, {useState, useEffect, useRef} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView, 
  RecyclerViewBackedScrollView
} from 'react-native';
import RoomScreen from './WEBRTC/RoomScreen'
import CallScreen from './WEBRTC/CallScreen';
import JoinScreen from './WEBRTC/JoinScreen';

const AdminHomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.textHeading}>Administrátorska časť</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("AdminOrdersScreen")} style={styles.signIn}>
            <Text style={styles.textSign}>Všetky objednávky</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("AdminAddProductScreen")} style={styles.signIn}>
              <Text style={styles.textSign}>Pridať produkt</Text>
          </TouchableOpacity>
        </View>
    </View>
  );

  // const screens = {
  //   ROOM: 'JOIN_ROOM',
  //   CALL: 'CALL',
  //   JOIN: 'JOIN',
  // }

  // const [screen, setScreen] = useState(screens.ROOM);
  // const [roomId, setRoomId] = useState('');

  // let content;

  // switch (screen) {
  //   case screens.ROOM:
  //     content = <RoomScreen roomId={roomId} setRoomId={setRoomId} screens={screens} setScreen={setScreen} />
  //     break;

  //   case screens.CALL:
  //     content = <CallScreen roomId={roomId} screens={screens} setScreen={setScreen} />
  //     break;

  //   case screens.JOIN:
  //     content = <JoinScreen roomId={roomId} screens={screens} setScreen={setScreen} />
  //     break;

  //   default:
  //     content = <Text>Wrong Screen</Text>
  // }

  // return (
  //   <SafeAreaView style={styles.container} >
  //     {content}
  //   </SafeAreaView>
  // )
};
export default AdminHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  button: {
    alignItems: 'center',
    marginTop: 40
  },
  textHeading: {
    color: '#5B84B1FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10
  },
  signIn: {
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#5B84B1FF'
  },
  textSign: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  }
});