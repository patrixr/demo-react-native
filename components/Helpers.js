import React            from 'react';
import { BaseText }     from './StyledText';
import _                from 'lodash';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

/**
 * A white space used to separate components
 *
 * @export
 * @param {String} props.size The size of the space (sm, md, lg)
 * @returns
 */
export function Spacing({ size = 'md' }) {
  const height = {
    sm: 10,
    md: 20,
    lg: 30
  }[size] || 20;
  return <View style={{ height: height }}></View>
}

/**
 * Small error message that sticks to the bottom and allows retries
 *
 * @export
 * @param {Object} props
 * @param {String} props.msg
 * @param {Function} props.retryCb
 * @returns
 */
export function ErrorLabel({ msg, retryCb }) {
  const retry = retryCb || _.noop;

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={retry}>
        <View>
          <BaseText style={styles.textHighlight}>
            { msg || 'An error occured' }
          </BaseText>
          { retryCb && <BaseText style={styles.textAligned}> Tap to retry </BaseText> }
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
  },
  textAligned: {
    textAlign: 'center'
  },
  textHighlight: {
    backgroundColor: 'rgba(0,0,0,0.01)',
    borderRadius: 3,
    paddingHorizontal: 4,
    color: 'rgba(96,100,109, 0.8)'
  }
});