import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

export default class Profile extends Component {

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>JOHN DOE</Text>
                <Text style={styles.info}>UX Designer / Mobile developer</Text>
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
                        onChangeText={(password) => setUserPassword2(password)}
                        placeholder="Zadajte heslo znova."
                        secureTextEntry={true}/>             
                </View>
                <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={{fontWeight:'bold', color:'#FFFFFF'}}>Zmeniť heslo</Text>  
                    </TouchableOpacity>  
            </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  header:{  //ostane
    backgroundColor: "#FFFFFF",
    height:180,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30
  },
  body:{
    alignItems: 'center'
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{    //ostane
    fontSize:28,
    color: "#5B84B1FF",
    fontWeight: "bold"
  },
  info:{    //ostane
    fontSize:16,
    color: "#5B84B1FF",
    marginTop:10
  },
  buttonContainer: {
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
  textInput: {
    flex: 1,
    marginVertical: 12,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 16
  },
  container: {  // ostane
    flex: 1,
    backgroundColor: '#fff'
  },
  footer: {
    flex: 1,
    backgroundColor: '#5B84B1FF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#5B84B1FF',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: { // ostava
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#5B84B1FF',
    borderWidth: 1
  },
  textInput: {
    flex: 1,
    marginVertical: 12,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 16
  },
  button: {
    alignItems: 'center',
    marginTop: 40
  },
  textSign: {
    color: '#5B84B1FF',
    fontWeight: 'bold',
    fontSize: 20
  }
});
