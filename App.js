import { AppLoading }           from 'expo';
import { Asset }                from 'expo-asset';
import * as Font                from 'expo-font';
import React, { useState }      from 'react';
import { Ionicons }             from '@expo/vector-icons';
import _                        from 'lodash';
import Router                   from './router'
import {
  Platform,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

/**
 * Main application component
 *
 * @export
 * @param {*} props
 */
export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={_.partial(setLoadingComplete, true)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Router />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/swipe.png')
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      'roboto': require('./assets/fonts/Roboto-Regular.ttf')
    }),
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
