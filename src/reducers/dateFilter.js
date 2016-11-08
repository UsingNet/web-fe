import { handleActions } from 'redux-actions';
import { togglePickerHighlight, setActiveDateButton } from 'actions/dateFilter';

const dateFilter = handleActions({
  [`${togglePickerHighlight}`](state, action) {
    return {
      ...state,
      highlight: action.payload,
    };
  },

  [`${setActiveDateButton}`](state, action) {
    return {
      ...state,
      activeBtn: action.payload,
    };
  },
}, {
  highlight: false,
  activeBtn: 1,
});

export default dateFilter;
