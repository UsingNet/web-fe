import { handleActions } from 'redux-actions';
import * as payActions from 'actions/pay';

const pay = handleActions({
  [`${payActions.postPaySuccess}`](state, action) {
    return {
      ...state,
      pay: action.payload,
    };
  },
}, {
  pay: {},
});


export default pay;
