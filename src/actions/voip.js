import { createAction } from 'redux-actions';

export const getVoip = createAction('voip/get');
export const getVoipSuccess = createAction('voip/get/success');

export const applyVoip = createAction('voip/apply');

export const jumpToLastStep = createAction('voip/step/to/last');
export const backToStepThree = createAction('voip/step/to/three');
export const backToEdit = createAction('voip/edit');

export const updateVoipFields = createAction('voip/fields/update');

export const postVoip = createAction('voip/post');
