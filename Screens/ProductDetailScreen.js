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
import NumericInput from 'react-native-numeric-input'
import Context from '../store/context';

const ProductDetailScreen = ({navigation, route}) => {

    const { id, name, price } = route.params
    const [quantity, setQuantity] = useState(0)
    const {state} = useContext(Context)

    const addToCart = () => {
        const product = {
            id: id,
            name: name, 
            price: price,
            quantity: quantity
        }
        state.cart.push(product)
        state.finalPrice += product.price * product.quantity

        console.log(state.cart)

        navigation.navigate("MenuScreen")
    }
  
    return (
        <View style={styles.container}>
        <Text style={styles.textHeading}>Detail produktu</Text>
        <Text>{name}</Text>
        <Text>{price} eur</Text>
        <NumericInput onChange={value => setQuantity(value)} minValue={1} />
        <FAB
            disabled={quantity === 0 ? true : false}
            style={styles.fab}
            large
            label="Pridať do košíka"
            icon="plus"
            onPress={addToCart}
        />
        </View>
    );
};
export default ProductDetailScreen;

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