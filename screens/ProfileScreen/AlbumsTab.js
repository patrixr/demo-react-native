import React                from 'react';
import API                  from '../../services/PlaceholderService';
import { wrapException }    from '../../utils/errors';
import LoadingSpinner       from '../../components/LoadingSpinner';
import { ScrollView }       from 'react-native';
import { ErrorLabel }       from '../../components/Helpers';
import { Album }            from '../../components/Album';
import { View }             from 'react-native';
import { useAPI }           from '../../utils/hooks';

/**
 * Displays clickable previews of the albums
 *
 * @export
 * @param {Object} props.user The user whose albums will be listed
 * @returns
 */
export function AlbumsTab({ user, navigation }) {

  const [ albums, isLoading, error, retry ] = useAPI('loadUserAlbums', user.id);

  // --- Check for errors
  if (error) {
    return <ErrorLabel msg={error.message} retryCb={retry}></ErrorLabel>
  }

  // --- Callbacks

  const openAlbum = (album) => {
    navigation.push('Album', { album });
  };

  // --- Render template
  return (
    <View>
      <LoadingSpinner loading={isLoading}></LoadingSpinner>
      <ScrollView>
        {
          albums.map(alb => (
            <Album
              onPress={() => openAlbum(alb)}
              key={alb.id}
              album={alb}
              limit={3}>
            </Album>
          ))
        }
        <View style={{ height: 300 }}></View>
      </ScrollView>
    </View>
  );
}
