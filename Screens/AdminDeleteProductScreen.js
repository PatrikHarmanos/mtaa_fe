import React, { useState, useEffect } from 'react';
import { 
    StyleSheet,
    Button, 
    Image, 
    View, 
    Platform, 
    Text, 
    ScrollView, 
    TextInput,
    TouchableOpacity
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

const AdminDeleteProductScreen = ({navigation}) => {
    const [delete_id, setId] = useState();

    const handleRegisterButton = () => {
        try {
            SecureStore.getItemAsync('access').then((token) => {
                if (token !== null) {
                    fetch(`http://147.175.162.212:3000/api/products/delete_product/${delete_id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + token
                        },
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            alert('Produkt bol zmazaný.')
                            return response.json()
                        }
                        if (response.status === 404) {
                            alert('Produkt so zadaným ID neexistuje.')
                            return response.json()
                        }
                    })
                    .then ((responseJson) => {
                        console.log(responseJson)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                } else {
                    navigation.navigate("SplashScreen")
                }
            })
        } catch(error) {
            console.log(error);
        }
        navigation.navigate("AdminHomeScreen")
    };

    return (
        <View style={styles.container}>
                <Text style={styles.textHeading}>Odstrániť produkt</Text>
                <Text style={[styles.text_footer, {marginTop: 30}]}>ID produktu</Text>
                <View style={styles.action}>
                    <TextInput style={styles.textInput}
                        onChangeText={(delete_id) => setId(delete_id)}
                        placeholder="Zadajte id produktu na vymazanie"
                    /> 
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleRegisterButton} style={styles.signIn}>
                        <Text style={styles.textSign}>Odstrániť produkt</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
};
export default AdminDeleteProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  textHeading: {
    color: '#5B84B1FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10
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
    backgroundColor: '#5B84B1FF'
  },
  textSign: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  }
});

