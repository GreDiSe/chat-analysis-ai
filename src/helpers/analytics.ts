import analytics from '@react-native-firebase/analytics';

export const analyticsLogScreenEvent = (currentRouteName: any) => {
  analytics().logScreenView({
    screen_name: currentRouteName,
    screen_class: currentRouteName,
  });
};
