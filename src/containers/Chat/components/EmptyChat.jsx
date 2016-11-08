import React from 'react';
import { Icon } from 'antd';
import styles from '../chat.less';

const EmptyChat = () => (
  <div className={styles.chat}>
    <div className={styles['empty-chat']}>
      <Icon type="inbox" />
      <p>没有对话</p>
    </div>
  </div>
);

export default EmptyChat;
