import ApiUrls from 'constants/ApiUrls';
import restHub from 'services/restHub';
import * as payActions from 'actions/pay';
import { call, put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

function* postPay({ payload }) {
  const fee = payload.fee;
  const mode = payload.mode;
  const type = payload.type;
  const remark = payload.remark;
  const { jsonResult, errorMsg } = yield call(restHub.post, ApiUrls.pay, {
    body: {
      mode,
      type,
      fee,
      remark,
    },
  });

  if (!errorMsg) {
    yield put(payActions.postPaySuccess(jsonResult));
  }
}

function* watchPayPost() {
  yield takeLatest(`${payActions.postPay}`, postPay);
}

export default function* watchPay() {
  yield fork(watchPayPost);
}
