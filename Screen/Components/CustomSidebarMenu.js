// Import React and Component
// import React from 'react';
import React, {useContext,useState, useEffect} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomSidebarMenu = props => {
  const [input, setInput] = useState({});
  const [iniciales, setIniciales] = useState('');
  const [realizado, setRealizado] = useState(false);
  const [inicial2, setInicial2] = useState('');
    
  useEffect(() => {
    const get = async () => {
      try {
        const value = await AsyncStorage.getItem('loginInfo');
        if(value !== null) {
          setInput(JSON.parse(value));
          setIniciales(JSON.parse(value).nombre.charAt(0) + JSON.parse(value).apellido1.charAt(0));
          let apellidoDos = JSON.parse(value).apellido2;
          //console.log(apellidoDos);
          if(apellidoDos!=null || apellidoDos ===''){
            setInicial2(JSON.parse(value).apellido2.charAt(0));
          }else{
            setInicial2('');
          }
        }
      }  catch (e){
        console.error(e);
      }
    }
  
    get();
  },[]);

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: 22, color: '#0072C6',fontWeight:'bold'}}>
          {iniciales}
          {/* {'NombreEstudiante'.charAt(0)}{'Estudiante'.charAt(0)} */}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>{input.nombre} {input.apellido1} {inicial2}</Text>        
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color}) => <Text style={{color: '#0072C6', fontWeight:'bold'}}>Cerrar sesión</Text>}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Cerrar sesión',
              '¿Estás seguro de Cerrar sesión?',
              [
                {
                  text: 'Cancelar',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Aceptar',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff', //Color del container del customsidebar 942c5c|307ecc
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#0072C6', //Color donde estará el nombre 307ecc  |
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#0072C6', //Color de la linea debajo del nombre e2e2e2|942c5c
    marginTop: 15,
  },
});