import { handleActions } from 'redux-actions';
import { getAppsSuccess, getAppSuccess } from 'actions/appstore';

const apps = handleActions({
  [`${getAppsSuccess}`](state, action) {
    return {
      ...state,
      apps: action.payload,
    };
  },

  [`${getAppSuccess}`](state, action) {
    return {
      ...state,
      link: action.payload,
    };
  },
}, {
  apps: [],
  link: '',
});

export default apps;
