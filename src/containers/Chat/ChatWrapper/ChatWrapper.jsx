import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import ChatArea from '../ChatArea';
import ChatInfoSidebar from '../ChatInfoSidebar';
import styles from './chat-wrapper.less';

class ChatWrapper extends React.Component {
  static propTypes = {
    getOnlineAgents: PropTypes.func.isRequired,
    hasMoreMessage: PropTypes.bool.isRequired,
    orders: PropTypes.array.isRequired,
    orderActions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    getTrack: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { orderActions, orders, getTrack } = this.props;
    if (this.props.params.id) {
      const id = this.props.params.id;
      const selectedOrder = orders.find(o => o.id === Number(id));
      orderActions.setSelectedOrder(selectedOrder);
      getTrack({
        type: 'order',
        params: {
          _id: selectedOrder.contact.track_id,
          date: selectedOrder.contact.visit_date,
          limit: 10,
        },
      });
    }
  }

  render() {
    const {
      getOnlineAgents,
      hasMoreMessage,
    } = this.props;

    return (
      <div className={styles['chat-wrapper']}>
        <ChatArea
          {...this.props}
          getOnlineAgents={getOnlineAgents}
          hasMoreMessage={hasMoreMessage}
        />
        <ChatInfoSidebar />
      </div>
    );
  }
}

export default withRouter(ChatWrapper);
