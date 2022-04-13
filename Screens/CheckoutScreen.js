import React, {useState, useEffect, useContext} from "react";
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
  Platform,
  FlatList
} from 'react-native';
import Moment from 'moment';
import { FAB } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import Context from '../store/context';

const CheckoutScreen = ({navigation}) => {

  const [address, setAddress] = useState()
  const [city, setCity] = useState()
  const [postalCode, setPostalCode] = useState()
  const [number, setNumber] = useState()

  const {state, actions} = useContext(Context)

  const finishOrder = () => {
    if (!address) {
      alert('Prosím zadajte adresu');
      return;
    }
    if (!city) {
      alert('Prosím zadajte mesto');
      return;
    }
    if (!postalCode) {
      alert('Prosím zadajte PSČ');
      return;
    }
    if (!number) {
      alert('Prosím zadajte telefónne číslo');
      return;
    }

    const products = []
    const quantity = []
    state.cart.map((product) => {
      products.push(product.id)
      quantity.push(product.quantity)
    })
    
    const dataToSend = {
      address: address,
      city: city,
      postal_code: postalCode,
      phone_number: number,
      total_price: state.finalPrice,
      products: products,
      quantity: quantity
    }

    actions({type: 'setState', payload: {...state, 
      cart: [],
      finalPrice: 0
    }})

    try {
      SecureStore.getItemAsync('access').then((token) => {
        if (token !== null) {
          console.log(JSON.stringify(dataToSend))
          fetch(`http://localhost:3000/api/orders/create_order`, {
              method: "POST",
              body: JSON.stringify(dataToSend),
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
              }
          })
          .then((response) => {
              console.log(response.status)
              if (response.status === 201) {
                  return response.json()
              }
          })
          .then ((responseJson) => {
              console.log(responseJson)
              navigation.navigate("UserScreenStack", {screen: "HomeSceen"})
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
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Dokončenie objednávky</Text>
      <ScrollView>
        <Text style={[styles.text_footer, {marginTop: 30}]}>Adresa</Text>
        <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(value) => setAddress(value)}
                placeholder="Zadajte adresu"
            /> 
        </View>
        <Text style={[styles.text_footer]}>Mesto</Text>
        <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(value) => setCity(value)}
                placeholder="Zadajte mesto"
            /> 
        </View>
        <Text style={[styles.text_footer]}>PSČ</Text>
        <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(value) => setPostalCode(value)}
                placeholder="Zadajte PSČ"
            /> 
        </View>
        <Text style={[styles.text_footer]}>Telefónne číslo</Text>
        <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(value) => setNumber(value)}
                placeholder="Zadajte telefónne číslo"
            /> 
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text style={[styles.text_footer]}>Cena spolu: </Text>
          <Text style={{color: 'green', fontWeight: 'bold', fontSize: 18, marginLeft: 5}}>{parseFloat(state.finalPrice).toFixed(2)} €</Text>
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        large
        label="Objednať"
        icon="credit-card-outline"
        onPress={finishOrder}
      />
    </View>
  );
};
export default CheckoutScreen;

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
  textHeading: {
    color: '#5B84B1FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10
  },
  fab: {
    position: 'absolute',
    margin: 10,
    right: 30,
    bottom: 40,
    backgroundColor: '#5B84B1FF'
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
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,  
    marginVertical: 8,
    marginHorizontal: 8,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1
  },
  orderTitle: {
    fontSize: 21,
    marginBottom: 4,
    color: '#000',
    fontWeight: 'bold'
  },
  orderSubTitle: {
    fontSize: 16,
    color: '#5B84B1FF',
    fontWeight: 'bold'
  },
  noData: {
    fontSize: 14,
    color: '#777',
    marginTop: 10
  }
});