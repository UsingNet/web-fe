import { handleActions } from 'redux-actions';
import * as SmsActions from 'actions/sms';

const sms = handleActions({
  [`${SmsActions.getSmsSettingSuccess}`](state, action) {
    return {
      ...state,
      sms: action.payload,
      origin_signature: action.payload.signature,
    };
  },

  [`${SmsActions.getSmsTemplatesSuccess}`](state, action) {
    return {
      ...state,
      templates: action.payload,
    };
  },

  [`${SmsActions.updateSmsFormFields}`](state, action) {
    const { fields } = action.payload;
    const propKey = Object.keys(fields)[0];
    const value = fields[propKey].value;
    let isDisabled = false;

    if (value === state.origin_signature) {
      isDisabled = true;
    }

    return {
      ...state,
      sms: {
        ...state.sms,
        [propKey]: value,
      },
      submitDisabled: isDisabled,
    };
  },

  [`${SmsActions.toggleModalVisible}`](state) {
    return {
      ...state,
      modalVisible: !state.modalVisible,
    };
  },

  [`${SmsActions.changeModalTitle}`](state, action) {
    return {
      ...state,
      modalTitle: action.payload,
    };
  },

  [`${SmsActions.changeEditingTemplate}`](state, action) {
    return {
      ...state,
      editingTemplate: action.payload,
    };
  },

  [`${SmsActions.updateEditingTemplateFields}`](state, action) {
    const { fields } = action.payload;
    const propKey = Object.keys(fields)[0];
    const value = fields[propKey].value;

    return {
      ...state,
      editingTemplate: {
        ...state.editingTemplate,
        [propKey]: value,
      },
    };
  },
}, {
  sms: {
    signature: '',
    status: '',
    failMessage: '',
  },
  templates: [],
  modalTitle: '',
  modalVisible: false,
  editingTemplate: {},
  origin_signature: '',
  submitDisabled: true,
});

export default sms;
