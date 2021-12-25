import { actionsTodolist } from './index';

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type TodolistActionsTypes = ReturnType<PropertiesType<typeof actionsTodolist>>;
