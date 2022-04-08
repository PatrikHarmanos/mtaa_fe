import React, {useState, useEffect} from "react";
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
import { add } from "react-native-reanimated";

const OrderDetailScreen = ({navigation, route}) => {
    
  const {
    id,
    address,
    city,
    postal_code,
    phone_number,
    total_price,
    user_id,
    state,
    products,
    quantity,
    created_at,
  } = route.params;
  return (
    <View style={styles.container}>
        <View style={styles.nadpis}>
            <Text style={styles.nadpisText}>Objednávka {id}</Text>
        </View>
        <View style={styles.popis}>
            <Text style={styles.information}>Doručenie</Text>
            <Text style={[styles.infElement, {marginTop: 5}]}>{city} {address}</Text>
            <Text style={styles.infElement}>{postal_code}</Text>
            <Text style={[styles.infElement, {marginBottom: 5}]}>{phone_number}</Text>
        </View>
        <View style={styles.popis}>
          <Text style={styles.information}>Stav objednávky</Text>
            <Text style={[styles.infElement, {marginVertical: 5}]}>{state}</Text>
        </View>
        <View style={styles.popis}>
          <Text style={styles.information}>Celková suma</Text>
            <Text style={[styles.infElement, {marginVertical: 5}]}>{total_price}€</Text>
        </View>
        <View style={styles.popis}>
          <Text style={styles.information}>Produkty</Text>
        </View>

        <View style={styles.footer}>
                <View style={styles.button}>
                  <TouchableOpacity style={styles.signIn} >
                        <Text style={styles.textSign}>Zavolať kuriérovi</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} >
                        <Text style={styles.textSign}>Zrušiť objednávku</Text>
                    </TouchableOpacity>
                </View>
            </View>
    </View>
  );
};
export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  nadpisText: {
    color: '#5B84B1FF',
    fontSize: 25,
    fontWeight: 'bold'
  },
  nadpis: {
    margin: 15,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  information: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#456991'
  },
  infElement: {
    marginLeft: 30,
    color: '#5B84B1FF'
  },
  popis: {
    marginHorizontal: 30,
    marginTop: 5,
    display: 'flex',
    flexDirection: 'column'
  },
  signIn: {
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textSign: {
    color: '#5B84B1FF',
    fontWeight: 'bold',
    fontSize: 17
  },
  footer: {
    flex: 1,
    backgroundColor: '#5B84B1FF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30
},
});