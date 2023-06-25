
// Import React and Component
import React, {useContext,useState, createRef} from 'react';
import {BASE_URL} from '../config';
import axios from 'axios';
import { AppImages } from './Assets';
import {context} from './Components/contex';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Components/Loader';

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';


const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const {login,setLogin} =useState('');
  const passwordInputRef = createRef();
  const [input, setInput] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  //LogBox.ignoreLogs(['Remote debugger']);
constructor=()=>{
  this.state = {
    hidePassword: true
   }
};

    //Toggle password visibility
managePasswordVisibility = () => {
  setHidePassword(!hidePassword);
};
  
  const addAsyncStorage = async (key,value)=>{
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
     // console.log('Guarda los datos');
    }
    catch (e){
      console.error(e);
    }
  };

  const get = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
    //  console.log('Lee los datos:'+value);
      if(value !== null) {
        setInput(value);
      }
    }  catch (e){
      console.error(e);
    }
  }

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      Alert.alert('Atención','Por favor indicar la identificación');
      return;
    }
    if (!userPassword) {
      Alert.alert('Atención','Por favor indicar la contraseña');
      return;
    }
    setLoading(true);

  let dataToSend = JSON.stringify({username: userEmail, password: userPassword});
  
  formBody = dataToSend;
  axios({
    method:'post',
    url:`${BASE_URL}/login`,
    headers: {
      Accept: 'application/json',
     'Content-Type': 'application/json'
    },
    data: {
      username: userEmail,
      password: userPassword
    }
  })
    .then((responseJson) => {
    let userInfo = responseJson.data;
    console.log('Estado:'+userInfo.estado);
    //Hide Loader
    setLoading(false);
    if (responseJson != null) {
      if(userInfo.estado=='ACTIVO'){
        addAsyncStorage('loginInfo',responseJson.data);
        navigation.replace('DrawerNavigationRoutes');
      }else{
        setErrortext('Por favor revisar la identificación o la contraseña');  
      }
    } else {
      setErrortext('Por favor revisar la identificación o la contraseña');
      console.log('Por favor revisar la identificación o la contraseña');
    }
  }, (error) => {
    console.log(error);
    setErrortext('Error de conexión con el servidor, Favor revisar la conexión de internet o intente más tarde');
    setLoading(false);
    return(null);
  });
};

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.logoContainer}>
              <Image
                source={AppImages.logoUsl}
                style={styles.logo}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                placeholder="Ingrese su identificación" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                //keyboardType="email-address"
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                // onChangeText={(UserPassword) => setHidePassword({UserPassword})}
                textContentType="oneTimeCode"
                placeholder="Ingrese la contraseña" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                // secureTextEntry={true}
                secureTextEntry={hidePassword}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                // returnKeyType="send"
              />
              <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.visibilityBtn}
                  onPress={this.managePasswordVisibility}>
                  <Image
                    source={
                      hidePassword
                        ? require('../Image/hide.png')
                        : require('../Image/view.png')
                    }
                    style={styles.btnImageEye}
                  />
                </TouchableOpacity>
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Iniciar sesión</Text>
            </TouchableOpacity>
            {/* <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              Soy Nuevo - Registrarme
            </Text> */}
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',  //Color vino 942c5c
    alignContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#0072C6',  //Color verde 7DE24E
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#942c5c',  //Color verde #7DE24E  | color vino #942c5c
    height: 40,
    alignItems: 'center',
    borderRadius: 10, //30
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#942c5c', //Color del fondo button verde #00BFFF
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonTextStyle: {
    color: '#FFFFFF',   //Color del texto
    paddingVertical: 10,
    fontSize: 16,
    fontWeight:'bold'
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 120,
    marginBottom:10,
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius:65,
    resizeMode: 'cover',
    backgroundColor:'#942c5c',  //Color blanco 'white' #fff
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
  inputStyle: {
    flex: 1,
    color: '#1a1a1a',  //Color negro
    paddingLeft: 15,
    paddingRight: 15,
    fontSize:16,
    borderWidth: 2,
    borderRadius: 10, //
    backgroundColor:'white',
    borderColor: '#0072C6',  //Color blanco #fff  | vino #942c5c | gris #dadae8
    fontWeight: 'bold',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  btnImageEye:{
    position: 'absolute',
    right: 9,
    height: 25,
    width: 25,
    padding: 0,
    marginBottom:10,
  },
  visibilityBtn: {
    position: 'absolute',
    right: 5,
    height: 25,
    width: 25,
    padding: 0,
    marginTop: 12,
  },
});
