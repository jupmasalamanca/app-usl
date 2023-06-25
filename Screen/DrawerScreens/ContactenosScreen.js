// Link Redes Sociales
import { URL_FACEBOOK } from '../../config'; 
import { URL_INSTAGRAM } from '../../config'; 
import { URL_LINKEDIN } from '../../config'; 
import { URL_SITIO_WEB } from '../../config'; 
import { URL_TWITTER } from '../../config';
import { URL_YOUTUBE } from '../../config'; 
import { URL_WHATSAPP } from '../../config'; 
import { TEL_PHONE } from '../../config'; 
import { EMAIL_SEND } from '../../config'; 

import { DataTable } from 'react-native-paper';
import { AppImages } from '../Assets';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Pressable,
    Linking,
    FlatList,
    LogBox
  } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import React, {useContext,useState, useEffect} from 'react';
  import {BASE_URL} from '../../config';
  import axios from 'axios';
import ContactenosList from '../Components/ContactenosList';
  
const ContactenosScreen = () => {
  //Habilitar cuando exista url para redes sociales
  const [realizado, setRealizado] = useState(false);
  const [realizadoRedesSociales, setRealizadoRedesSociales] = useState(false);
  const [input, setInput] = useState({});

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  //console.log('Realizado: '+realizado);
  if(!realizadoRedesSociales){
    let urlData = (`${BASE_URL}/redes-sociales `);
    //console.log(urlData);
    axios({
      method:'get',
      url:urlData,
    })
      .then((responseJson) => {
      let horarios = responseJson.data;
      setInput(responseJson.data);
      setRealizadoRedesSociales(true);
      // console.log(responseJson.data);
      if (responseJson != null) {
        //console.log('Hay datos que mostrar'); //Se mostraran en la pantalla

      } else {
        console.log('No hay datos que mostrar');
        return null;
      }
    }, (error) => {
      console.log(error);
    });
  }

    return (
        <View>
          <ScrollView horizontal={false}>
            {/* <Text style={styles.textoContactenos}>Contactenos</Text> */}
            <View style={styles.containerGeneral}>
              {input.length === 0 ? <Text style={styles.subTitle}>No hay Redes Sociales Disponibles </Text> : 
              <FlatList 
                  style={styles.listado}
                  data={input}
                  numColumns={2}
                  scrollEnabled={false}
                  keyExtractor= { (item) => item.id}
                  renderItem={ ({item}) => {
                    return(
                        <ContactenosList 
                          item={item}
                        />
                    )
                  }}
                />      
              }
            </View>
            </ScrollView>
        </View>
  )
};

const styles = StyleSheet.create({
    containerGeneral: {
      flex: 1,
   },
   listado: {
    marginTop:10,
    marginHorizontal:10,
    flex: 1,
  },
   containerButtonRedes:{
    marginHorizontal:10,
    marginVertical:5,
    resizeMode:'center'
   },
    label: {
      color: '#1a1a1a',
      textTransform: 'uppercase',
      fontWeight:'900',
      fontSize:13,
      marginBottom:5,
    },
    texto: {
        color: '#1a1a1a',
        textTransform: 'uppercase',
        fontWeight:'700',
        fontSize:16,
        textAlign:'center',
        // marginLeft:30,
        marginBottom:5,
        marginTop:1,
    },
    textoContactenos: {
        color: '#942c5c',
        textTransform: 'uppercase',
        fontWeight:'700',
        fontSize:26,
        textAlign:'center',
        marginVertical:10,
    },
    containerCurso: {
      padding: 15,
    },
    container: {
      padding: 10,
    },
    tableHeader: {
      backgroundColor: '#DCDCDC',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius:50,
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
  })
export default ContactenosScreen
