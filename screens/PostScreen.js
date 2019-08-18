import React                    from 'react';
import _                        from 'lodash';
import { Spacing }              from '../components/Helpers';
import { Comment , Post }       from '../components/Post';
import { PRIMARY_COLOR }        from '../constants/Colors';
import {
  BoldText,
  BaseText,
  InfoText
} from '../components/StyledText';
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native';


/**
 * Displays an entire post with its comments
 *
 * @export
 * @returns
 */
export function PostScreen({ navigation }) {
  const post = navigation.getParam('post');
  const user = navigation.getParam('user');

  const lines = post.body.split('\n').map(line => {
    return line.charAt(0).toUpperCase() + line.slice(1);
  });

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>

        {/* Article */}
        <Post post={post} author={user}></Post>

        {/* COMMENTS */}
        <InfoText style={{ fontSize: 15 }}>Comments</InfoText>

        {
          _.map(post.comments, (cm) => {
            return <Comment key={cm.id} comment={cm}></Comment>
          })
        }

      </View>
    </ScrollView>
  );
}

PostScreen.navigationOptions = {
  title: 'Post'
};

export default PostScreen
