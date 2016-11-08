import { handleActions } from 'redux-actions';
import { changeTab } from 'actions/statistics';

const statistics = handleActions({
  [`${changeTab}`](state, action) {
    return {
      ...state,
      activeTab: action.payload,
    };
  },
}, {
  activeTab: '',
});

export default statistics;
