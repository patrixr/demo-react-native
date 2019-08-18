
import React                    from 'react';
import { PRIMARY_COLOR }        from '../constants/Colors';
import { Spacing }              from './Helpers';
import { StyleSheet, View }     from 'react-native';
import {
  InfoText, BoldText,
  Paragraph, BaseText
} from './StyledText';



/**
 * Displays the content of a post
 *
 * @export
 * @param {Post} props.post
 * @param {User} props.author
 * @returns
 */
export function Post({ post, author }) {
  return (
    <View>
      {/* TITLE */}
      <BoldText style={styles.title}>{ post.title }</BoldText>

      <Spacing/>

      {/* BODY */}
      <Paragraph text={post.body}></Paragraph>

      {/* SIGNATURE */}
      {
        author && (
          <View>
            <BaseText style={styles.body}>Yours Truly</BaseText>
            <BaseText style={styles.body}>{author.name}</BaseText>
          </View>
        )
      }

      <Spacing/>
    </View>
  );
}

/**
 * Displays a user's comment
 *
 * @export
 * @param {Comment} props.comment
 */
export function Comment({ comment }) {
  return (
    <View>
      <Paragraph text={comment.body} style={styles.comment}/>
      <InfoText style>Author: { comment.email }</InfoText>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    color: PRIMARY_COLOR,
    textTransform: 'capitalize',
  },
  body: {
    fontSize: 16,
    marginBottom: 10
  },
  comment: {
    fontSize: 13,
    marginBottom: 2
  }
});