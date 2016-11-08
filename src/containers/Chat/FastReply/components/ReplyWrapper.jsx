import React, { PropTypes } from 'react';
import { Icon } from 'antd';
import styles from '../fast-reply.less';
import chatStyles from '../../ChatArea/chat-area.less';

const ReplyWrapper = ({ replies, setOrderExtraInfo, orderId }) => {
  if (!replies.length) {
    return (
      <div key="0" style={{ textAlign: 'center' }}>
        <Icon type="frown" />
        <span style={{ paddingLeft: 7 }}>暂无数据</span>
      </div>
    );
  }

  const repliesNode = replies.map((r, i) => (
    <li
      key={i}
      title={r.content}
      onClick={() => {
        const textAreaNode = document.querySelector(`.${chatStyles['im-area']} textarea`);
        if (textAreaNode) {
          textAreaNode.focus();
        }

        setOrderExtraInfo({ id: orderId, key: 'enteredText', value: r.content });
      }}
    >
      #<span className={styles.shortcut}>{r.shortcut}</span>
      <span>{r.content}</span>
    </li>
  ));

  return (
    <ul className={styles.replies}>
      {repliesNode}
    </ul>
  );
};

ReplyWrapper.propTypes = {
  setOrderExtraInfo: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
  replies: PropTypes.array.isRequired,
};

export default ReplyWrapper;
