/* eslint-disable */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Badge, Tag } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './order-list.less';

class OrderList extends React.Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
    orderExtraInfo: PropTypes.object.isRequired,
    setSelectedOrder: PropTypes.func.isRequired,
    getTrack: PropTypes.func.isRequired,
  }

  state = {
    now: new Date().getTime(),
  }

  componentDidMount() {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.setState({
          now: new Date().getTime(),
        });
      }, 60000);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { orders, setSelectedOrder, getTrack, currentOrderId } = this.props;
    const liNodes = orders.map((o, i) => {
      const { contact } = o;
      return (
        <li
          key={i}
          className={styles['order-item']}
          onClick={() => {
            setSelectedOrder(o);
            getTrack({
              type: 'order',
              params: {
                _id: o.contact.track_id,
                date: o.contact.visit_date,
                limit: 10,
              },
            });
          }}
        >
          <Badge
            count={o.unread && o.id !== currentOrderId ? o.unread : null}
            className={styles['badge']}
          >
            <Link
              to={`/chat/${o.id}`}
              activeClassName={styles.current}
            >
              <div className={styles.img}>
                <img
                  alt={contact.name}
                  src={contact.img.match(/qnssl/) ? `${contact.img}-avatar` : contact.img}
                />
              </div>
              <div className={styles.info}>
                <div className={styles.name}>
                  {contact.name}
                  <span className={styles.date}>{moment(o.last_replied * 1000).fromNow()}</span>
                </div>
              </div>
            </Link>
          </Badge>
        </li>
      );
    });

    return (
      <aside className={styles.sidebar}>
        <h4>当前对话</h4>
        <ul className={styles['order-list']} ref="order-list">
          {liNodes}
        </ul>
      </aside>
    );
  }
}

export default OrderList;
