import {View, Text, SafeAreaView,StyleSheet, TouchableOpacity, FlatList,Alert,useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext,useState, useEffect} from 'react';
import {BASE_URL} from '../../config';
import axios from 'axios';
import HistorialAcademicoList from '../Components/HistorialAcademicoList';
import { Picker } from '@react-native-picker/picker';
import Loader from '../Components/Loader';

const HistorialAcademicoScreen = () => {
  const [estudiante, setEstudiante] = useState('');
  const [realizado, setRealizado] = useState(false);
  const [realizadoHistorico, setRealizadoHistorico] = useState(false);
  const [realizadoCarreras, setRealizadoCarreras] = useState(false);
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  //Para el picker
  const [choosenValue, setChoosenValue] = useState('Seleccione una opcion');
  const [choosenIndex, setChoosenIndex] = useState('');
  const [carreras, setCarreras] = useState([]);
  const [idCarrera, setIdCarrera] = useState('');
  const [value, setValue] = React.useState(0);
  

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
      clean();
    }
  }, []);

  const clean = () => {
    //reset picker
    setValue(0) // <-- reset by setting the placeholder value.
  }
    const getCursosHistoricos = () => {
      try {
        setTimeout(function(){
          //console.log('RealizadoHistorico: '+realizadoHistorico);

          // if(!realizadoHistorico){
            //console.log('Entró al realizado Historico');
            let urlData = (`${BASE_URL}/curso-estudiante/`+estudiante+'/'+choosenValue);
            //console.log(urlData);
            axios({
              method:'get',
              url:urlData,
            })
              .then((responseJson) => {
              let horarios = responseJson.data;
              setInput(responseJson.data);
              setRealizadoHistorico(true);
              setLoading(false);
              //console.log(responseJson.data);
              if (responseJson === null) {
                console.log('No hay datos que mostrar');
                setLoading(false);
                return null;
              }
            }, (error) => {
              setLoading(false);
              console.log('Error en conexion Historial Academico');
              console.log(error);
            });
        // }else{
        //   console.log('No entro a la consulta del histórico');
        //   setLoading(false);
        // };
      }, 1000);
            
      } catch (error) {
        console.error('Error metodo getCursosHistoricos: '+error);
      }
  }
  const getCarreras = () => {
    try {
          if(!realizadoCarreras){
            //console.log('RealizadoCarreras: '+realizado);
            //console.log('Estudiante: '+estudiante);
            let urlDataCarreras = (`${BASE_URL}/carrera-estudiante/`+estudiante);
            //console.log(urlDataCarreras);
            axios({
              method:'get',
              url:urlDataCarreras,
            })
              .then((responseJson) => {
              let carreras = responseJson.data;
              setCarreras(responseJson.data);
              setRealizadoCarreras(true);
              //console.log(carreras);
              
              if (responseJson === null) {
                console.log('No hay datos que mostrar');
                return null;
              }
            }, (error) => {
              console.log('Error de conexión');
              console.log(error);
            });
        }
    } catch (error) {
      console.log(error);
    }
};

const getCarreraSeleccionada = () => {
try {
    setTimeout(function(){
      setLoading(true);
      setRealizadoHistorico(false);
      getCursosHistoricos();
    }, 1000);
    

    //console.log(choosenIndex + "-"+ choosenValue );
    //Alert.alert(choosenValue);
  } catch (error) {
    console.log(error);
    console.log('Error de conexión');
    setInput('');
  }
}
  getCarreras();
  //getCursosHistoricos();

  // const colorScheme = useColorScheme();
  // const isDarkTheme = colorScheme === 'dark';
  // console.log(colorScheme);
  // console.log(isDarkTheme);

  return (
    <SafeAreaView 
      edges={['bottom', 'left', 'right']}
      style={{ flex: 1, backgroundColor: '#FEFEFE' }}
    >
     {/* <Text style={styles.principal}>Historial Académico </Text> */}
      <Text style={styles.subTitleCarrera}>Carrera: </Text>
      <View style={styles.container}>

      {/* Se crea el picker */}
      <Picker 
              placeholder={{
                label: 'Seleccione una carrera'
              }}
              useNativeAndroidPickerStyle={false}
              mode="dialog"  //dropdown    \ dialog
              style={styles.picker}
              itemStyle={styles.pickerItemStyle}

                selectedValue={choosenValue}
                onValueChange={(itemValue, itemIndex) => {
                  // console.log(itemIndex + ' --' + itemValue );
                  setChoosenValue(itemValue);
                  setChoosenIndex(itemIndex);
                }} 
                >
                { 
                  carreras.map(item => {
                    return <Picker.Item style={{backgroundColor:'white', color:'#1a1a1a'}} value={item.codigo} label={item.nombre} key={item.codigo}/>
                  })
                }
                
              </Picker>

        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={getCarreraSeleccionada}
          // color={colorScheme === 'light' ? 'grey' : 'orange'}
          >
          <Loader loading={loading} />
          <Text style={styles.buttonTextStyle}>Consultar</Text>
      </TouchableOpacity>
      {input.length === 0 ? <Text style={styles.subTitle}>No hay Cursos que mostrar </Text> : 
        <FlatList 
        style={styles.listado}
                  data={input}
                  keyExtractor= { (item) => item.id}
                  renderItem={ ({item}) => {
                    return(
                        <HistorialAcademicoList
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
  container: {
    borderWidth:2,
    borderRadius:5,
    marginVertical:10,
    marginHorizontal:10,
    marginBottom: 10,
  },
  picker: {  //Para el combobox
    // flex: 0.5,
    color: '#1a1a1a',   //blue
    fontWeight:'bold',
    backgroundColor:'white',  
  },
  pickerItemStyle: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor:'#1a1a1a',
  },
  image: {
      backgroundColor: '#FEFEFE',
      alignSelf: 'center',
    },
    buttonStyle: {
      backgroundColor: '#0072C6',  //Color verde 7DE24E
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#942c5c',  //Color verde #7DE24E  | color vino #942c5c
      height: 50,
      alignItems: 'center',
      borderRadius: 10, //30
      marginLeft: 35,
      marginRight: 35,
    },
    subTitle: {
      fontSize: 16,
      fontFamily: 'WorkSans-Regular',
      textAlign: 'center',
    },
    subTitleCarrera: {
      fontSize: 18,
      fontFamily: 'WorkSans-Regular',
      textAlign: 'left',
      marginTop:10,
      fontWeight:'bold',
      color:'#1a1a1a',
      marginHorizontal:15,
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
    pickerItems: {
      color:'blue',
      textAlign: 'center',
      fontWeight:'900',  
    },
    buttonTextStyle: {
      color: '#FFFFFF',   //Color del texto
      paddingVertical: 10,
      fontSize: 16,
      alignContent:'center',
      fontWeight:'bold'
    },
  });
  
export default HistorialAcademicoScreen;
