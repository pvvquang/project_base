/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import '@/utils/yup';

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import store from '@/store/store';
import {Provider as StoreProvider} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/navigation';
import {ThemeProvider} from '@rneui/themed';
import themes from '@/themes';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={themes.config}>
        <SafeAreaProvider style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Navigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
