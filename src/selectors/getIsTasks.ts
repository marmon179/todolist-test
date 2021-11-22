import { AppRootStateType } from '../store/store';
import { TasksStateType } from '../types/types';

export const getIsTasks = (state: AppRootStateType): TasksStateType => state.tasks;
