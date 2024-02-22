import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();
export const navigationActions = {
  navigate(name: string, params: any) {
    console.log(navigationRef.isReady(), navigationRef.getCurrentRoute());
    if (navigationRef.isReady()) {
      const currentRoute = navigationRef.getCurrentRoute();
      if (currentRoute?.name && currentRoute.name === name) {
        // navigationRef.setParams(params);
        navigationRef.dispatch(StackActions.replace(name, params));
      } else {
        // @ts-ignore
        navigationRef.navigate<Routes>(name, params);
      }
    }
  },
  push(name: string, params: any) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params));
    }
  },
  goBack() {
    if (navigationRef.isReady()) {
      navigationRef.goBack();
    }
  },
};
