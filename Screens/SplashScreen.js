import React from 'react';
import {
    View, 
    Text,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';


const SplashScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>FastDelivery</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={() => navigation.navigate("LoginScreen")}>
                        <Text style={styles.textSign}>Prihlásiť sa</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={() => navigation.navigate("CreateAccountScreen")}>
                        <Text style={styles.textSign}>Vytvoriť účet</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5B84B1FF'
    },
    header: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    heading: {
        color: '#fff',
        fontSize: 55,
        fontWeight: '200'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
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
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
});