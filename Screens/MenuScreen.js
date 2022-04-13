import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  TouchableOpacity
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

const MenuScreen = ({navigation}) => {

  const [DATA, setDATA] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const onRefresh = () => {
    setIsFetching(true);
  }

  useEffect(() => {
    try {
      SecureStore.getItemAsync('access').then((token) => {
        if (token != null) {
          fetch(`http://localhost:3000/api/products/get_products`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            }
          })
            .then((response) => response.json())
            .then ((responseJson) => {
              console.log(responseJson)
              setDATA(responseJson)
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
  
  const openProductDetail = (item) => {
    navigation.navigate("ProductDetailScreen", {
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      is_gluten_free: item.is_gluten_free
    })
  }

  const Item = ({ item }) => (
    <TouchableOpacity onPress={() => openProductDetail(item)} style={styles.item}>
      <View>
        <Text style={styles.orderTitle}>{item.name}</Text>
        <Text style={styles.orderSubTitle}>{item.description}</Text>
      </View>
      <Text style={styles.orderSubTitle}>{item.price} €</Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Aktuálna ponuka</Text>
      <SectionList
        onRefresh={() => onRefresh()}
        refreshing={isFetching}
        sections={DATA}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => <Item item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.categoryText}>{title}</Text>
        )}
      />
    </View>
  );
};
export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textHeading: {
    color: '#5B84B1FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,  
    marginVertical: 8,
    marginHorizontal: 8,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  categoryText: {
    marginLeft: 20,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#006902',
    fontSize: 25
  }
});