import { handleActions } from 'redux-actions';
import {
  setScrollHeight,
  setFetchQueryString,
  deleteFetchQueryString,
  changeSearchKeyword,
  changeModalTitle,
  toggleModalVisible,
  setEditContact,
  updateEditContact,
  getContactsSuccess,
} from 'actions/contact';

const contact = handleActions({
  [`${getContactsSuccess}`](state, action) {
    return {
      ...state,
      contacts: action.payload,
    };
  },

  [`${setScrollHeight}`](state, action) {
    return {
      ...state,
      scrollHeight: action.payload,
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

  [`${deleteFetchQueryString}`](state, action) {
    const copyQueryString = { ...state.querystring };
    delete copyQueryString[action.payload];

    return {
      ...state,
      querystring: copyQueryString,
    };
  },

  [`${changeSearchKeyword}`](state, action) {
    return {
      ...state,
      querystring: {
        ...state.querystring,
        query: action.payload,
        page: 1,
      },
    };
  },

  [`${changeModalTitle}`](state, action) {
    return {
      ...state,
      modalTitle: action.payload,
    };
  },

  [`${toggleModalVisible}`](state) {
    return {
      ...state,
      modalVisible: !state.modalVisible,
    };
  },

  [`${setEditContact}`](state, action) {
    return {
      ...state,
      editContact: {
        ...{ img: '//o1hpnn7d6.qnssl.com/default-avatar.png' },
        ...action.payload,
      },
    };
  },

  [`${updateEditContact}`](state, action) {
    const { fields } = action.payload;
    const propKey = Object.keys(fields)[0];

    return {
      ...state,
      editContact: {
        ...state.editContact,
        [propKey]: fields[propKey].value,
      },
    };
  },
}, {
  scrollHeight: 560,
  querystring: {},
  modalTitle: '',
  modalVisible: false,
  editContact: {
    img: '//o1hpnn7d6.qnssl.com/default-avatar.png',
  },
  contacts: {
    data: [],
    total: 0,
    current: 1,
    pageSize: 20,
  },
});

export default contact;
