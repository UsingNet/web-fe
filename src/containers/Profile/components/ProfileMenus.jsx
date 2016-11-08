import React, { PropTypes } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router';

const MenuItem = Menu.Item;

const ProfileMenus = (props) => (
  <Menu
    selectedKeys={props.keys}
    mode="inline"
  >
    <MenuItem key="account">
      <Link to="/profile/account">账号信息</Link>
    </MenuItem>

    <MenuItem key="wechat">
      <Link to="/profile/wechat">绑定微信</Link>
    </MenuItem>

    <MenuItem key="quickReply">
      <Link to="/profile/quickReply">快捷回复</Link>
    </MenuItem>
  </Menu>
);

ProfileMenus.propTypes = {
  keys: PropTypes.array.isRequired,
};

export default ProfileMenus;
