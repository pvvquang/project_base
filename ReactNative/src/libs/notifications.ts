import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Notifee, {AndroidImportance, EventType} from '@notifee/react-native';

async function checkApplicationPermission() {
  const authorizationStatus = await messaging().requestPermission();
  await Notifee.requestPermission();

  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    console.log('User has notification permissions enabled.');
  } else if (
    authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
  ) {
    console.log('User has provisional notification permissions.');
  } else {
    console.log('User has notification permissions disabled');
  }
}

type Unsubscribe = () => void;

class NotificationOpenHandler {
  constructor() {
    checkApplicationPermission();
    Notifee.createChannel({
      id: 'default_channel',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      badge: true,
    });
  }

  public startOnAppOpened() {
    if (Platform.OS === 'ios') {
    }
  }

  public startOnForeground() {
    const unsubscribes: Unsubscribe[] = [];

    // show custom notifications in android/ios - foreground
    messaging().onMessage(async remoteMessage => {
      console.log({remoteMessage}, 'onForeground');
      // handle show notification with local push notifications
    });

    // handle interactive with notifications
    // IOS(foreground/background) - Android(foreground) - open App from the notifications
    unsubscribes.push(
      Notifee.onForegroundEvent(async data => {
        const {type, detail} = data;
        if (type === EventType.PRESS && detail.notification) {
          // navigate to specific screen
        }
      }),
    );

    // Android (background) -  open App from the notifications
    unsubscribes.push(
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('messaging().onNotificationOpenedApp', remoteMessage);
        // navigate to specific screen
      }),
    );

    return () => {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    };
  }

  public startOnBackground() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log({remoteMessage}, 'onBackground');
      // in the background notifications auto show and cannot control
    });
  }
}

const notificationHandler = new NotificationOpenHandler();
export default notificationHandler;
