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
        <View style={styles.kon}>
            <Text style={styles.text}>{state}</Text>
            <Text style={{marginTop: 20}}>{city}</Text>
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
  kon: {
      backgroundColor: '#5B84B1FF',
      margin: 20,
      padding: 40,
      borderWidth: 4,
      borderColor: 'pink',
      borderRadius: 50,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  text: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold'
  }
});