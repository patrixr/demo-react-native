import React                from 'react';
import { PRIMARY_COLOR }    from '../constants/Colors';
import {
  Image,
  View,
  FlatList,
  StyleSheet
} from 'react-native';

/**
 * Creates a grid of images
 *
 * @export
 * @param {Object} props
 * @param {Number} props.limit
 * @param {Number} props.numColumns
 * @param {Object[]} props.photos
 * @returns
 */
export function PhotoGrid({ photos, limit = 0, numColumns = 3 }) {
  const data = limit > 0 ? photos.slice(0, limit) : photos;

  return (
    <View>
      <FlatList
        data={data}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
            <Image style={styles.imageThumbnail} source={{
              uri: item.thumbnailUrl
            }} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  showMoreLink: {
    textAlign: 'center',
    color: PRIMARY_COLOR
  }
});