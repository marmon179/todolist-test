import * as TasksActionCreator from './actionCreatorsTasks/index';
import * as TodoListActionCreator from './actionCreatorsTodoList/index';

export default {
  ...TodoListActionCreator,
  ...TasksActionCreator,
};
