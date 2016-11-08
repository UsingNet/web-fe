import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerReducer as routing, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import reducers from 'reducers/index';
import SagaManager from 'sagas/SagaManager';

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const enhancer = compose(
  applyMiddleware(
    sagaMiddleware,
    routerMiddleware(browserHistory)
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(combineReducers({
  ...reducers, routing,
}), initialState, enhancer);

SagaManager.startSagas(sagaMiddleware);

if (module.hot) {
  /* eslint-disable no-shadow, global-require */
  module.hot.accept('../reducers', () => {
    const reducers = require('../reducers');
    const combinedReducers = combineReducers({ ...reducers, routing });
    store.replaceReducer(combinedReducers);
  });
  module.hot.accept('../sagas/SagaManager', () => {
    SagaManager.cancelSagas(store);
    require('../sagas/SagaManager').default.startSagas(sagaMiddleware);
  });
  /* eslint-enable no-shadow, global-require */
}

export default store;
