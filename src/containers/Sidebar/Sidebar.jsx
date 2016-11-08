import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon, Tooltip, Tag } from 'antd';
import pkg from '../../../package.json';
import styles from './sidebar.less';

class Sidebar extends React.Component {

  static propTypes = {
    menus: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    planSetting: PropTypes.object.isRequired,
  }

  goHelpPage = () => {
    const url = window.usingnetCrm.getUrl();
    window.open(url);
  }

  render() {
    const { menus, planSetting } = this.props;
    const menuNodes = menus.map((m, i) => {
      const { path } = this.props;
      const current = m.link === `/${path}` ? 'current' : '';
      return (
        <li
          key={i}
          className={styles[current]}
        >
          <Tooltip
            title={m.name}
            placement="right"
          >
            <Link to={m.link}>
              <Icon type={m.icon} />
            </Link>
          </Tooltip>
        </li>
      );
    });

    let plan = '';
    if (planSetting) {
      const color = planSetting.slug === 'experience' ? '' : 'yellow';
      plan = (<Tag color={color}>{planSetting.name}</Tag>);
    }

    return (
      <aside className={styles.sidebar}>
        <Link to="/">
          <img
            alt="logo"
            className={styles.logo}
            src="//app.usingnet.com/resources/images/company-logo3.png"
          />
        </Link>

        <ul className={styles.menu}>
          {menuNodes}
        </ul>
        <div className={styles.bottom}>
          <span className={styles['to-nest-im']} onClick={this.goHelpPage}>
            <Icon type="question" />
            <div className="version">v{pkg.version}</div>
          </span>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
