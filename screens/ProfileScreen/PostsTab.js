import React               from 'react';
import { BaseText }        from '../../components/StyledText';
import API                 from '../../services/PlaceholderService';
import { wrapException }   from '../../utils/errors';
import LoadingSpinner      from '../../components/LoadingSpinner';
import { ErrorLabel }      from '../../components/Helpers';
import { Ionicons }        from '@expo/vector-icons';
import { useAPI }          from '../../utils/hooks';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_LIGHT
} from '../../constants/Colors';

export function PostsTab({ user, navigation }) {
  // ---- Hooks

  const [ posts, isLoading, error, retry ] = useAPI('loadUserPosts', user.id);

  // ---- Error handling
  if (error) {
    return <ErrorLabel msg={error.message} retryCb={retry}></ErrorLabel>
  }

  // ---- Events

  const openPost = (post) => {
    navigation.push('Post', { post, user });
  };

  return (
    <View>
      {/* SPINNER */}
      <LoadingSpinner loading={isLoading}></LoadingSpinner>

      {/* POSTS */}
      <ScrollView>
        {
          posts.map(post => {
            return (
              <TouchableOpacity key={post.id} onPress={() => openPost(post)}>
                <View style={{ flexDirection: 'row', padding: 20 }}>
                  <Ionicons
                    color={PRIMARY_COLOR_LIGHT}
                    name={'md-paper'}
                    size={35}
                  />
                  <BaseText style={styles.postTitle}> {post.title} </BaseText>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  postTitle: {
    paddingLeft: 10,
    textAlign: 'left',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: PRIMARY_COLOR
  }
});
