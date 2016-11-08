import { handleActions } from 'redux-actions';
import * as AgentGroupActions from 'actions/agentGroup';

const agentGroup = handleActions({
  [`${AgentGroupActions.getAgentGroupSuccess}`](state, action) {
    return {
      ...state,
      group: action.payload,
    };
  },

  [`${AgentGroupActions.editAgentGroup}`](state, action) {
    return {
      ...state,
      editModalVisible: true,
      editGroup: action.payload,
    };
  },

  [`${AgentGroupActions.toggleEditModalVisible}`](state) {
    return {
      ...state,
      editModalVisible: !state.editModalVisible,
    };
  },

  [`${AgentGroupActions.updateGroupFields}`](state, action) {
    const { fields } = action.payload;
    const propKey = Object.keys(fields)[0];
    const value = fields[propKey].value;

    return {
      ...state,
      editGroup: {
        ...state.editGroup,
        [propKey]: value,
      },
    };
  },
}, {
  group: {
    currentPage: 1,
    data: [],
    perPage: 20,
    total: 0,
  },
  editModalVisible: false,
  editGroup: {
    users: [],
  },
});

export default agentGroup;
