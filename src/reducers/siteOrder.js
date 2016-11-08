import { handleActions } from 'redux-actions';
import {
  toggleOrderFormModalVisible,
  addOrderForm,
  editOrderForm,
  addOrderFormItem,
  updateOrderFormItemValue,
  upOrderFormItem,
  downOrderFormItem,
  removeOrderFormItem,
} from 'actions/web';

const siteOrder = handleActions({
  [`${toggleOrderFormModalVisible}`](state, action) {
    return {
      ...state,
      orderEditVisible: action.payload,
    };
  },

  [`${addOrderForm}`](state) {
    return {
      ...state,
      orderFormData: {
        title: '',
        items: [{
          placeholder: '',
          type: 'input',
        }],
      },
    };
  },

  [`${editOrderForm}`](state, action) {
    return {
      ...state,
      orderFormData: action.payload,
    };
  },

  [`${addOrderFormItem}`](state) {
    const item = {
      placeholder: '',
      type: 'input',
    };

    return {
      ...state,
      orderFormData: {
        ...state.orderFormData,
        items: [
          ...state.orderFormData.items,
          item,
        ],
      },
    };
  },

  [`${updateOrderFormItemValue}`](state, action) {
    const { fields } = action.payload;
    const itemKey = Object.keys(fields)[0];

    if (itemKey === 'title') {
      return {
        ...state,
        orderFormData: {
          ...state.orderFormData,
          title: fields[itemKey].value,
        },
      };
    }

    const itemKeyArray = itemKey.split('.');
    const value = fields[itemKey].value;
    const index = Number(itemKeyArray[1]);
    const key = itemKeyArray[2];

    return {
      ...state,
      orderFormData: {
        ...state.orderFormData,
        items: state.orderFormData.items.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              [key]: value,
            };
          }
          return item;
        }),
      },
    };
  },

  [`${upOrderFormItem}`](state, action) {
    const items = state.orderFormData.items.slice();
    const index = action.payload;
    const prevIndex = index - 1;
    if (index > 0 && index < items.length) {
      [items[index], items[prevIndex]] = [items[prevIndex], items[index]];
      return {
        ...state,
        orderFormData: {
          ...state.orderFormData,
          items,
        },
      };
    }

    return state;
  },

  [`${downOrderFormItem}`](state, action) {
    const items = state.orderFormData.items.slice();
    const index = action.payload;
    const nextIndex = index + 1;
    if (index >= 0 && nextIndex < items.length) {
      [items[index], items[nextIndex]] = [items[nextIndex], items[index]];
      return {
        ...state,
        orderFormData: {
          ...state.orderFormData,
          items,
        },
      };
    }

    return state;
  },

  [`${removeOrderFormItem}`](state, action) {
    const items = state.orderFormData.items.slice();
    const index = action.payload;
    items.splice(index, 1);

    return {
      ...state,
      orderFormData: {
        ...state.orderFormData,
        items,
      },
    };
  },
}, {
  orderEditVisible: false,
  orderFormData: {
    items: [],
  },
});

export default siteOrder;
