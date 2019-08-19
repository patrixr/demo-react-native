import React                from 'react';
import API                  from '../services/PlaceholderService';
import {wrapException}      from '../utils/errors';
import {ErrorLabel}         from '../components/Helpers';
import LoadingSpinner       from '../components/LoadingSpinner';
import SwipeableCards       from '../components/SwipeableCards';
import Layout               from '../constants/Layout';
import { useAPI }           from '../utils/hooks';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

/**
 * Home Screen Component
 *
 * @param {Object} props
 * @returns
 */
export default function HomeScreen(props) {
  const { navigation } = props;

  const [ users, isLoading, error, retry ] = useAPI('loadUsers');

  // --- Display error
  if (error) {
    return <ErrorLabel msg={error.message} retryCb={retry}></ErrorLabel>
  }

  // --- Event handlers

  const navigate = (user) => {
    navigation.push('Profile', { user });
  };

  // --- Template
  return (
    <View style={styles.container}>
      <LoadingSpinner loading={isLoading}></LoadingSpinner>
      {
          users.length > 0 &&
            <SwipeableCards
              onSwipeRight={navigate}
              users={users}>
            </SwipeableCards>
      }
      <View style={[ styles.centered ]}>
        <Image
          style={{
            resizeMode: 'contain',
            height: 0.1 * Layout.window.height,
            marginTop: -150
          }}
          source={require('../assets/images/swipe.png')}
        />
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: 'Home',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
