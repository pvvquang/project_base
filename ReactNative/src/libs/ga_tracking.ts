import {FirebaseAnalyticsTypes} from '@react-native-firebase/analytics';
import {getUniqueId} from 'react-native-device-info';

const notSupported = () => {
  __DEV__ && console.info('Analytics not supported on ExpoGo');
};

const fallbackAnalytics: Partial<FirebaseAnalyticsTypes.Module> = {
  async logScreenView() {
    notSupported();
  },
  async logEvent() {
    notSupported();
  },
  async setUserProperty(): Promise<void> {
    notSupported();
  },
  async logPurchase() {
    notSupported();
  },
};

const MESSAGE_USE_FALLBACK =
  '============= USE FALLBACK GA ANALYTICS ===============';
const MESSAGE_SCREEN_TRACKED = '============= SCREEN TRACKED ===============';
const MESSAGE_AGENT_ID_TRACKED =
  '============= AGENT ID TRACKED ===============';
// const MESSAGE_PURCHASE_TRACKED =
//   '============= PURCHASE TRACKED ===============';

// type LogPurchaseParams = {
//   value: number;
//   currency: string;
//   items: {
//     id: string;
//     name: string;
//     category?: string;
//     price?: number;
//   }[];
// };

type GA_EVENT_TYPE = (typeof GATracking.EVENTS)[keyof typeof GATracking.EVENTS];

class GATracking {
  static SUB_SCREENS = {};

  static MAIN_SCREENS_REMAP: {[key: string]: string} = {};

  static EVENTS = {
    RE_VISIT: 're_visit',
    GROUP_CHAT_REJOIN: 'group_chat_rejoin',
    NEW: 'new',
    COME_TO_APP: 'come_to_app',
    ME_TOO_CLICK: 'me_too_click',
    SIGN_UP_PROCESS_BOUNCE_RATE: 'sign_up_process_bounce_rate',
    SIGN_UP_START: 'sign_up_start',
    SIGN_UP_COMPLETED: 'sign_completed',
  } as const;

  static BUTTON_TYPES = {} as const;

  static log(messages: any[]) {
    __DEV__ && console.info(...messages);
  }

  static get analytics(): FirebaseAnalyticsTypes.Module {
    try {
      const fbAnalyticsModule =
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('@react-native-firebase/analytics').default;
      return fbAnalyticsModule();
    } catch (error) {
      GATracking.log([MESSAGE_USE_FALLBACK, error]);
      return fallbackAnalytics as FirebaseAnalyticsTypes.Module;
    }
  }

  static async trackScreen(screenName: string, prefix?: string) {
    try {
      const loggedScreenName = prefix ? `${prefix}_${screenName}` : screenName;

      await GATracking.analytics.logScreenView({
        screen_name: loggedScreenName,
        screen_class: loggedScreenName,
      });
      GATracking.log([MESSAGE_SCREEN_TRACKED, loggedScreenName]);
    } catch (error) {
      GATracking.log([error]);
    }
  }

  static async trackAgentId(agentId: string) {
    try {
      await GATracking.analytics.setUserProperty('agent_id', agentId);
      GATracking.log([MESSAGE_AGENT_ID_TRACKED, agentId]);
    } catch (error) {
      GATracking.log([error]);
    }
  }

  // static async logPurchase(params: LogPurchaseParams) {
  //   try {
  //     const {value, currency, items} = params;
  //     const data = {
  //       value,
  //       currency,
  //       items: items.map(item => ({
  //         item_id: item.id,
  //         item_name: item.name,
  //         price: item.price,
  //         item_category: item.category,
  //         item_brand: 'fwd',
  //       })),
  //     };
  //     await GATracking.analytics.logPurchase(data);
  //     GATracking.log([MESSAGE_PURCHASE_TRACKED, data]);
  //   } catch (error) {
  //     GATracking.log([error]);
  //   }
  // }

  static async logCustomEvent(
    evenType: GA_EVENT_TYPE,
    params?: {[key: string]: string},
  ) {
    try {
      await GATracking.analytics.logEvent(evenType, params);
    } catch (error) {
      GATracking.log([error]);
    }
  }

  static onSignIn = async (email: string) => {
    await Promise.all([
      GATracking.analytics.setUserProperty('email', email),
      GATracking.logCustomEvent(GATracking.EVENTS.RE_VISIT, {email}),
      GATracking.logCustomEvent(GATracking.EVENTS.COME_TO_APP, {email}),
    ]);
  };

  static onSignUp = async (email: string) => {
    const device_id = await getUniqueId();
    await Promise.all([
      GATracking.analytics.setUserProperty('email', email),
      GATracking.logCustomEvent(GATracking.EVENTS.NEW, {email}),
      GATracking.logCustomEvent(GATracking.EVENTS.COME_TO_APP, {email}),
      GATracking.logCustomEvent(GATracking.EVENTS.SIGN_UP_COMPLETED, {
        device_id,
      }),
    ]);
  };

  static onSignOut = async () => {
    // await GATracking.analytics.resetAnalyticsData();
  };

  static onSignUpStart = async () => {
    const device_id = await getUniqueId();
    await GATracking.logCustomEvent(GATracking.EVENTS.SIGN_UP_START, {
      device_id,
    });
  };
}

export default GATracking;
