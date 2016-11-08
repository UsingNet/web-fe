import { handleActions } from 'redux-actions';
import { setTabTimeout } from 'actions/tabTimeout';

const timeout = handleActions({
  [`${setTabTimeout}`](state, action) {
    return action.payload;
  },
}, false);

export default timeout;
