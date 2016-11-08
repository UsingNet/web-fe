import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setStatus } from 'actions/agent';
import { setTabTimeout } from 'actions/tabTimeout';
import { disconnect } from 'actions/socket';
import { Alert } from 'antd';
import cookie from 'js-cookie';
import Sidebar from 'containers/Sidebar';
import Header from 'containers/Header';
import * as BaseSettingActions from 'actions/baseSetting';
import { getMe as getMeAction } from 'actions/me';
import styles from './main.less';

const statusKey = 'agent_status';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    baseSettingActions: PropTypes.object.isRequired,
    getMe: PropTypes.func.isRequired,
    status: PropTypes.string,
    tabTimeout: PropTypes.bool.isRequired,
    name: PropTypes.string,
    setStatus: PropTypes.func.isRequired,
    setTabTimeout: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { getMe, tabTimeout, baseSettingActions, setStatus, setTabTimeout, disconnect } = this.props;

    if (!cookie.get(statusKey)) {
      cookie.set(statusKey, 'online');
      setStatus(cookie.get(statusKey));
    }

    getMe();
    baseSettingActions.getBaseSetting();

    const windowToken = `${new Date().getTime() + Math.random()}`;
    const tokenKey = '_usingnettoken';
    cookie.set(tokenKey, windowToken, { path: '/' });

    // 判断是否打开多个窗口
    const timeoutInterval = setInterval(() => {
      if (cookie.get(tokenKey) !== windowToken) {
        if (!tabTimeout) {
          disconnect();
          setTabTimeout(true);
          clearInterval(timeoutInterval);
        }
      }
    }, 1000);

    this.setPageTitle(this.props.children.props.route.name);
  }

  componentDidUpdate() {
    this.setPageTitle(this.props.children.props.route.name);
  }

  setPageTitle = (title) => {
    if (this.props.baseSetting.name) {
      document.title = `${title} - ${this.props.baseSetting.name}`;
    } else {
      document.title = title;
    }
  };

  render() {
    const baseSetting = this.props.baseSetting;
    let child = this.props.children;

    if (this.props.tabTimeout) {
      child = (
        <div className={styles['window-timeout']}>
          <Alert
            message="页面已过期，请关闭窗口或刷新"
            description="同时打开多个后台窗口可能会导致不必要的错误"
            type="error"
            showIcon
          />
        </div>
      );
    }

    return (
      <div className={styles.app}>
        <Sidebar path={this.props.children.props.route.path || ''} />
        <div className={styles.main}>
          <Header name={this.props.children.props.route.name} baseSetting={baseSetting}/>
          <div className={styles['content-wrapper']}>
            {child}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ tabTimeout, baseSetting }) {
  return {
    tabTimeout,
    baseSetting
  };
}

function mapDispatchToProps(dispatch) {
  return {
    disconnect: bindActionCreators(disconnect, dispatch),
    setStatus: bindActionCreators(setStatus, dispatch),
    setTabTimeout: bindActionCreators(setTabTimeout, dispatch),
    getMe: bindActionCreators(getMeAction, dispatch),
    baseSettingActions: bindActionCreators(BaseSettingActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
