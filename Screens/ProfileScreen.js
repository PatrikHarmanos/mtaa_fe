import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Context from "../store/context"

const ProfileScreen = (props) => {
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordDup, setUserPasswordDup] = useState('');

    const {state} = useContext(Context)
  
    async function save(key, value) {
      await SecureStore.setItemAsync(key, value)
    }
  
    const handleUpdateButton = () => {
      if (!userPassword) {
        alert('Prosím zadajte heslo');
        return;
      }
      if (!userPasswordDup) {
        alert('Prosím zadajte heslo znovu');
        return;
      }
      if (userPassword != userPasswordDup) {
          alert('Zadane hesla sa nezhoduju');
          return;
      }
  
      var dataToSend = {
        password: userPasswordDup
      }
  
      fetch('http://10.10.10.27:3000/api/account/update', {
        method: 'PUT',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          if (response.status === 200) {
            alert('Heslo bolo zmenene')
          }
          if (response.status === 401 || response.status === 404) {
            alert('Nespravne heslo');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>{state.first_name} {state.last_name}</Text>  
                <Text style={styles.info}>{state.email}</Text>
            </View>
            <View style={styles.body}>
                <Text style={[styles.text_footer]}>Heslo</Text>
                <View style={styles.action}>
                    <TextInput style={styles.textInput}
                        onChangeText={(password_new) => setUserPassword(password_new)}   // treba zmenit
                        placeholder="Zadajte nové heslo"
                        secureTextEntry={true}/> 
                </View>
                <Text style={styles.text_footer}>Nové heslo</Text>
                <View style={styles.action}>
                    <TextInput style={styles.textInput}
                        onChangeText={(password) => setUserPasswordDup(password)}
                        placeholder="Zadajte heslo znova"
                        secureTextEntry={true}/>             
                </View>
                <TouchableOpacity onPress={handleUpdateButton} style={styles.buttonContainer}>
                        <Text style={{fontWeight:'bold', color:'#FFFFFF'}}>Zmeniť heslo</Text>  
                    </TouchableOpacity>  
            </View>
        </View>
        );
    };
export default ProfileScreen;

const styles = StyleSheet.create({
  header:{  // ok
    backgroundColor: "#FFFFFF",
    height:180,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30
  },
  body:{ // ok
    alignItems: 'center'
  },
  name:{    // ok
    fontSize:28,
    color: "#5B84B1FF",
    fontWeight: "bold",
    textTransform: 'uppercase'
  },
  info:{    // ok
    fontSize:16,
    color: "#5B84B1FF",
    marginTop:10
  },
  buttonContainer: { // ok
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#5B84B1FF",
  },
  textInput: { // ok
    flex: 1,
    marginVertical: 12,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 16
  },
  container: {  // ok
    flex: 1,
    backgroundColor: '#fff'
  },
  text_footer: { // ok
    color: '#05375a',
    fontSize: 18
  },
  action: { // ok
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#5B84B1FF',
    borderWidth: 1
  },
});