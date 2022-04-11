import React, {useState, useEffect, useRef} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const AdminHomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.textHeading}>Administrátorska časť</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("AdminOrdersScreen")} style={styles.signIn}>
            <Text style={styles.textSign}>Všetky objednávky</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("AdminAddProductScreen")} style={styles.signIn}>
              <Text style={styles.textSign}>Pridať produkt</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};
export default AdminHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  button: {
    alignItems: 'center',
    marginTop: 40
  },
  textHeading: {
    color: '#5B84B1FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10
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