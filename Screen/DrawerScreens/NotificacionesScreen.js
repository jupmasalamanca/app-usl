import React, {useEffect} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';

const NotificacionesScreen = () => {
  const displayNotification = async () => {
      // Request permissions (required for iOS)
      await notifee.requestPermission()
    const channelId = await notifee.createChannel({
      id: 'primary',
      name: 'Primary Channel',
    });

    await notifee.displayNotification({
      title: '<b>Así o más Tuanis</b',
      body: 'Won Algo así es como teus lo quiere.',
      android: {
        channelId,
        smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('Notificaciones Rechazadas');
          break;
        case EventType.PRESS:
          console.log('Notificaciones Presionadas');
          break;
      }
    });
    displayNotification();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Display Notification"
        onPress={() => displayNotification()}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  });
  
export default NotificacionesScreen;

