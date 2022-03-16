import React, {useState} from "react";
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


const HomeScreen = ({navigation}) => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordAgain, setUserPasswordAgain] = useState('');

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

    // fetch('http://localhost:3000/api/account/register', {
    //   method: 'POST',
    //   body: JSON.stringify(dataToSend),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })
    //   .then((response) => response.json())
    //   .then ((responseJson) => {
    //       console.log(responseJson);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    navigation.navigate("LoginScreen");
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
export default HomeScreen;

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