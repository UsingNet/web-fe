import { createAction } from 'redux-actions';

export const connect = createAction('socket/connect');
export const disconnect = createAction('socket/disconnect');
