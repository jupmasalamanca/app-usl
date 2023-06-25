// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import MisDatosScreen from './DrawerScreens/MisDatosScreen';
import HorariosScreen from './DrawerScreens/HorariosScreen';
import HistorialAcademicoScreen from './DrawerScreens/HistorialAcademicoScreen';
import ContactenosScreen from './DrawerScreens/ContactenosScreen';
//import NotificacionesScreen from './DrawerScreens/NotificacionesScreen'; 

import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//Pagina Home Screen
const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Inicio', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#0072C6', //Set Header color
            // textAlign:'center',
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
            // textAlign:'center',
          },
        }}
      />
    </Stack.Navigator>
  );
};

//Pagina MisDatosScreen
const MisDatosScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="MisDatosScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#0072C6', //Set Header color  307ecc |942c5c | 
          // textAlign:'center',
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
          // textAlign:'center',
        },
      }}>
      <Stack.Screen
        name="MisDatosScreen"
        component={MisDatosScreen}
        options={{
          title: 'Mis Datos', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

//Pagina HorarioScreen
const HorarioScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="HorarioScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#0072C6', //Set Header color  307ecc |942c5c | 
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="HorarioScreen"
        component={HorariosScreen}
        options={{
          title: 'Horarios', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

//Pagina HistorialAcademicoScreen
const HistorialAcademicoScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="HistorialAcademicoScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#0072C6', //Set Header color  307ecc |942c5c | 
          // textAlign:'center',
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
          // textAlign:'center',
        },
      }}>
      <Stack.Screen
        name="HistorialAcademicoScreen"
        component={HistorialAcademicoScreen}
        options={{
          title: 'Historial Académico', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

//Pagina ContactenosScreen
const ContactenosScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ContactenosScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#0072C6', //Set Header color  307ecc |942c5c | 
          // textAlign:'center',
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
          // textAlign:'center',
        },
      }}>
      <Stack.Screen
        name="ContactenosScreen"
        component={ContactenosScreen}
        options={{
          title: 'Contáctenos', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

//Pagina HorarioScreen
const NotificacionesScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="NotificacionesScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#0072C6', //Set Header color  307ecc |942c5c | 
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="NotificacionesScreen"
        component={NotificacionesScreen}
        options={{
          title: 'Notificaciones', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};


//DrawerNavigator General
const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
    
      /*drawerContentOptions*/
      screenOptions={{
        activeTintColor: '#000000',
        color: '#000000',  //942c5c
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#000000',
          fontWeight: 'bold',
        },
        headerShown: false
      }}
      // screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>
      {/* ************************************ Paginas de Acceso en el Drawer ************************************* */}
      {/* PANTALLA DE INICIO */}
      <Drawer.Screen
        name="HomeScreenStack"
        options={{drawerLabel: 'Inicio'}}
        component={HomeScreenStack}
      />
      {/* PANTALLA DE MIS DATOS */}
      <Drawer.Screen
        name="MisDatosScreenStack"
        options={{drawerLabel: 'Mis Datos'}}
        component={MisDatosScreenStack}
      />
      {/* PANTALLA DE HORARIOS */}
      <Drawer.Screen
        name="HorarioScreenStack"
        options={{drawerLabel: 'Horarios'}}
        component={HorarioScreenStack}
      />
      {/* PANTALLA DE HISTORIAL ACADEMICO */}
      <Drawer.Screen
        name="HistorialAcademicoScreenStack"
        options={{drawerLabel: 'Historial Académico'}}
        component={HistorialAcademicoScreenStack}
      />
      {/* PANTALLA DE CONTACTENOS */}
      <Drawer.Screen
        name="ContactenosScreenStack"
        options={{drawerLabel: 'Contáctenos'}}
        component={ContactenosScreenStack}
      />
      {/* PANTALLA DE NOTIFICACIONES */}
      {/* <Drawer.Screen
        name="NotificacionesScreenStack"
        options={{drawerLabel: 'Notificaciones'}}
        component={NotificacionesScreenStack}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
