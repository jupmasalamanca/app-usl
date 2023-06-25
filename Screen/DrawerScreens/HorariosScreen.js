// Import React and Component
import {View, Text, SafeAreaView,StyleSheet, Touchable, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext,useState, useEffect} from 'react';
import {BASE_URL} from '../../config';
import axios from 'axios';
import HorarioList from '../Components/HorarioList';
// import { List } from 'react-native-paper';

const HorarioScreen = () => {

  const [estudiante, setEstudiante] = useState('');
  const [realizado, setRealizado] = useState(false);
  const [realizadoHorarios, setRealizadoHorarios] = useState(false);
  const [input, setInput] = useState({});

  useEffect(() => {
      if (!realizado){
        const getDatos = async () => {
          try {
            const value = await AsyncStorage.getItem('loginInfo');
            if(value !== null) {
              setEstudiante(JSON.parse(value).idEstudiante);
              setRealizado(true);
              //console.log('Estudiante:'+estudiante);
            };
          }  catch (e){
            console.error(e);
          }
        }
      getDatos();
    }
  }, []);

  //console.log('Realizado: '+realizado);
  if(!realizadoHorarios){
    let urlData = (`${BASE_URL}/horario-estudiante/`+estudiante);
    //console.log(urlData);
    axios({
      method:'get',
      url:urlData,
    })
      .then((responseJson) => {
      let horarios = responseJson.data;
      setInput(responseJson.data);
      setRealizadoHorarios(true);
      //console.log(responseJson.data);
      if (responseJson === null) {
        console.log('No hay datos que mostrar');
        return null;
      }
    }, (error) => {
      console.log(error);
    });
  }
  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={{ flex: 1, backgroundColor: '#FEFEFE' }}
    >
  {/* <Text style={styles.principal}>Cursos (Horarios)</Text> */}
      {input.length === 0 ? <Text style={styles.subTitle}>No hay horarios que mostrar </Text> : 
        <FlatList 
        style={styles.listado}
                  data={input}
                  keyExtractor= { (item) => item.id}
                  renderItem={ ({item}) => {
                    return(
                        <HorarioList 
                          item={item}
                        />
                    )
                  }}
                />      
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    image: {
      backgroundColor: '#FEFEFE',
      alignSelf: 'center',
    },
    subTitle: {
      fontSize: 16,
      fontFamily: 'WorkSans-Regular',
      textAlign: 'center',
      marginTop:10,
    },
    listado: {
      marginTop:10,
      marginHorizontal:10
    },
    principal: {
      marginTop:5,
      fontSize: 24,
      fontFamily: 'WorkSans-Regular',
      textAlign: 'center',
      color:'#1a1a1a',
      fontWeight:'900',  
    },
  });

  
export default HorarioScreen;
