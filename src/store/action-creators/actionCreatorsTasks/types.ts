import { initialTasksState } from '../../reducers/tasksReducer/tasksReducer';

import { actionsTasks } from './index';

export type InitialTasksState = typeof initialTasksState;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type TasksActionsTypes = ReturnType<PropertiesType<typeof actionsTasks>>;

// export type GetActionsTypes<T extends { [key: string]: (...args: any[]) => any }> =
//   ReturnType<PropertiesType<T>>;
