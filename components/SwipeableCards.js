import _                                  from 'lodash';
import React                              from 'react';
import { View,  Animated, PanResponder }  from 'react-native';
import Layout                             from '../constants/Layout';
import Card                               from './Card';

const CARD_DROP_THRESHHOLD  = 120;
const WINDOW_WIDTH          = Layout.window.width;
const WINDOW_HEIGHT         = Layout.window.height;

/**
 * A deck of swipable user cards
 *
 * @export
 * @class SwipeableCards
 * @extends {React.Component}
 */
export default class SwipeableCards extends React.Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();

    this.state = { curIndex: 0 };

    //
    // Based on the distance the card travels to either edge of the screen
    // We update a set of CSS values to apply animations
    //
    const interpolateMovementTo = (lowVal, midVal, highVal) => {
      return this.position.x.interpolate({
        inputRange: [-WINDOW_WIDTH, 0, WINDOW_WIDTH],
        outputRange: [lowVal, midVal, highVal],
        extrapolate: 'clamp'
      });
    }

    this.rotation = interpolateMovementTo('-10deg', '0deg', '10deg');
    this.opacity = interpolateMovementTo(1, 0, 1);
    this.scale = interpolateMovementTo(1, 0.8, 1);
  }

  /**
   * Lifecycle hook, called at creation
   *
   * @memberof SwipeableCards
   */
  componentWillMount() {
    this.panMovement = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true
      },
      onPanResponderMove: (evt, gesture) => {
        this.updateCardPosition(gesture);
        return true;
      },
      onPanResponderRelease: (evt, gesture) => {
        this.onCardRelease(gesture);
        return true;
      }
    })
  }

  /**
   * Displays the next card in the deck
   *
   * @memberof SwipeableCards
   */
  switchCards() {
    this.setState({ curIndex: this.state.curIndex + 1 }, () => {
      this.position.setValue({ x: 0, y: 0 })
    });
  }

  getCurrentUser() {
    const { users } = this.props;
    return users[this.state.curIndex % users.length];
  }

  getNextUser() {
    const { users } = this.props;
    return users[(this.state.curIndex + 1) % users.length];
  }

  /**
   * Throws the card to either side of the screen
   *
   * @param {*} side
   * @param {*} { dx, dy }
   * @memberof SwipeableCards
   */
  dropCard(side, { dx, dy }) {
    const y = dy;
    const x = (side === "left" ? -1 : 1) *
      (WINDOW_WIDTH + CARD_DROP_THRESHHOLD);

    const {
      onSwipeRight = _.noop,
      onSwipeLeft = _.noop
    } = this.props;

    const callback = side == "left" ? onSwipeLeft : onSwipeRight;
    const currentUser = this.getCurrentUser();

    Animated.spring(
      this.position,
      {
        speed: 1000,
        toValue: { x, y }
      }
    ).start(() => {
      this.switchCards();
      callback(currentUser);
    });
  }

  /**
   * Event: The user has released the card on either side of the screen
   *
   * @param {*} gesture
   * @returns
   * @memberof SwipeableCards
   */
  onCardRelease(gesture) {
    const { dx } = gesture;
    if (dx > CARD_DROP_THRESHHOLD) {
      return this.dropCard('right', gesture);
    }
    if (dx < -CARD_DROP_THRESHHOLD) {
      return this.dropCard('left', gesture);
    }

    this.recenterCard();
  }

  /**
   * Moves the top card of the deck back to the center
   *
   * @memberof SwipeableCards
   */
  recenterCard() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 },
      friction: 4
    }).start();
  }

  /**
   * Sets the absolute position of the top card of the deck
   *
   * @param {*} { dx, dy }
   * @memberof SwipeableCards
   */
  updateCardPosition({ dx, dy }) {
    this.position.setValue({ x: dx, y: dy });
  }

  /**
   * Render method
   *
   * @returns
   * @memberof SwipeableCards
   */
  render() {
    // Only need to display the 2 top cards
    const usersToRender = [
      this.getCurrentUser(),
      this.getNextUser()
    ];

    return (
      <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {
              usersToRender.map((user, idx) => {
                const isTopCard =  idx === 0;

                const panHandlers = isTopCard ?
                  this.panMovement.panHandlers : {};

                const transforms = isTopCard ?
                  {
                    // Apply swipe animation to top card
                    transform: [
                      { rotate: this.rotation },
                      ...this.position.getTranslateTransform()
                    ]
                  }
                  : {
                    // Apply opacity change to card right behind
                    opacity: this.opacity,
                    transform: [{ scale: this.scale }],
                  }

                return (
                  <Animated.View
                  {...panHandlers}
                  key={user.id}
                  style={[
                    transforms,
                    {
                      height: WINDOW_HEIGHT * 0.75,
                      width: WINDOW_WIDTH,
                      padding: 10,
                      position:'absolute'
                    }
                  ]}
                  >
                    <Card user={user}></Card>
                  </Animated.View>
                )
              }).reverse()
          }
          </View>
          <View style={{ height: 60 }} />
        </View>
    )
  }
}