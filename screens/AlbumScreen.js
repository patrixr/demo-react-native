import React          from 'react';
import { Album }      from '../components/Album';
import { ScrollView } from 'react-native';

/**
 * Displays all the photos of the album
 *
 * @export
 * @param {*} props.navigation
 * @returns
 */
export function AlbumScreen({ navigation }) {
  const album = navigation.getParam('album');

  return (
    <ScrollView>
      <Album album={album} limit={0} numColumns={2}></Album>
    </ScrollView>
  );
}

AlbumScreen.navigationOptions = {
  title: 'Album',
};

export default AlbumScreen
