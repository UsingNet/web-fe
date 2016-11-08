import { handleActions } from 'redux-actions';
import { changeRechargeMoney } from 'actions/recharge';

const recharge = handleActions({
  [`${changeRechargeMoney}`](state, action) {
    let disableBtn = true;

    if (action.payload > 0) {
      disableBtn = false;
    }

    return {
      ...state,
      rechargeMoney: action.payload,
      btnDisabled: disableBtn,
    };
  },
}, {
  rechargeMoney: 0,
  btnDisabled: true,
});

export default recharge;
