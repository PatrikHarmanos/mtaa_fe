import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import MenuScreen from './MenuScreen';
import { DrawerContent } from './DrawerContent';
import AdminHomeScreen from './AdminHomeScreen';
import AdminAddProductScreen from './AdminAddProductScreen';
import CartScreen from './CartScreen'
import CheckoutScreen from './CheckoutScreen';
import ProductDetailScreen from './ProductDetailScreen';
import AdminOrdersScreen from './AdminOrdersScreen';
import OrderDetailScreen from './OrderDetailScreen';
import ProfileScreen from './ProfileScreen';
import AdminChangeOrderStatus from './AdminChangeOrderStatus';
import AdminDeleteProductScreen from './AdminDeleteProductScreen';

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
            <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{
                title: ''
            }} />
            <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} options={{
                title: ''
            }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{
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
            <Stack.Screen name="AdminOrdersScreen" component={AdminOrdersScreen} options={{
                title: ''
            }} />
            <Stack.Screen name="AdminChangeOrderStatus" component={AdminChangeOrderStatus} options={{
                title: ''
            }} />
            <Stack.Screen name="AdminDeleteProductScreen" component={AdminDeleteProductScreen} options={{
                title: ''
            }} />
    </Stack.Navigator>
);

const CartScreenStack = ({navigation}) => (
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
            <Stack.Screen name="CartScreen" component={CartScreen} options={{
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor="#fff" color="#000" onPress={() => navigation.openDrawer()}></Icon.Button>
                ),
                title: ''
            }} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{
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
            <Drawer.Screen name="CartScreenStack" component={CartScreenStack} 
                options={{
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;