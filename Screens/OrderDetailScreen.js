import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  FlatList
} from 'react-native';
import Moment from 'moment';

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

  const reformatProducts = (products, quantity) => {
    let items = []
    i = 0
      products.map(product => {
        items.push({
          'id': i,
          'name': product,
          'quantity': quantity[i]
        })
        i++
      })

    return items;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Detail objednávky</Text>
      <Text style={{marginLeft: 20, color: '#006902', marginBottom: 20, fontWeight: 'bold'}}>
          ID {id} // { Moment(created_at).format('DD.MM.YYYY') }</Text>
        <View style={styles.popis}>
            <Text style={styles.information}>Doručenie</Text>
            <Text style={[styles.infElement, {marginTop: 5}]}>{city}</Text>
            <Text style={styles.infElement}>{address}</Text>
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
          <Text style={[styles.information, {marginBottom: 10}]}>Produkty</Text>
          <View style={{marginLeft: 30}}>
            
            <FlatList
            data={reformatProducts(products, quantity)}
            keyExtractor={item => item.id}
            renderItem={({item}) => 
              <View styles={styles.popis}>
                <Text styles={styles.infElement}>
                  {item.name} {item.quantity}
                </Text>
              </View>
            }
          />
          </View>
        </View>
        <View style={styles.footer}>
                <View style={styles.button}>
                  <TouchableOpacity style={styles.signIn} >
                        <Text style={styles.textSign}>Zavolať kuriérovi</Text>
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
  textHeading: {
    color: '#5B84B1FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5
  },
  information: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000000'
  },
  infElement: {
    marginLeft: 30,
  },
  popis: {
    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10
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