// Import React and Component
import axios from 'axios';
import React, {useState,useEffect} from 'react';
import {Button,Portal,Dialog, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import {BASE_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const MisDatosScreen = ({navigation}) => {
  //Variables para almacenar los datos del usuario
  const [input, setInput] = useState({});
  const [realizado, setRealizado] = useState(false);
  const [data, setData] = useState({})    
  const [idEstudiante, guardaridEstudiante] = useState('')
  const [identificacion, guardarIdentificacion] = useState('')
  const [nombre, guardarNombre] = useState('')
  const [apellido1, guardarapellido1] = useState('')
  const [apellido2, guardarapellido2] = useState('')
  const [telefono, guardarTelefono] = useState('')
  const [correo, guardarCorreo] = useState('')
  const [conocidoComo, guardarConocidoComo] = useState('')
  const [fechaNacimiento, guardarFecNac] = useState('')
  const [alerta, guardarAlerta] = useState(false)
  const [alertaGuardado, guardarAlertaGuardado] = useState(false)

  useEffect(() => {

    //console.log('Realizado USE EFFECT: '+realizado);
    if (!realizado){
      const getMisDatos = async () => {
        try {
          const value = await AsyncStorage.getItem('loginInfo');
          if(value !== null) {
            guardaridEstudiante(JSON.parse(value).idEstudiante);
            setRealizado(true);
            //console.log('Estudiante:',idEstudiante);
          };
        }  catch (e){
          console.error(e);
          throw e; 
        }
      }
    getMisDatos();
    // obtenerDatos();
  }
}, []);


  //console.log('Realizado: '+realizado);
  if(realizado){
    console.log('Realizado: '+realizado);
    console.log('Estudiante:',idEstudiante);
    let urlData = (`${BASE_URL}/datos-personales-consulta/`+idEstudiante);
   // console.log(urlData);
    setRealizado(false);
    axios({
      method:'get',
      url:urlData,
    })
      .then((resultado) => {
        let misDatos = resultado.data;
        setInput(resultado.data);
        guardarIdentificacion(resultado.data.identificacion)
        guardarNombre(resultado.data.nombre)
        guardarapellido1(resultado.data.apellido1)
        guardarapellido2(resultado.data.apellido2)
        guardarTelefono(resultado.data.telefono)
        guardarCorreo(resultado.data.correo)
        guardarConocidoComo(resultado.data.conocidoComo)
        guardarFecNac(resultado.data.fechaNacimiento)
        
        //console.log(responseJson.data);
        if (resultado == null) {
          console.log('No hay datos que mostrar');
          return null;
        }
    }, (error) => {
      console.log(error);
      throw error; 
    });
  }
  
  const baseURL= (`${BASE_URL}/datos-personales-guardar`);
      const guardarDatos = () => {
        if (nombre==='' || apellido1==='' || telefono==='' || correo===''){
          guardarAlerta(true)
          return;
        }       
        axios({
        method:"put",
        url:`${baseURL}`,
        data: {
          "idEstudiante": idEstudiante,
          "identificacion": identificacion,
          "nombre": nombre,
          "apellido1": apellido1,
          "apellido2": apellido2,
          "telefono": telefono,
          "correo": correo,
          "conocidoComo": conocidoComo,
          "fechaNacimiento": fechaNacimiento
        },
      }).
      then((response) => 
        console.log(response.data))
      .catch(err => 
        console.log(err)
      ), (error) => {
        console.log(error);
        throw error; 
      };
        guardarAlertaGuardado(true)      
      }// fin guardar datos
    
  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={{ flex: 1, backgroundColor: 'white' }}>  
    <PaperProvider>
      <ScrollView >
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.subTitle}>
            Ingrese los datos personales
          </Text>

          <View style={styles.inputContainer}>

          {/* Nombre completo */}
          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput
            style={styles.campo}
            placeholderTextColor="#9b9897"
            onChangeText={texto=>guardarNombre(texto)}
            value={nombre}
            placeholder="Ingrese su nombre"
            // value={data.nombre}
          />
         
        {/* Primero Apellido  */}
        <Text style={styles.label}>Primero Apellido</Text>
        <TextInput
          style={styles.campo}
          placeholderTextColor="#9b9897"
          onChangeText={texto=>guardarapellido1(texto)}
          placeholder="Primer Apellido"
          value={apellido1}
        />
       
         {/* Segundo Apellido  */}
        <Text style={styles.label}>Segundo Apellido</Text>
        <TextInput
          style={styles.campo}
          placeholderTextColor="#9b9897"
          placeholder="Segundo Apellido"
          onChangeText={texto=>guardarapellido2(texto)}
          value={apellido2}
         />

         {/* Conocido Como*/}
         <Text style={styles.label}>Conocido como</Text>
          <TextInput
            style={styles.campo}
            placeholderTextColor="#9b9897"
            onChangeText={texto=>guardarConocidoComo(texto)}
            value={conocidoComo}
            placeholder="Conocido como"
          />
         {/* Telefono */}
         <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.campo}
          placeholderTextColor="#9b9897"
          placeholder="Número telefónico"
          value={telefono}
          onChangeText={texto=>guardarTelefono(texto)}
          keyboardType='phone-pad'
         />

         {/* correo electronico */}
         <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.campoCorreo}
          placeholderTextColor="#9b9897"
          placeholder="Correo electrónico"
          onChangeText={texto=>guardarCorreo(texto)}
          keyboardType='email-address'
          value={correo}
         />
  
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={guardarDatos}>
          <Text style={styles.buttonTextStyle}>Actualizar</Text>
        </TouchableOpacity>
       
       {/* <Button onPress={guardarDatos}>ACTUALIZAR</Button> */}
       
     <View>
      <Portal>
        <Dialog visible = {alerta}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
               <Paragraph>Todos los campos son Obligatorios</Paragraph>
          </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => guardarAlerta(false)}>OK</Button>
            </Dialog.Actions>

        </Dialog>
      </Portal>
      </View>

      <View>
      <Portal>
        <Dialog visible = {alertaGuardado}>
          <Dialog.Title>Atención</Dialog.Title>
          <Dialog.Content>
               <Paragraph>Datos Actualizados Correctamente</Paragraph>
          </Dialog.Content>
            <Dialog.Actions>
            <Button onPress={() => 
              navigation.replace('DrawerNavigationRoutes')
            }>OK</Button>
            </Dialog.Actions>

        </Dialog>
      </Portal>
      </View>
      </View>
    </KeyboardAvoidingView>
  </ScrollView>
  </PaperProvider>
  </SafeAreaView>
);


};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#FEFEFE',
    alignSelf: 'center',
  },
  label: {
    marginTop:6,
    textAlign: 'left',
    marginBottom:5,
    fontSize:16,
    fontWeight:'900',
    color:'#1a1a1a'
  },
  campo: {
    backgroundColor:'#f5f5f5',
    borderRadius:10,
    borderBottomWidth: 1,
    paddingHorizontal:10,
    fontWeight:'600',
    fontSize:16,
    marginBottom:2,
    color:'#1a1a1a',
    textTransform:'uppercase',
  },
  campoCorreo: {
    backgroundColor:'#f5f5f5',
    color:'#1a1a1a',
    borderRadius:10,
    borderBottomWidth: 1,
    paddingHorizontal:10,
    fontWeight:'600',
    fontSize:16,
    marginBottom:2,
    textTransform:'lowercase',
  },
  movieText: {
    fontSize: 26,
    fontWeight: "200",
  },

  subTitle: {
    fontSize: 20,
    fontWeight:'900',
    fontFamily: 'WorkSans-Regular',
    textAlign: 'center',
    paddingTop: 5,
    color:'#1a1a1a'
  },
  inputContainer: {
    flex:1,
    marginTop: 5,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 8,
    shadowColor: 'rgba(158, 158, 158, 0.8)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  input: {
    height: 18,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    textAlignVertical: 'top',
  },
  button: {
    width: 140,
    height: 50,
    padding: 8,
    marginTop: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#0072C6',
    borderRadius: 4,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
    fontSize:16,
    padding: 4,
  },
  menuBtn: {
    position: 'absolute',
    padding: 8,
    left: 8,
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

});

export default MisDatosScreen;
