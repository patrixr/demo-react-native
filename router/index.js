import { Platform }     from 'react-native';
import HomeScreen       from '../screens/HomeScreen';
import ProfileScreen    from '../screens/ProfileScreen/index';
import AlbumScreen      from '../screens/AlbumScreen';
import PostScreen      from '../screens/PostScreen';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      path: '/'
    },
    Profile: {
      screen: ProfileScreen,
      path: '/profile'
    },
    Album: {
      screen: AlbumScreen,
      path: '/album'
    },
    Post: {
      screen: PostScreen,
      path: '/post'
    }
  },
  config
);

export default createAppContainer(
  StackNavigator
);;
