/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, { EventType } from '@notifee/react-native';
    // para trabajar en segundo plano
    notifee.onBackgroundEvent(async ({ type, detail }) => {
        const { notification, pressAction } = detail;
        //if (type === EventType.ACTION_PRESS && pressAction.id === "mark-as-read") {
          if (type === EventType.ACTION_PRESS) {
            console.log('Presiono ver el mensaje');
            await fetch(`https:`, {
            method: "POST",
          });
          //await cancel("123");
        }
      });
AppRegistry.registerComponent(appName, () => App);
