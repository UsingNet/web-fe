import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Chat from './Chat';
import * as OrderActions from 'actions/order';
import { getTags } from 'actions/tag';
import { getPlugin } from 'actions/plugin';
import { getBaseSetting } from 'actions/baseSetting';

function mapStateToProps({ order }) {
  return {
    orders: order.orders.sort((a, b) => {
      if (a.unread > b.unread) {
        return -1;
      } else if (a.unread < b.unread) {
        return 1;
      } else if (a.unread === b.unread) {
        if (a.last_replied > b.last_replied) {
          return -1;
        } else if (a.last_replied < b.last_replied) {
          return 1;
        }

        return 0;
      }

      return 0;
    }),
    action: order.action,
  };
}

function mapDispathToProps(dispatch) {
  return {
    orderActions: bindActionCreators(OrderActions, dispatch),
    getTags: bindActionCreators(getTags, dispatch),
    getPlugin: bindActionCreators(getPlugin, dispatch),
    getBaseSetting: bindActionCreators(getBaseSetting, dispatch),
  };
}

export default connect(mapStateToProps, mapDispathToProps)(Chat);
