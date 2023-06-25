import 'react-native-gesture-handler';
// Import React and Component
import React, {useEffect} from 'react';
import { AppImages } from './Screen/Assets';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';

import notifee, {
  AndroidBadgeIconType,
  AndroidCategory,
  AndroidColor, 
  AndroidGroupAlertBehavior, 
  AndroidImportance, 
  AndroidStyle, 
  AndroidVisibility, 
  EventType} from '@notifee/react-native';

import Icon from 'react-native-paper/lib/typescript/src/components/Icon';
import { isColor } from 'react-native-reanimated';

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

/* Switch Navigator for those screens which needs to be switched only once
  and we don't want to switch back once we switch from them to the next one */
const App = () => {

  const Screen = () => {
    try {
      //console.log('Haciendo notificaciones');
      
      async function onDisplayNotification() {
          // Request permissions (required for iOS)
          // ver https://notifee.app/react-native/docs/ios/permissions
          await notifee.requestPermission()

        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
          badge: false, // disable in badges
          vibration:true,
          vibrationPattern:[300,500],
          visibility: AndroidVisibility.PUBLIC,
        });
        //console.log('Preparando notificaciones');
        await notifee.displayNotification(
          {
          title: '<p style="color: #4caf50;"><b>Atencion</span></p></b></p>',
          subtitle:'Lecciones',
          body: 'Aviso USL',
          // data:input,
          //id:'123', //agregar cuando se obtiene el json
          android: {
            channelId:'default',
            timestamp:Date.now(),
            // showTimestamp:true,
            // showChronometer:true,
            importance: AndroidImportance.HIGH,
            color:AndroidColor.RED,
            groupSummary: true,
            //groupId:'123',
            groupAlertBehavior: AndroidGroupAlertBehavior.SUMMARY,
            // asForegroundService: true, //permite pintarlo de color
            // colorized: true, //funciona si asForegroudServices es true
            badgeIconType: AndroidBadgeIconType.LARGE,
            vibrationPattern:[300,500],
            visibility: AndroidVisibility.PUBLIC,
            // Reference the name created (Optional, defaults to 'ic_launcher')
            largeIcon:AppImages.logoUsl,
            //smallIcon: 'ic_launcher',
            category:AndroidCategory.REMINDER,
            circularLargeIcon:true,
            style: {
              //Solo para recrearlo tipo INBOX
              //type: AndroidStyle.INBOX,
              //lines: ['Pendiente de tomarlo por el web services','Enviar respuesta de recibido', 'Agregar mas lineas'],
              type: AndroidStyle.BIGTEXT, text: 'Los estudiantes del curso de Enfermeria hoy 12/06/2023 no tienen clases'
            },
            //Solo para recrearlo tipo INBOX
            // style: {
            //   type: AndroidStyle.INBOX,
            //   lines: ['Pendiente de tomarlo por el web services','Enviar respuesta de recibido', 'Agregar mas lineas'],
            // },
            // color: AndroidColor.RED,
            // pressAction is needed if you want the notification to open the app when pressed
            
            // actions: [
            //   {
            //     title: '<b>Leido</b>',
            //     pressAction: { id: 'leido' },
            //   },
            //   {
            //     title: '<p style="color: #f44336;"><b>Rechazar</b> </p>',
            //     pressAction: { id: 'rechazar' },
            //   },
            // ],
          },
          ios:{
            foregroundPresentationOptions:{
                badge:true,
                sound:true,
                banner:true,
                list:true,
            },
            critical:true,
            categoryId: 'post',
          },
        });
      }
      onDisplayNotification();      
    } catch (error) {
      console.log('Entro al cath: '+error);
    }

  }
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('Notificacion Rechazada');
          break;
        case EventType.PRESS:
          console.log('Notificacion Leida');
          break;
      }
    });
  }, []);

  async function cancel(notificationId: string) {
    await notifee.cancelNotification(notificationId);
  }
  Screen();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator which includer Login Signup will come once */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer as we will use our custom header
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
