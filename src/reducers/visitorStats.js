import { handleActions } from 'redux-actions';
import * as VisitorStatsActions from 'actions/visitorStats';

const visitor = handleActions({
  [`${VisitorStatsActions.getVisitStatsSuccess}`](state, action) {
    return {
      ...state,
      visitorStats: action.payload,
    };
  },

  [`${VisitorStatsActions.setScrollHeight}`](state, action) {
    return {
      ...state,
      scrollHeight: action.payload,
    };
  },

  [`${VisitorStatsActions.setFetchQueryString}`](state, action) {
    return {
      ...state,
      querystring: {
        ...state.querystring,
        ...action.payload,
      },
    };
  },

  [`${VisitorStatsActions.deleteFetchQueryString}`](state, action) {
    const copyQueryString = Object.assign({}, state.querystring);
    delete copyQueryString[action.payload];

    return {
      ...state,
      querystring: copyQueryString,
    };
  },
}, {
  visitorStats: {
    total: 0,
    currentPage: 1,
    perPage: 20,
    data: [],
  },
  querystring: {},
  scrollHeight: 576,
});

export default visitor;
