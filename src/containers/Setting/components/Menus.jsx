import React, { PropTypes } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router';
import styles from '../setting.less';

const MenuItemGroup = Menu.ItemGroup;

const Menus = (props) => (
  <Menu
    className={styles.menus}
    selectedKeys={props.keys}
    style={{ height: '100%' }}
    mode="inline"
  >
    <MenuItemGroup title="接入">
      <Menu.Item key="web">
        <Link to="/setting/web">网站</Link>
      </Menu.Item>
      <Menu.Item key="wechat">
        <Link to="/setting/wechat">微信</Link>
      </Menu.Item>
      <Menu.Item key="weibo">
        <Link to="/setting/weibo">微博</Link>
      </Menu.Item>
      {/*
      <Menu.Item key="phoneAccess">
        <Link to="/setting/phoneAccess">电话</Link>
      </Menu.Item>
      <Menu.Item key="smsAccess">
        <Link to="/setting/smsAccess">短信</Link>
      </Menu.Item>
      <Menu.Item key="email">
        <Link to="/setting/email">邮箱</Link>
      </Menu.Item>
      */}
    </MenuItemGroup>

    {/*
    <MenuItemGroup title="账户">
      <Menu.Item key="combo">
        <Link to="/setting/combo">套餐</Link>
      </Menu.Item>
      <Menu.Item key="recharge">
        <Link to="/setting/recharge">充值</Link>
      </Menu.Item>
      <Menu.Item key="expense">
        <Link to="/setting/expense">账单</Link>
      </Menu.Item>
    </MenuItemGroup>
    <MenuItemGroup title="插件">
      <Menu.Item key="plugin">
        <Link to="/setting/plugin">插件</Link>
      </Menu.Item>
    </MenuItemGroup>
    */}

    <MenuItemGroup title="客服">
      <Menu.Item key="permission">
        <Link to="/setting/permission">权限设置</Link>
      </Menu.Item>
      <Menu.Item key="assign">
        <Link to="/setting/assign">客服分配</Link>
      </Menu.Item>
    </MenuItemGroup>
  </Menu>
);

Menus.propTypes = {
  keys: PropTypes.array.isRequired,
};

export default Menus;
