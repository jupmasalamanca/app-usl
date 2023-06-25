// Import React and Component
import React, {useContext,useState, useEffect} from 'react';
import {View, Text, SafeAreaView,StyleSheet,Image,ActivityIndicator} from 'react-native';
import { AppImages } from '../Assets';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomeScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
  const [input, setInput] = useState({});
  
  useEffect(() => {
    const get = async () => {
      try {
        const value = await AsyncStorage.getItem('loginInfo');
        if(value !== null) {
          setInput(JSON.parse(value));
        }
      }  catch (e){
        console.error(e);
      }
    }

    get();
  },[]);

  // if (!realizado){
  //   console.log('Realizado: '+realizado);
  //   setRealizado(true);
  //   get();
  // }

  return (
    <SafeAreaView style={{flex: 1}}>
   <View style={styles.container}>
   <Text style={styles.subTitle}>
      Bienvenido(a):
      </Text>
      <Text style={styles.subTitleNombre}>
      {input.nombre} {input.apellido1} {input.apellido2}
      </Text>

      <Image
        source={AppImages.logoUslHorizontal}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      
      
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', //Color del splash 307ecc | 942c5c
  },
  subTitle: {
    marginTop:10,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
  },
  subTitleNombre: {
    marginTop:10,
    fontSize: 16,
    color:'#1a1a1a',
    fontFamily: 'WorkSans-Regular',
    textTransform:'uppercase',
  },
});


export default HomeScreen;
