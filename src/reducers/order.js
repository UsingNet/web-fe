import { handleActions } from 'redux-actions';
import * as OrderActions from 'actions/order';
import { deepCopy } from 'modules/helpers';

const orders = handleActions({
  [`${OrderActions.unread}`](state, action) {
    return {
      ...state,
      orders: action.payload,
    };
  },

  [`${OrderActions.getOrderSuccess}`](state, action) {
    const orderWithSortId = action.payload.map(order => {
      // eslint-disable-next-line no-param-reassign
      order.sortId = order.unread;
      return order;
    });

    return {
      ...state,
      orders: orderWithSortId,
    };
  },

  [`${OrderActions.closeOrderSuccess}`](state, action) {
    const id = action.payload;
    const newOrders = state.orders.filter(order => id !== order.id);

    return {
      ...state,
      orders: newOrders,
    };
  },

  [`${OrderActions.shiftOrderSuccess}`](state, action) {
    const id = action.payload;
    const newOrders = state.orders.filter(order => id !== order.id);

    return {
      ...state,
      orders: newOrders,
    };
  },

  [`${OrderActions.unreadOrder}`](state, action) {
    return {
      ...state,
      orders: action.payload,
    };
  },

  [`${OrderActions.initOrderExtraInfo}`](state, action) {
    if (state.orderExtraInfo[action.payload]) {
      return state;
    }

    return {
      ...state,
      orderExtraInfo: {
        ...state.orderExtraInfo,
        [action.payload]: {
          enteredText: '',
          voipStatus: '',
        },
      },
    };
  },

  [`${OrderActions.setOrderExtraInfo}`](state, action) {
    const { id, key, value } = action.payload;

    return {
      ...state,
      orderExtraInfo: {
        ...state.orderExtraInfo,
        [id]: {
          ...(state.orderExtraInfo[id] || {}),
          [key]: value,
        },
      },
    };
  },

  [`${OrderActions.setSelectedOrder}`](state, action) {
    return {
      ...state,
      // selectedOrder: deepCopy(action.payload, state.selectedOrder),
      selectedOrder: deepCopy({
        id: 0,
        type: 'IM',
        category: {},
        contact: {
          id: 0,
          name: '',
          extend_id: '',
          track_id: '',
          ip: '',
          extend: [],
          package: {
            address: '',
            user_agent: '',
          },
          tags: [],
          wechat: {
            nick_name: '',
          },
        },
      }, action.payload),
    };
  },

  [`${OrderActions.updateClientInfoFields}`](state, action) {
    const { fields } = action.payload;
    const itemKey = Object.keys(fields)[0];
    const value = fields[itemKey].value;
    const orderId = state.selectedOrder.id;

    return {
      ...state,
      selectedOrder: {
        ...state.selectedOrder,
        contact: {
          ...state.selectedOrder.contact,
          [itemKey]: value,
        },
      },
      orders: state.orders.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            contact: {
              ...o.contact,
              [itemKey]: value,
            },
          };
        }

        return o;
      }),
    };
  },

  [`${OrderActions.getOrderCategorySuccess}`](state, action) {
    return {
      ...state,
      categories: action.payload,
    };
  },

  [`${OrderActions.updateSearchedCategory}`](state, action) {
    return {
      ...state,
      searchedCategory: action.payload,
    };
  },

  [`${OrderActions.updateCategory}`](state, action) {
    const orderId = state.selectedOrder.id;

    return {
      ...state,
      orders: state.orders.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            category: action.payload,
          };
        }

        return o;
      }),
    };
  },

  [`${OrderActions.updateSelectedOrder}`](state, action) {
    const { payload } = action;
    const orderCopy = deepCopy(state.selectedOrder, payload);

    return {
      ...state,
      selectedOrder: orderCopy,
    };
  },

  [`${OrderActions.infoTabChange}`](state, action) {
    return {
      ...state,
      activeTab: action.payload,
    };
  },

  [`${OrderActions.updateContactTags}`](state, action) {
    const orderId = state.selectedOrder.id;

    return {
      ...state,
      selectedOrder: {
        ...state.selectedOrder,
        contact: {
          ...state.selectedOrder.contact,
          tags: action.payload,
        },
      },
      orders: state.orders.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            contact: {
              ...o.contact,
              tags: action.payload,
            },
          };
        }

        return o;
      }),
    };
  },

  [`${OrderActions.setOrderUnread}`](state, action) {
    const { id, type } = action.payload;
    return {
      ...state,
      orders: state.orders.map(o => {
        if (o.id === id) {
          let num = 0;
          let sortNum = o.sortId;
          switch (type) {
            case 'inc':
              num = o.unread + 1;
              sortNum = o.unread + 1;
              break;
            case 'reset':
              num = 0;
              break;
            default:
              break;
          }

          return {
            ...o,
            unread: num,
            sortId: sortNum,
          };
        }

        return o;
      }),
    };
  },

  [`${OrderActions.setOrderLastReply}`](state, action) {
    const { id, time } = action.payload;

    return {
      ...state,
      orders: state.orders.map(o => {
        if (o.id === id) {
          return {
            ...o,
            last_replied: time,
          };
        }

        return o;
      }),
    };
  },

  [`${OrderActions.setNewOrderId}`](state, action) {
    return {
      ...state,
      newOrderId: action.payload,
    };
  },
}, {
  orders: [],
  categories: [],
  orderExtraInfo: {},
  selectedOrder: {
    id: 0,
    type: 'IM',
    category: {},
    contact: {
      id: 0,
      name: '',
      extend_id: '',
      track_id: '',
      ip: '',
      extend: [],
      package: {
        address: '',
        user_agent: '',
      },
      tags: [],
      wechat: {
        nick_name: '',
      },
    },
  },
  searchedCategory: '',
  action: 'row',
  activeTab: 'client',
  newOrderId: 0,
});

export default orders;
