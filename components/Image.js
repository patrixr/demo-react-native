import React      from 'react';
import { Image }  from 'react-native';

/**
 * The user's profile picture
 *
 * @export
 * @param {Object} props.style
 * @param {User} props.user
 * @param {Boolean} props.circle
 * @returns
 */
export function UserAvatar({ user, circle = false, style = {} }) {
  const radius = circle ? 100 : 20;
  return (
    <Image
      style={{ resizeMode: "cover", borderRadius: radius, flex: 1, ...style }}
      source={{ uri: `https://api.adorable.io/avatars/350/${user.email}`}}
    />
  );
}