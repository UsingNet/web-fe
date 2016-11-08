import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { message } from 'antd';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import { concatUrlWithParams } from 'modules/helpers';
import * as ComboActions from 'actions/combo';
import { getBaseSetting } from 'actions/baseSetting';

function* getPlans() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.account.plan);

  if (!errorMsg) {
    yield put(ComboActions.getComboPlansSuccess(jsonResult.data));
  }
}

function* getCurrentPlan() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.account.currentPlan);

  if (!errorMsg) {
    yield put(ComboActions.getCurrentPlanSuccess(jsonResult.data));
  }
}

function* getPlanCost() {
  const planState = state => state.combo.selectedPlan;
  const balanceState = state => state.baseSetting.balance;
  const plan = yield select(planState);
  const balance = yield select(balanceState);
  const params = {
    plan_id: plan.plan_id,
    agent_num: plan.agent_num,
    year: plan.year,
  };

  const url = concatUrlWithParams(ApiUrls.account.planCost, params);

  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    yield put(ComboActions.updatePlanCosts({ costs: jsonResult.costs, balance }));
  }
}

function* payComboPlan() {
  const planState = state => state.combo.selectedPlan;
  const costsState = state => state.combo.planCosts;
  const plan = yield select(planState);
  const costs = yield select(costsState);

  const data = {
    plan_id: plan.plan_id,
    agent_num: plan.agent_num,
    year: plan.year,
    name: plan.name,
    price: plan.price,
    costs,
  };

  const { errorMsg } = yield call(restHub.post, ApiUrls.account.plan, {
    body: data,
  });

  if (!errorMsg) {
    yield put(getBaseSetting());
    yield put(ComboActions.getCurrentPlan());
    yield put(ComboActions.toStep(0));
    message.success('套餐购买成功');
  } else {
    message.error('余额不足，支付失败。');
  }
}

function* watchPlansGet() {
  yield takeLatest(`${ComboActions.getComboPlans}`, getPlans);
}

function* watchCurrentPlanGet() {
  yield takeLatest(`${ComboActions.getCurrentPlan}`, getCurrentPlan);
}

function* watchCurrentPlanChange() {
  yield takeLatest(`${ComboActions.updatePlanFields}`, getPlanCost);
}

function* watchPlanPay() {
  yield takeLatest(`${ComboActions.payComboPlan}`, payComboPlan);
}

export default function* watchCombo() {
  yield fork(watchPlansGet);
  yield fork(watchCurrentPlanGet);
  yield fork(watchCurrentPlanChange);
  yield fork(watchPlanPay);
}
