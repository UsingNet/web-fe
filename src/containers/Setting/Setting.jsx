import React, { PropTypes } from 'react';
import Menus from './components/Menus';
import styles from './setting.less';

const Setting = (props) => {
  const keys = [props.location.pathname.split('/')[2] || 'web'];
  return (
    <div className={styles.setting}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Menus keys={keys} />
        </aside>
        <div className={styles.content}>
          <div style={{ height: '100%', clear: 'both' }}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

Setting.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.any,
};

export default Setting;
