import React                  from 'react';
import _                      from 'lodash';
import { BaseText }           from '../../components/StyledText';
import API                    from '../../services/PlaceholderService';
import { wrapException }      from '../../utils/errors';
import { useAPI }             from '../../utils/hooks';
import LoadingSpinner         from '../../components/LoadingSpinner';
import { ErrorLabel }         from '../../components/Helpers';
import { View, ScrollView }   from 'react-native';
import { TodoList }           from '../../components/TodoList';

/**
 * Todo section of the profile
 *
 * @export
 */
export function TodoTab({ user }) {
  const [ todos, loading, error, retry ] = useAPI('loadTodosForUser', user.id);

  if (error) {
    return <ErrorLabel msg={error.message} retryCb={retry}></ErrorLabel>
  }

  return (
    <View>
      <LoadingSpinner loading={loading}></LoadingSpinner>
      <TodoList todos={todos}></TodoList>
    </View>
  )
}

export default TodoTab;