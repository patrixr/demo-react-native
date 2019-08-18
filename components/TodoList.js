import React                  from 'react';
import _                      from 'lodash';
import { BaseText }           from './StyledText';
import { Ionicons }           from '@expo/vector-icons';
import { PRIMARY_COLOR }      from '../constants/Colors';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

/**
 * Good ol' todo list
 *
 * @export
 * @param {Todo[]} props.todos
 * @returns
 */
export function TodoList({ todos }) {
  return (
    <ScrollView>
      {
        _.map(todos, (todo) => {
          return (
            <View key={todo.id} style={[styles.padded, styles.row]}>
              <Ionicons
                color={todo.completed ? PRIMARY_COLOR : 'gray'}
                name={
                  todo.completed ?
                    'md-checkmark-circle-outline' :
                    'md-close-circle'
                }
                size={25}
              />
              <BaseText style={styles.todoText}>{todo.title}</BaseText>
            </View>
          );
        })
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  padded: {
    padding: 20
  },
  row: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgb(220,220,220)',
  },
  todoText: {
    paddingLeft: 20,
    flex: 1,
    textTransform: 'capitalize',
    fontWeight: 'bold'
  }
});