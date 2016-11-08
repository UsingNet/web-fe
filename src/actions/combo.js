import { createAction } from 'redux-actions';

export const getComboPlans = createAction('combo/plans/get');
export const getComboPlansSuccess = createAction('combo/plans/get/success');
export const getCurrentPlan = createAction('combo/plan/current/get');
export const getCurrentPlanSuccess = createAction('combo/plan/current/get/success');

export const updatePlanFields = createAction('combo/plan/update');
export const updatePlanCosts = createAction('combo/plan/costs/update');

export const toStep = createAction('combo/to/step');
export const togglePayWithBalance = createAction('combo/pay/with/balance/toggle');
export const updateBalanceCosts = createAction('combo/balance/costs/update');

export const payComboPlan = createAction('combo/plan/pay');
