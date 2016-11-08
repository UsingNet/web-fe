import React, { PropTypes } from 'react';
import styles from '../messages.less';

const MessageSystemItem = (props) => {
  const { createdAt, createMarkup, message } = props;

  return (
    <div className={`${styles['message-item']} ${styles.system}`}>
      <div className={styles.hd}>
        <span className={styles.date}>{createdAt}</span>
      </div>
      <div
        className={styles.bd}
        dangerouslySetInnerHTML={createMarkup(message.body)}
      >
      </div>
    </div>
  );
};

MessageSystemItem.propTypes = {
  message: PropTypes.object,
  createdAt: PropTypes.string,
  createMarkup: PropTypes.func,
};

export default MessageSystemItem;
