import { handleActions } from 'redux-actions';
import {
  setScrollHeight,
  setFetchQueryString,
  deleteFetchQueryString,
  toggleRecordOpen,
  setOpenedOrder,
  setAction,
} from 'actions/history';

const history = handleActions({
  [`${setScrollHeight}`](state, action) {
    return {
      ...state,
      scrollHeight: action.payload,
    };
  },

  [`${setFetchQueryString}`](state, action) {
    const newQueryString = {
      ...state.querystring,
      ...action.payload,
    };

    return {
      ...state,
      querystring: newQueryString,
    };
  },

  [`${deleteFetchQueryString}`](state, action) {
    const copyQueryString = Object.assign({}, state.querystring);
    delete copyQueryString[action.payload];

    return {
      ...state,
      querystring: copyQueryString,
    };
  },

  [`${toggleRecordOpen}`](state, action) {
    return {
      ...state,
      isRecordOpen: action.payload,
    };
  },

  [`${setOpenedOrder}`](state, action) {
    return {
      ...state,
      openedOrder: action.payload,
    };
  },

  [`${setAction}`](state, action) {
    return {
      ...state,
      action: action.payload,
    };
  },
}, {
  scrollHeight: 560,
  querystring: {},
  isRecordOpen: false,
  openedOrder: {
    contact: {
      name: '',
      package: {},
    },
  },
  action: 'row',
});

export default history;
