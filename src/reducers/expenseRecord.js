import { handleActions } from 'redux-actions';
import {
  getExpenseRecordSuccess,
  setScrollHeight,
  setFetchQueryString,
} from 'actions/expenseRecord';

const expense = handleActions({
  [`${getExpenseRecordSuccess}`](state, action) {
    return {
      ...state,
      ...action.payload,
    };
  },

  [`${setScrollHeight}`](state, action) {
    return {
      ...state,
      scrollHeight: action.payload,
    };
  },

  [`${setFetchQueryString}`](state, action) {
    return {
      ...state,
      querystring: {
        ...state.querystring,
        ...action.payload,
      },
    };
  },
}, {
  currentPage: 1,
  data: [],
  perPage: 20,
  total: 0,
  scrollHeight: 560,
  querystring: {},
});

export default expense;
