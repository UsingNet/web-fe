import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSelectedOrder } from 'actions/order';
import { getTrack } from 'actions/track';

import OrderList from './OrderList';

const mapStateToProps = ({ order }) => ({
  orders: order.orders.sort((a, b) => {
    if (a.sortId > b.sortId) {
      return -1;
    } else if (a.sortId < b.sortId) {
      return 1;
    } else if (a.sortId === b.sortId) {
      if (a.last_replied > b.last_replied) {
        return -1;
      } else if (a.last_replied < b.last_replied) {
        return 1;
      }

      return 0;
    }

    return 0;
  }),
  orderExtraInfo: order.orderExtraInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedOrder: bindActionCreators(setSelectedOrder, dispatch),
  getTrack: bindActionCreators(getTrack, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(OrderList);
