import React                from 'react';
import { PhotoGrid }        from './PhotoGrid';
import { BaseText }         from './StyledText';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

/**
 * Displays a single album
 *
 * @export
 * @param {Object} props
 * @param {Object} props.album
 * @param {Number} props.limit
 * @param {Number} props.numColumns
 * @returns
 */
export function Album(props) {
  const { album, limit = 0, numColumns = 3 } = props;
  return (
    <TouchableWithoutFeedback {...props} >
      <View>
        <BaseText style={styles.albumTitle}> {album.title} </BaseText>
        <PhotoGrid photos={album.photos} limit={limit} numColumns={numColumns}></PhotoGrid>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  albumTitle: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgb(220,220,220)',
    padding: 10,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold'
  }
});
