// Import React and Component
import React from 'react';
import {View, Image, TouchableOpacity,StyleSheet} from 'react-native';
import { AppImages } from '../Assets';

const NavigationDrawerHeader = props => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
        source={AppImages.rayitasMenu}
          // source={{
          //   uri:
          //     //Lineas horizontales demostrando ser menu
          //    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          // }}
          // style={{width: 25, height: 25, marginLeft: 5}}
          style={styles.logoRayitas}
        />
      </TouchableOpacity>
    </View>
  );
};


export default NavigationDrawerHeader;

const styles = StyleSheet.create({
  logoRayitas: {
    width: 25,
    height: 25,
    marginLeft: 5,
    // borderRadius:12,
    resizeMode: 'cover',
    backgroundColor:'#0072C6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0072C6',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
});
