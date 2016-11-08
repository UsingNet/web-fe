import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import { concatUrlWithParams } from 'modules/helpers';
import * as ExpenseRecordActions from 'actions/expenseRecord';

function* getExpenseRecord() {
  const getQuerystring = state => state.expenseRecord.querystring;
  const querystring = yield select(getQuerystring);
  const url = concatUrlWithParams(ApiUrls.account.bill, querystring);

  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    yield put(ExpenseRecordActions.getExpenseRecordSuccess(jsonResult));
  }
}

export default function* watchExpenseRecordGet() {
  yield takeLatest(`${ExpenseRecordActions.getExpenseRecord}`, getExpenseRecord);
}
