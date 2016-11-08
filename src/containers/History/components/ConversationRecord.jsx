import React, { PropTypes } from 'react';
import { Icon } from 'antd';
import Messages from 'containers/Messages';
import styles from '../history.less';

class ConversationRecord extends React.Component {
  static propTypes = {
    onCloseClick: PropTypes.func.isRequired,
    onLoadMoreMessage: PropTypes.func.isRequired,
    openedOrder: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    action: PropTypes.string.isRequired,
  }

  render() {
    const { openedOrder, onCloseClick, messages } = this.props;
    const hasMoreMessage = (messages.length % 11 === 0);

    return (
      <div className={styles['history-record']}>
        <div className={styles.head}>
          <div className={styles.close} onClick={onCloseClick}>
            <Icon type="cross" />
          </div>
          <span className={styles['user-name']}>
            {openedOrder.contact.name}
          </span>
        </div>

        <div className={styles.content} ref="content">
          <Messages
            ref="messages"
            onLoadMoreMessage={this.props.onLoadMoreMessage}
            messages={messages}
            hasMoreMessage={hasMoreMessage}
            action={this.props.action}
          />
        </div>
      </div>
    );
  }
}

export default ConversationRecord;
