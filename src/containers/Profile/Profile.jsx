import React, { PropTypes } from 'react';
import ProfileMenus from './components/ProfileMenus';
import styles from './profile.less';

const Profile = (props) => {
  const keys = [props.location.pathname.split('/')[2] || 'account'];
  return (
    <div className={styles.profile}>
      <aside className={styles.sidebar}>
        <ProfileMenus keys={keys} />
      </aside>

      <div className={styles.content}>
        <div style={{ height: '100%', clear: 'both' }}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.any,
};

export default Profile;
