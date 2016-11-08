import { handleActions } from 'redux-actions';
import * as MemberActions from 'actions/member';

const member = handleActions({
  [`${MemberActions.getMemberSuccess}`](state, action) {
    return {
      ...state,
      members: action.payload,
    };
  },

  [`${MemberActions.setEditMember}`](state, action) {
    return {
      ...state,
      editMember: action.payload,
    };
  },

  [`${MemberActions.updateEditMember}`](state, action) {
    const { fields } = action.payload;
    const propKey = Object.keys(fields)[0];

    return {
      ...state,
      editMember: {
        ...state.editMember,
        [propKey]: fields[propKey].value,
      },
    };
  },

  [`${MemberActions.toggleModalVisible}`](state) {
    return {
      ...state,
      modalVisible: !state.modalVisible,
    };
  },
}, {
  modalVisible: false,
  editMember: {},
  members: [],
});

export default member;
