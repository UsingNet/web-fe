import { handleActions } from 'redux-actions';
import { getHeadlineStatsSuccess, setFetchQueryString } from 'actions/overviewStats';

const overview = handleActions({
  [`${getHeadlineStatsSuccess}`](state, action) {
    return {
      ...state,
      overview: action.payload,
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
  overview: {
    key: [],
    message: {
      agent: [],
      contact: [],
    },
    order: {
      replied: [],
      unreplied: [],
    },
    first_responses: [],
    responses: [],
    sessions: [],
    from: {},
    evaluate: {},
    categories: {},
    orders: '0',
    messages: '0',
    reply_ratio: '0',
    answer_ratio: '0',
    first_response_avg: '0秒',
    response_avg: '0秒',
    session_avg: '0秒',
    relative_ratio: '0',
    absolute_ratio: '0',
  },

  querystring: {},
});

export default overview;
