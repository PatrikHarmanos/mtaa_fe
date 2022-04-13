import React, {useState, useContext} from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Button,
  Dimensions,
  Platform
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Context from "../store/context"

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const {state, actions} = useContext(Context);

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value)
  }

  const handleRegisterButton = () => {
    if (!userEmail) {
      alert('Prosím zadajte e-mail');
      return;
    }
    if (!userPassword) {
      alert('Prosím zadajte heslo');
      return;
    }

    var dataToSend = {
      email: userEmail,
      password: userPassword
    }
    console.log(process.env.SERVER_URL)

    fetch(`http://localhost:3000/api/account/login`, {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
        if (response.status === 401 || response.status === 404) {
          alert('Nespravne heslo');
        }
      })
      .then ((responseJson) => {
        console.log(responseJson)
        if (responseJson) {
          save('access' , responseJson.accessToken)
          save('refresh', responseJson.refreshToken)
          actions({type: 'setState', payload: {...state, 
            first_name: responseJson.first_name,
            last_name: responseJson.last_name,
            email: responseJson.email,
            id: responseJson.id,
            is_admin: responseJson.is_admin
          }})
          navigation.navigate("DrawerNavigation");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Prihlásenie</Text>
        <ScrollView>
            <Text style={[styles.text_footer, {marginTop: 30}]}>E-mail</Text>
            <View style={styles.action}>
                <TextInput style={styles.textInput}
                    onChangeText={(Email) => setUserEmail(Email)}
                    placeholder="Zadajte email"
                /> 
            </View>
            <Text style={styles.text_footer}>Heslo</Text>
            <View style={styles.action}>
                <TextInput style={styles.textInput}
                    onChangeText={(password) => setUserPassword(password)}
                    placeholder="Zadajte heslo"
                    secureTextEntry={true}
                /> 
            </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.button}>
        <TouchableOpacity onPress={handleRegisterButton} style={styles.signIn}>
            <Text style={styles.textSign}>Prihlásiť sa</Text>
        </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    paddingTop: 70,
    flex: 4,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40
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
    fontSize: 18,
    marginLeft: 20
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#777',
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
  signIn: {
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  textSign: {
    color: '#5B84B1FF',
    fontWeight: 'bold',
    fontSize: 20
  }
});