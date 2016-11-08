import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cookie from 'js-cookie';
import { Dropdown, Menu, Icon } from 'antd';
import { LOGOUT } from 'constants/Network';
import styles from './header.less';

const MenuItem = Menu.Item;

class Header extends React.Component {
  static propTypes = {
    me: PropTypes.object.isRequired,
    status: PropTypes.string,
    name: PropTypes.string,
    setAgentStatus: PropTypes.func.isRequired,
    socketActions: PropTypes.object.isRequired,
    baseSetting: PropTypes.object.isRequired,
  }

  toggleStatus = () => {
    const { setAgentStatus, baseSetting, socketActions } = this.props;
    const prevStatus = cookie.get('agent_status') || 'online';

    let currentStatus;
    if (prevStatus === 'online') {
      currentStatus = 'offline';
      socketActions.disconnect();
    } else {
      currentStatus = 'online';
      socketActions.connect(baseSetting.socket_token);
    }

    setAgentStatus(currentStatus);
  }

  render() {
    const { me, status } = this.props;

    const dropdownMenu = (
      <Menu>
        <MenuItem key="0">
          <Link to="/profile/account">
            <Icon type="setting" /> 个人设置
          </Link>
        </MenuItem>
        <MenuItem key="1">
          <Icon type="logout" /> <a href={LOGOUT} style={{ display: 'inline-block' }}>退出</a>
        </MenuItem>
      </Menu>
    );

    /**
     * @todo 添加消息入口及提示
     * @todo 添加离线上线切换
     */
    return (
      <header className={styles.header}>
        <div className={styles['header-box']}>
          <div className={styles['nav-bar']}>
            {this.props.name || '首页'}
          </div>

          <div className={styles['action-bar']}>
            <div className={styles[status]}>
              <div className={styles.status} onClick={this.toggleStatus}>
                <span className={styles.dot}></span>
                <span>{status === 'online' ? '在线' : '离线'}</span>
              </div>

              <div className={styles.user}>
                <Dropdown overlay={dropdownMenu} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <img
                      className={styles.avatar}
                      src={me.img}
                      alt={me.name}
                    />
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
