import { handleActions } from 'redux-actions';
import {
  getVoipSuccess,
  jumpToLastStep,
  backToStepThree,
  backToEdit,
  updateVoipFields,
} from 'actions/voip';

const voip = handleActions({
  [`${getVoipSuccess}`](state, action) {
    // const { status } = action.payload;
    // let currentStep = 0;
    //
    // switch (status) {
    //   case 'INIT':
    //     currentStep = 0;
    //     break;
    //   case 'CHECKING':
    //     currentStep = 1;
    //     break;
    //   case 'SUCCESS':
    //     currentStep = 3;
    //     break;
    //   default:
    //     break;
    // }

    return {
      ...state,
      voip: action.payload,
      checkFiles: action.payload.display_number_files.map((e, i) => {
        const list = e;
        list.uid = i;
        list.name = e.name;
        list.status = 'done';
        list.thumbUrl = e.url;
        return list;
      }),
      // currentStep,
    };
  },

  [`${jumpToLastStep}`](state) {
    return {
      ...state,
      currentStep: 3,
      showEditorForm: !(state.voip.display_number_status === 'CHECKING'),
    };
  },

  [`${backToStepThree}`](state) {
    return {
      ...state,
      currentStep: 2,
    };
  },

  [`${backToEdit}`](state) {
    return {
      ...state,
      showEditForm: true,
    };
  },

  [`${updateVoipFields}`](state, action) {
    const { fields } = action.payload;
    const propKey = Object.keys(fields)[0];

    if (propKey === 'checkFiles') {
      return {
        ...state,
        [propKey]: fields[propKey].value,
      };
    }

    return {
      ...state,
      voip: {
        ...state.voip,
        [propKey]: fields[propKey].value,
      },
    };
  },
}, {
  voip: {
    number: '0',
    evaluation: 0,
    display_number_status: 'INIT',
    display_number_files: [],
  },
  checkFiles: [],
  /**
   * currentStep 从 0 开始
   * @type {Number}
   */
  currentStep: 2,
  showEditForm: false,
});

export default voip;
