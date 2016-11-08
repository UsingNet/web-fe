import { handleActions } from 'redux-actions';
import { getStatsOrderSuccess } from 'actions/order';

const statsOrder = handleActions({
  [`${getStatsOrderSuccess}`](state, action) {
    return action.payload;
  },
}, {
  data: [],
  total: 0,
  current: 1,
  pageSize: 20,
});

export default statsOrder;
