import React ,{useState} from 'react'
import { AppImages } from '../Assets';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    Pressable,
    Linking
  } from 'react-native';
import { Text } from 'react-native-paper';
import { URL_FACEBOOK } from '../../config';

const ContactenosList = ({item}) => {
  const {descripcion,codigo,id,nombre,imagen} = item ;
  //console.log('Codigo: '+codigo+' Descripcion: '+descripcion+' Ruta: '+imagen);
  //var base64Icon = 'data:image/png;base64,base64';
  // let imgSource = AppImages.URL_FACEBOOK.uri;
  // if (codigo === 'URL_WHATSAPP') {
  //   imgSource = AppImages.URL_WHATSAPP.uri;
  // }else{
  //   imgSource = AppImages.URL_FACEBOOK.uri;
  // }
    return (
        <View>
            {/* <Text style={styles.textoContactenos}>Contactenos</Text> */}
            <View>
            {/* <Text style={styles.texto}>{codigo}</Text> */}
            
            </View>
            <View style={styles.containerGeneral}>
              <Pressable style={styles.containerButtonRedes} onPress={() => Linking.openURL(descripcion)}>
              <Text style={styles.textoRedes}>{nombre}</Text>
              <Image
                source={AppImages[codigo]}
                // require('../../Image/URL_WHATSAPP.png'),
                // source={{
                //   //AppImages.URL_FACEBOOK
                //   // require(icon)
                //   uri:imgSource,
                //   //uri:require('../../Image/URL_WHATSAPP.png'),
                //   method: 'POST',
                //   headers: {
                //     Pragma: 'no-cache',
                //   },
                //   immutable: true,
                //   resizeMode:'cover',
                // }}
                style={styles.logo}
                />
                
              </Pressable>
            </View>
        </View>
  )
};

const styles = StyleSheet.create({
    containerGeneral: {
      paddingHorizontal: 15,
      margin:5,
      alignItems:'center', 
      justifyContent:'center',
      flex:1,
      flexDirection:'row',
      flexWrap:'wrap',
   },
   containerButtonRedes:{
    marginHorizontal:30,
    marginVertical:5,
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
        // marginLeft:30,
        marginBottom:5,
        marginTop:1,
    },
    textoContactenos: {
        color: '#0072C6',
        textTransform: 'uppercase',
        fontWeight:'700',
        fontSize:26,
        marginVertical:10,
    },
    textoRedes: {
      color: '#0072C6',
      textTransform: 'uppercase',
      fontWeight:'700',
      fontSize:14,
      marginVertical:10,
      marginHorizontal:5,
      paddingEnd:5,
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
        width: 80,
        height: 80,

        borderRadius:40,
        resizeMode: 'center',
        backgroundColor:'#0072C6',  //Color blanco 'white' #fff
        alignItems: 'baseline',
        marginHorizontal:5,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 0.16,
      },
  })
export default ContactenosList
