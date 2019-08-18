import React, { useState }  from 'react';
import { UserAvatar }       from '../../components/Image';
import { TouchableOpacity } from 'react-native';
import { AlbumsTab }        from './AlbumsTab';
import { PostsTab }         from './PostsTab';
import { TodoTab }          from './TodoTab';
import { BaseText }         from '../../components/StyledText';
import {
  View,
  StyleSheet
} from 'react-native';

const TABS = [
  {
    name: 'Bucket List',
    component: TodoTab
  },
  {
    name: 'Albums',
    component: AlbumsTab
  },
  {
    name: 'Posts',
    component: PostsTab
  }
];

/**
 * User's info page
 *
 * @export
 * @param {*} props
 * @returns
 */
export default function ProfileScreen(props) {

  const { navigation }  = props;
  const user            = navigation.getParam('user');

  const [selectedTab, selectTab] = useState(0);

  const Content = TABS[selectedTab].component;

  return (
    <View style={styles.container}>

      {/* AVATAR */}
      <View style={[styles.centered, { height: 120, marginTop: 20 }]}>
        <UserAvatar style={{ height: 100, width: 100 }} circle={true} user={user}></UserAvatar>
        <BaseText>{user.name}</BaseText>
      </View>

      {/* CLICKABLE TABS */}
      <View style={[styles.spaced, styles.centered, styles.tabs]}>
        {
          TABS.map((tab, key) => {
            const selected = selectedTab === key;
            const selectedStyle = selected ? styles.selected : {}

            return (
              <TouchableOpacity
                key={key}
                onPress={() => selectTab(key)}
                style={{ ...styles.tab, width: `${100/TABS.length}%` }}
              >
                <BaseText style={selectedStyle}>{tab.name}</BaseText>
              </TouchableOpacity>
            );
          })
        }
      </View>

      {/* TAB CONTENT */}
      <View>
        <Content user={user} {...props}></Content>
      </View>
    </View>
  );
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row'
  },
  selected: {
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  spaced: {
    marginTop: 20
  },
  tab: {
    padding: 20,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: 'rgb(220,220,220)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
