import React                        from 'react';
import { StyleSheet, View, Image }  from 'react-native';
import {BaseText}                   from './StyledText';
import {Ionicons}                   from '@expo/vector-icons';
import {UserAvatar}                 from './Image';

/**
 * User cards
 *
 * @export
 * @param {Object} props
 * @param {Object} props.user The user record
 * @returns
 */
export default function Card({ user }) {
  return (
    <View style={{ flex: 1 }}>
      <UserAvatar user={user}></UserAvatar>
      <View style={[styles.userName]}>
        <Ionicons
          style={styles.infoIcon}
          name={'ios-swap'}
          size={25}
        />
        <BaseText style={[styles.whiteText]}>
          { user.name }
        </BaseText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userName: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    color: 'white',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  whiteText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  infoIcon: {
    color: 'white',
    marginRight: 10
  }
});
