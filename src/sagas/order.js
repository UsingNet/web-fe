import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { message } from 'antd';
import { push } from 'react-router-redux';
import ApiUrls from 'constants/ApiUrls';
import restHub from 'services/restHub';
import * as OrderActions from 'actions/order';

function* getOrder({ payload }) {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.order.list);

  if (!errorMsg) {
    yield put(OrderActions.getOrderSuccess(jsonResult.data));

    if (payload) {
      if (payload.type === 'getNew') {
        yield put(OrderActions.afterGetNewOrder(jsonResult.data));
      } else if (payload.type === 'launch') {
        yield put(push(`/chat/${payload.orderId}`));
      }
    }
  }
}

function* watchOrderGet() {
  yield takeLatest(`${OrderActions.getOrder}`, getOrder);
}

function* afterGetNewOrder({ payload }) {
  const newOrderIdState = state => state.order.newOrderId;
  const orderId = yield select(newOrderIdState);
  const order = payload.find(o => o.id === orderId) || {};
  yield put(OrderActions.setSelectedOrder(order));
}

function* watchNewOrderGet() {
  yield takeLatest(`${OrderActions.afterGetNewOrder}`, afterGetNewOrder);
}

function* shiftOrder(action) {
  const { orderId, userId } = action.payload;
  const { errorMsg } = yield call(restHub.post, ApiUrls.order.shift, {
    body: {
      user_id: userId,
      order_id: orderId,
    },
  });
  if (!errorMsg) {
    yield put(OrderActions.shiftOrderSuccess(orderId));
  }
}

function* watchOrderShift() {
  yield takeLatest(`${OrderActions.shiftOrder}`, shiftOrder);
}

function* closeOrder(action) {
  const orderState = state => state.order.orders;
  const url = `${ApiUrls.order.list}/${action.payload}`;
  const { errorMsg } = yield call(restHub.remove, url);

  if (!errorMsg) {
    const id = parseInt(action.payload, 10);
    const orders = yield select(orderState);
    const orderIndex = orders.findIndex(o => o.id === id);
    yield put(OrderActions.closeOrderSuccess(id));

    let prevOrder = {};

    if (orderIndex === 0) {
      prevOrder = orders[orderIndex + 1];
    } else {
      prevOrder = orders[orderIndex - 1];
    }
    if (prevOrder) {
      yield put(OrderActions.setSelectedOrder(prevOrder));
      yield put(push(`/chat/${prevOrder.id}`));
    }
  }
}

function* watchOrderClose() {
  yield takeLatest(`${OrderActions.closeOrder}`, closeOrder);
}

function* putOrder(action) {
  const { id, data } = action.payload;
  const url = `${ApiUrls.order.list}/${id}`;

  const { errorMsg, jsonResult } = yield call(restHub.put, url, {
    body: data,
  });

  if (!errorMsg) {
    yield put(OrderActions.updateSelectedOrder(jsonResult.data));
    yield put(OrderActions.updateCategory(jsonResult.data.category || {}));
    message.success('修改成功');
  }
}

function* watchOrderPut() {
  yield takeLatest(`${OrderActions.putOrder}`, putOrder);
}

function* getOrderCategory() {
  const { errorMsg, jsonResult } = yield call(restHub.get, ApiUrls.order.category);

  if (!errorMsg) {
    yield put(OrderActions.getOrderCategorySuccess(jsonResult.data));
  }
}

function* watchOrderCategoryGet() {
  yield takeLatest(`${OrderActions.getOrderCategory}`, getOrderCategory);
}

function* launchChat(action) {
  const { errorMsg, jsonResult } = yield call(restHub.post, ApiUrls.order.launch, {
    body: action.payload,
  });

  if (!errorMsg) {
    yield put(OrderActions.getOrder({
      type: 'launch',
      orderId: jsonResult.data.id,
    }));
  }
}

function* watchOrderChatLaunch() {
  yield takeLatest(`${OrderActions.launchChat}`, launchChat);
}

export default function* watchOrder() {
  yield fork(watchOrderGet);
  yield fork(watchOrderShift);
  yield fork(watchOrderClose);
  yield fork(watchOrderCategoryGet);
  yield fork(watchOrderPut);
  yield fork(watchNewOrderGet);
  yield fork(watchOrderChatLaunch);
}
