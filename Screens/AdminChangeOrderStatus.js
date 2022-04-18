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
    TouchableOpacity,
    FlatList
} from 'react-native';
import Moment from 'moment';
import * as SecureStore from 'expo-secure-store';
import RNPickerSelect from 'react-native-picker-select';

const AdminChangeOrderStatus = ({navigation, route}) => {
    let value = 'v preprave'

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

    const [stateOptions, setState] = useState([{label: '', value: ''}]);

    const handleChangeButton = (chosen_state) => {
        var dataToSend = {
            new_state: chosen_state
        }

        console.log("changed")
        console.log(id)

        try {
            SecureStore.getItemAsync('access').then((token) => {
              if (token !== null) {
                console.log(JSON.stringify(dataToSend))
                fetch(`http://10.10.37.143:3000/api/orders/change_state/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(dataToSend),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then((response) => {
                    console.log(response.status)
                    if (response.status === 200) {
                        return response.json()
                    }
                })
                .then ((responseJson) => {
                    console.log(responseJson)
                    navigation.navigate("AdminScreenStack", {screen: "AdminHomeSceen"})
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
    };

    const reformatProducts = (products, quantity) => {
        let items = []
        let i = 0
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
            <ScrollView>
                <Text style={styles.textHeading}>Detail objednávky</Text>
                <Text style={{marginLeft: 20, color: '#006902', marginBottom: 20}}>ID {id} // { Moment(created_at).format('DD.MM.YYYY') }</Text>
                
                <Text style={{fontWeight: 'bold'}}>Zákazník
                    <Text style={{fontWeight: 'normal'}}> {user_id}</Text>
                </Text>
                <Text style={{fontWeight: 'bold'}}>Adresa
                    <Text style={{fontWeight: 'normal'}}> {address} {city} {postal_code}</Text>
                </Text>
                <Text style={{fontWeight: 'bold'}}>Kontakt
                    <Text style={{fontWeight: 'normal'}}> {phone_number}</Text>
                </Text>
                <Text style={{fontWeight: 'bold'}}>Cena:
                    <Text style={{fontWeight: 'normal'}}> {total_price}€</Text>
                </Text>
                <Text style={{fontWeight: 'bold'}}>Stav:
                    <Text style={{fontWeight: 'normal'}}> {state}</Text>
                </Text>
                <Text style={{fontWeight: 'bold', paddingTop: 20}}>Objednané produkty:</Text>
            <View style={{marginLeft: 20}}><FlatList
                data={reformatProducts(products, quantity)}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Text>{item.name} {item.quantity}</Text>}
            /></View>
            <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={pickerStyle}
                    onValueChange={(value) => {setState(value), console.log(value)}}
                    placeholder={{ label: "Vyberte stav", value: null }}
                    items={[
                        {'label': 'v preprave', 'value': 2}, 
                        {'label': 'doručená', 'value': 3}
                    ]}
                />
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={() => {handleChangeButton(value)}}>
                        <Text style={styles.textSign}>Zmeniť stav objednávky</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={() => {console.log("volam")}}>
                        <Text style={styles.textSign}>Zavolať zákazníkovi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default AdminChangeOrderStatus;

const styles = StyleSheet.create({
  textSign: {
    color: '#5B84B1FF',
    fontWeight: 'bold',
    fontSize: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 30
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
  textHeading: {
    color: '#5B84B1FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5
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

const pickerStyle = {
	inputIOS: {
		flexDirection: 'row',
        marginTop: 5,
        marginBottom: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#777',
        borderWidth: 1,
        fontSize: 16
	},
	inputAndroid: {
		flexDirection: 'row',
        marginTop: 5,
        marginBottom: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#777',
        borderWidth: 1,
        fontSize: 16
	},
	placeholderColor: 'white',
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	}
};
