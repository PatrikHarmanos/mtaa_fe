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
    TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import * as SecureStore from 'expo-secure-store';

const AdminAddProductScreen = ({navigation}) => {

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [image, setImage] = useState(null);
    const [categoriesOptions, setCategoriesOptions] = useState([{label: '', value: ''}]);
    const [glutenFree, setGlutenFree] = useState();

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
        try {
            SecureStore.getItemAsync('access').then((token) => {
              if (token != null) {
                fetch('http://10.10.37.143:3000/api/products/get_categories', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                  }
                })
                  .then((response) => response.json())
                  .then ((responseJson) => {
                      console.log(responseJson)
                      setCategoriesOptions(responseJson)
                  })
              } else {
                navigation.navigate("SplashScreen")
              }
            })
          } catch(error) {
            console.log(error);
          }
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const handleRegisterButton = () => {
    
        let formData = new FormData();
        formData.append('image', {
            uri : image,
            type: 'image',
            name: 'siltovka'
        });
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("is_gluten_free", glutenFree);
        formData.append("category_id", category)

        try {
            SecureStore.getItemAsync('access').then((token) => {
                if (token !== null) {
                    fetch('http://10.10.37.143:3000/api/products/add_product', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + token
                        },
                    })
                    .then((response) => {
                        if (response.status === 201) {
                            return response.json()
                        }
                    })
                    .then ((responseJson) => {
                        console.log(responseJson)
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
        navigation.navigate("AdminHomeScreen")
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.textHeading}>Pridať nový produkt</Text>
                <Text style={[styles.text_footer, {marginTop: 30}]}>Názov</Text>
                <View style={styles.action}>
                    <TextInput style={styles.textInput}
                        onChangeText={(name) => setName(name)}
                        placeholder="Zadajte názov"
                    /> 
                </View>
                <Text style={styles.text_footer}>Cena</Text>
                <View style={styles.action}>
                    <TextInput style={styles.textInput}
                        onChangeText={(price) => setPrice(price)}
                        placeholder="Zadajte cenu"
                    /> 
                </View>
                <Text style={styles.text_footer}>Popis</Text>
                <View style={styles.action}>
                    <TextInput style={styles.textInput}
                        onChangeText={(description) => setDescription(description)}
                        placeholder="Zadajte popis"
                    /> 
                </View>
                <Text style={styles.text_footer}>Kategória</Text>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={pickerStyle}
                    onValueChange={(category) => setCategory(category)}
                    placeholder={{ label: "Vyberte kategóriu", value: null }}
                    items={categoriesOptions}
                />
                <Text style={styles.text_footer}>Obsahuje lepok?</Text>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={pickerStyle}
                    onValueChange={(value) => setGlutenFree(value)}
                    placeholder={{ label: "Vyberte odpoveď", value: null }}
                    items={[
                        { label: "Nie", value: false },
                        { label: "Áno", value: true }
                    ]}
                />
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.text_footer}>Fotka produktu</Text>
                    <TouchableOpacity onPress={pickImage} style={{marginRight: 20}}>
                        <Text style={{fontSize: 20, backgroundColor: '#5B84B1FF', color: '#fff', paddingHorizontal: 10, paddingVertical: 5, fontWeight: 'bold'}}>+</Text>
                    </TouchableOpacity>
                </View>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginLeft: 20, marginTop: 20, borderWidth: 1, borderColor: '#000' }} />}
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleRegisterButton} style={styles.signIn}>
                        <Text style={styles.textSign}>Pridať produkt</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};
export default AdminAddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  textHeading: {
    color: '#5B84B1FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10
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