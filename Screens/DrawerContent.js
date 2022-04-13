import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {
    Title,
    Caption,
    Drawer
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import Context from '../store/context';

export function DrawerContent(props, route) {

    // function for log out, we need to delete access token and refresh token
    const deleteToken = async () => {
        try {
            // delete access token
            await SecureStore.deleteItemAsync('access');
            await SecureStore.deleteItemAsync('refresh');

            // navigate to splash screen
            props.navigation.navigate("SplashScreen");
        } catch(error) {
          console.log(error);
        }
    }

    // globalny state
    const {state} = useContext(Context)
    
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>{state.first_name} {state.last_name}</Title>
                            <Caption style={styles.caption}>{state.email}</Caption>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                      <DrawerItem 
                          icon={({color, size}) => (
                              <Icon 
                                  name='home-outline'
                                  color={color}
                                  size={size}
                              />
                          )}
                          isEnabled={false}
                          label="Domov"
                          onPress={() => {props.navigation.navigate("HomeScreen")}}
                      />
                      <DrawerItem 
                          icon={({color, size}) => (
                              <Icon 
                                  name='food'
                                  color={color}
                                  size={size}
                              />
                          )}
                          isEnabled={false}
                          label="Menu"
                          onPress={() => {props.navigation.navigate("MenuScreen")}}
                      />
                      <DrawerItem 
                          icon={({color, size}) => (
                              <Icon 
                                  name='cart-outline'
                                  color={color}
                                  size={size}
                              />
                          )}
                          isEnabled={false}
                          label="Košík"
                          onPress={() => {props.navigation.navigate("CartScreenStack", { screen: "CartScreen" })}}
                      />
                      { state.is_admin ? (
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                    name='account-lock-outline'
                                    color={color}
                                    size={size}
                                />
                            )}
                            isEnabled={false}
                            label="Admin"
                            onPress={() => {props.navigation.navigate('AdminScreenStack', { screen: 'AdminHomeScreen' })}}
                        />
                      ) : null}
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                            name='exit-to-app'
                            color={color}
                            size={size}
                        />
                    )}
                    label="Odhlásiť sa"
                    onPress={deleteToken}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      paddingBottom: 15,
      borderBottomColor: '#f4f4f4',
      borderBottomWidth: 1
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 5,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    changeToCourier: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20
    },
    changeToCourierText: {
        fontSize: 18,
        color: '#b5b5b5',
        fontWeight: 'bold'
    },
    courierAppText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'green',
        marginTop: 5
    },
    tinyLogo: {
        width: 50,
        height: 50,
    }
  });