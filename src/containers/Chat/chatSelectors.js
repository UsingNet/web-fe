import { createSelector } from 'reselect';

const getOrders = state => state.order.orders;
const getChatMessages = state => state.order.chatMessages;

const getOrdersWithExtra = createSelector(
  [getOrders, getChatMessages],
  (orders, messages) => {
    const ordersWithExtra = [];

    for (const order of orders) {
      const msgEntity = messages[order.id];
      ordersWithExtra.push({
        ...order,
        ...msgEntity,
      });
    }

    return ordersWithExtra;
  }
);

export default getOrdersWithExtra;
