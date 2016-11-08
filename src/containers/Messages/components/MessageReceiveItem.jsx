import React, { PropTypes } from 'react';
import styles from '../messages.less';

const MessageReceiveItem = ({ message, createMarkup, createdAt }) => {
  const renderReceiveNode = () => {
    if (message.type === 'MAIL') {
      return (
        <div className={`${styles['message-item']} ${styles.receive}`}>
          <div className={styles.hd}>
            <span className={styles.name}>
              {this.props.message.package.contact.name}
            </span>
            <span className={styles.date}>{createdAt}</span>
          </div>

          <p className={styles.bd}>
            标题：{message.package.subject}
          </p>
          <span
            className={styles['check-mail']}
            onClick={() => this.props.showMail({
              title: message.package.subject,
              body: message.body,
            })}
          >
              查看邮件内容
          </span>
        </div>
      );
    }

    return (
      <div className={`${styles['message-item']} ${styles.receive}`}>
        <div className={styles.hd}>
          <span className={styles.name}>
            {message.package.contact.name}
          </span>
          <span className={styles.date}>{createdAt}</span>
        </div>

        <p
          className={styles.bd}
          dangerouslySetInnerHTML={createMarkup(message.body)}
        >
        </p>
      </div>
    );
  };

  const receiveNode = renderReceiveNode();

  return (
    receiveNode
  );
};

MessageReceiveItem.propTypes = {
  createdAt: PropTypes.string,
  message: PropTypes.object,
  createMarkup: PropTypes.func,
  showMail: PropTypes.func,
};

export default MessageReceiveItem;
