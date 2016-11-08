import React, { PropTypes } from 'react';
import styles from '../messages.less';

const MessageSendItem = ({
  createdAt,
  createMarkup,
  message,
  onUndoMessage,
  showMail,
}) => {
  const renderSendNode = (info) => {
    if (info.revocable) {
      if (!message.package.undo && message.type === 'IM') {
        return (
          <span className={styles['message-inner']}>
            <p
              className={styles.bd}
              dangerouslySetInnerHTML={createMarkup(message.body)}
            >
            </p>
            <span
              className={styles['undo-action']}
              // eslint-disable-next-line no-underscore-dangle
              onClick={() => info.onUndoMessage(message._id)}
            >
              <span>撤销</span>
            </span>
          </span>
        );
      }

      if (message.type === 'MAIL') {
        return (
          <span className={styles['message-inner']}>
            <p className={styles.bd}>
              标题：{message.package.subject}
            </p>
            <span
              className={styles['check-mail']}
              onClick={() => showMail({
                title: message.package.subject,
                body: message.body,
              })}
            >
              查看邮件内容
            </span>
          </span>
        );
      }

      return (
        <span className={styles['message-inner']}>
          <p
            className={message.package.undo ? `${styles.undo} ${styles.bd}` : styles.bd}
            dangerouslySetInnerHTML={createMarkup(message.body)}
          >
          </p>
        </span>
      );
    }

    if (!message.package.undo && message.type === 'IM') {
      return (
        <span className={styles['message-inner']}>
          <p
            className={styles.bd}
            dangerouslySetInnerHTML={createMarkup(message.body)}
          >
          </p>
        </span>
      );
    }

    if (message.type === 'MAIL') {
      return (
        <span className={styles['message-inner']}>
          <p className={styles.bd}>
            标题：{message.package.subject}
          </p>
          <span
            className={styles['check-mail']}
            onClick={() => showMail({
              title: message.package.subject,
              body: message.body,
            })}
          >
            查看邮件内容
          </span>
        </span>
      );
    }

    return (
      <span className={styles['message-inner']}>
        <p
          className={message.package.undo ? `${styles.undo} ${styles.bd}` : styles.bd}
          dangerouslySetInnerHTML={createMarkup(message.body)}
        >
        </p>
      </span>
    );
  };

  let sendNode = '';

  if (onUndoMessage) {
    sendNode = renderSendNode({ onUndoMessage, revocable: true });
  } else {
    sendNode = renderSendNode({ revocable: false });
  }

  return (
    <div className={`${styles['message-item']} ${styles.send}`}>
      <div className={styles.hd}>
        <span className={styles.date}>{createdAt}</span>
        <span className={styles.name}>{message.package.agent.name}</span>
      </div>
      {sendNode}
    </div>
  );
};

MessageSendItem.propTypes = {
  createdAt: PropTypes.string,
  createMarkup: PropTypes.func,
  message: PropTypes.object,
  onUndoMessage: PropTypes.func,
  showMail: PropTypes.func,
};

export default MessageSendItem;
