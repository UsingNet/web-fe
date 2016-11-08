import React from 'react';
import { Link } from 'react-router';
import styles from './not-found.less';

const NotFound = () => (
  <div className={styles['not-found']}>
    <div className={styles['pesan-error']}>
      <div>
        <div className={styles['not-found-text']}>404</div>
        <div className={styles.hint}>这里什么都没有</div>
      </div>
    </div>
    <Link to="/" className={`ant-btn ${styles['back-home']}`}>回首页</Link>
  </div>
);

export default NotFound;
