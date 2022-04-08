import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import MenuScreen from './MenuScreen';
import { DrawerContent } from './DrawerContent';
import AdminHomeScreen from './AdminHomeScreen';
import AdminAddProductScreen from './AdminAddProductScreen';
import OrderDetailScreen from './OrderDetailScreen';

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
            <Stack.Screen name="MenuScreen" component={MenuScreen} options={{
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor="#fff" color="#000" onPress={() => navigation.openDrawer()}></Icon.Button>
                ),
                title: ''
            }} />
            <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} options={{
                title: ''
            }} />
    </Stack.Navigator>
);

const AdminScreenStack = ({navigation}) => (
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
            <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} options={{
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor="#fff" color="#000" onPress={() => navigation.openDrawer()}></Icon.Button>
                ),
                title: ''
            }} />
            <Stack.Screen name="AdminAddProductScreen" component={AdminAddProductScreen} options={{
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
                }}
            />
            <Drawer.Screen name="AdminScreenStack" component={AdminScreenStack} 
                options={{
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;