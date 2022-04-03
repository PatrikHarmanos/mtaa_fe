import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import { DrawerContent } from './DrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const UserScreenStack = ({navigation}) => (
    <Stack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#fff',
        shadowColor: '#fff', // ios (header bottom line)
        elevation: 0 // android 
        },
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor="#fff" color="#000" onPress={() => navigation.openDrawer()}></Icon.Button>
                ),
                title: ''
            }} />
    </Stack.Navigator>
);



const DrawerNavigation = (props) => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="UserScreenStack" component={UserScreenStack} 
                options={{
                    headerShown: false,
                }}/>
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;