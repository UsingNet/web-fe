import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
// import OrderList from './components/OrderList';
import OrderList from './OrderList';
import EmptyChat from './components/EmptyChat';
import FastReply from './FastReply';
import styles from './chat.less';

class Chat extends React.Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
    children: PropTypes.any,
    params: PropTypes.object,
    orderActions: PropTypes.object.isRequired,
    getTags: PropTypes.func.isRequired,
    getPlugin: PropTypes.func.isRequired,
    getBaseSetting: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { orderActions, getTags, getPlugin, getBaseSetting } = this.props;
    orderActions.getOrder();
    orderActions.getOrderCategory();
    getTags();
    getPlugin();
    getBaseSetting();
  }

  shouldComponentUpdate(nextProps) {
    const { orders } = nextProps;
    let id = this.props.params.id;
    if (orders.length) {
      const selectedOrder = orders.find(o => o.id === Number(id));
      if (!id || !selectedOrder) {
        id = orders[0].id
        this.props.router.push(`/chat/${id}`);
        return false;
      }
    }
    return true;
  }

  render() {
    const { orders } = this.props;

    if (orders.length === 0) {
      return (
        <EmptyChat />
      );
    }

    return (
      <div className={styles.chat}>
        <OrderList currentOrderId={Number(this.props.params.id)}/>
        {this.props.children}
        <FastReply />
      </div>
    );

    // return (
    //   <div className={styles.chat}>
    //     <div className={styles['chat-wrapper']}>
    //       <EmptyChat />
    //       <OrderList
    //         orders={orders}
    //         orderExtraInfo={orderExtraInfo}
    //         currentId={this.props.routeParams.id}
    //         initOrderExtraInfo={orderActions.initOrderExtraInfo}
    //       />
    //       {this.props.children}
    //
    //     </div>
    //   </div>
    // );
  }
}

export default withRouter(Chat);
