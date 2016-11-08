import { handleActions } from 'redux-actions';
import * as AgentStatsActions from 'actions/agentStats';

const agent = handleActions({
  [`${AgentStatsActions.getAgentStatsSuccess}`](state, action) {
    return {
      ...state,
      agentStats: {
        ...state.agentStats,
        ...action.payload,
      },
    };
  },

  [`${AgentStatsActions.setScrollHeight}`](state, action) {
    return {
      ...state,
      scrollHeight: action.payload,
    };
  },

  [`${AgentStatsActions.setFetchQueryString}`](state, action) {
    return {
      ...state,
      querystring: {
        ...state.querystring,
        ...action.payload,
      },
    };
  },

  [`${AgentStatsActions.deleteFetchQueryString}`](state, action) {
    const copyQueryString = Object.assign({}, state.querystring);
    delete copyQueryString[action.payload];

    return {
      ...state,
      querystring: copyQueryString,
    };
  },

  [`${AgentStatsActions.setExpandedRowkeys}`](state, action) {
    return {
      ...state,
      expandedRowKeys: action.payload,
    };
  },

  [`${AgentStatsActions.setAgentId}`](state, action) {
    return {
      ...state,
      agentId: action.payload,
    };
  },

  [`${AgentStatsActions.getAgentHeadlineSuccess}`](state, action) {
    return {
      ...state,
      overview: action.payload,
    };
  },

  [`${AgentStatsActions.getAgentAttendanceSuccess}`](state, action) {
    return {
      ...state,
      attendance: action.payload,
    };
  },
}, {
  agentStats: {
    data: [],
    total: 0,
    current: 1,
    perPage: 20,
  },
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
  attendance: [],
  scrollHeight: 576,
  querystring: {},
  agentId: 0,
  expandedRowKeys: [],
});

export default agent;
