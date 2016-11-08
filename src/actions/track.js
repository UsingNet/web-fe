import { createAction } from 'redux-actions';

export const initTrack = createAction('stats/visitor/track/init');
export const getTrack = createAction('stats/visitor/track/get');
export const getTrackSuccess = createAction('stats/visitor/track/get/success');
export const getOrderTrackSuccess = createAction('order/track/get/success');
