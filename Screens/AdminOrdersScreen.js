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
import Moment from 'moment';
import { FAB } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

const AdminOrdersScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  Moment.locale('en');

  const onRefresh = () => {
    setIsFetching(true);
  }

  useEffect(() => {
    try {
      SecureStore.getItemAsync('access').then((token) => {
        if (token != null) {
          fetch(`http://localhost:3000/api/orders/get_orders`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            }
          })
            .then((response) => response.json())
            .then ((responseJson) => {
              setData(responseJson)
              setIsFetching(false)
            })
        } else {
          navigation.navigate("SplashScreen")
        }
      })
    } catch(error) {
      console.log(error);
    }
  }, [isFetching])
  
  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Všetky objednávky</Text>
      { data.length === 0 ? 
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.noData}>
            Neboli vytvorené žiadne objednávky.
          </Text>
        </View> : (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          onRefresh={() => onRefresh()}
          refreshing={isFetching}
          renderItem={({ item }) => 
            <TouchableOpacity onPress={() => console.log('touched')} style={styles.item}> 
              <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={{ color: '#006902', fontSize: 12, fontWeight: 'bold', marginBottom: 2}}>
                  { Moment(item.created_at).format('DD.MM.YYYY') }
                </Text>
              </View>
              <Text style={styles.orderTitle}>
                {item.address}, {item.city}
              </Text>
              <Text style={styles.orderSubTitle}>
                {item.total_price} €
              </Text>
            </TouchableOpacity>
          }
        /> )}
    </View>
  );
};
export default AdminOrdersScreen;

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