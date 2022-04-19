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
    // let value;  // premenna pre stav
    const [new_state, setNewState] = useState();

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

    
    const handleChangeButton = () => {
        
        if (new_state === 2){
            var dataToSend = {
                new_state: 'v preprave'
            }
        }
        else if (new_state === 3){
            var dataToSend = {
                new_state: 'doručená'
            }
        }
        

        console.log("before fetch")
        console.log(id)
        console.log('new state')
        console.log(new_state)
        console.log('old state')
        console.log(state)

        if (!new_state){
            alert('Je potrebné vybrať nový stav na vykonanie zmeny!')
        }
        else if (state === 'doručená' && new_state === 2){
            alert('Objednávka už bola doručená!')
        }
        else{
            try {
            SecureStore.getItemAsync('access').then((token) => {
              if (token !== null) {
                console.log(JSON.stringify(dataToSend))
                fetch(`http://147.175.162.212:3000/api/orders/change_status/${id}`, {
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
                        alert('Stav objednávky bol zmenený')
                        navigation.navigate("AdminScreenStack", {screen: "AdminOrdersScreen"})
                        return response.json()
                    }
                    if (response.status === 400){
                        alert('Nie je možné zmeniť stav! Objednávka už má zvolený stav')
                        navigation.navigate("AdminScreenStack", {screen: "AdminOrdersScreen"})
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
                <Text style={styles.textHeading}>Detail objednávky</Text>
                <Text style={{marginLeft: 20, color: '#006902', marginBottom: 20, fontWeight: 'bold'}}>ID {id} // { Moment(created_at).format('DD.MM.YYYY') }</Text>
                
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
            <View style={{marginTop: 20}}>
              <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={pickerStyle}
                    onValueChange={(value) => {setNewState(value)}}
                    placeholder={{ label: "Vyberte nový stav", value: null }}
                    items={[
                        {'label': 'v preprave', 'value': 2}, 
                        {'label': 'doručená', 'value': 3}
                    ]}
            />
            </View>
            <View style={styles.footer}>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={handleChangeButton}>
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
