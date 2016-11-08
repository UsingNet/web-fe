import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AppCard from './components/AppCard';
import styles from './appstore.less';

class AppStore extends React.Component {
  static propTypes = {
    getApps: PropTypes.func.isRequired,
    enableApp: PropTypes.func.isRequired,
    disableApp: PropTypes.func.isRequired,
    apps: PropTypes.array.isRequired,
    children: PropTypes.any,
  }

  componentDidMount() {
    this.props.getApps();
  }

  onEnableApp = (event, id) => {
    event.preventDefault();
    this.props.enableApp(id);
  }

  onDisableApp = (event, id) => {
    event.preventDefault();
    this.props.disableApp(id);
  }

  render() {
    const appCards = this.props.apps.map(app => (
      app.used ?
        (<Link key={app.id} to={{ pathname: `/appstore/${app.id}`, state: { url: app.url } }}>
          <AppCard app={app} onDisableApp={this.onDisableApp} onEnableApp={this.onEnableApp} />
        </Link>)
        : (
        <AppCard
          key={app.id}
          app={app}
          onDisableApp={this.onDisableApp}
          onEnableApp={this.onEnableApp}
        />)
    ));

    if (this.props.children) {
      return (
        <div className={styles['view-app']}>
          {this.props.children}
        </div>
      );
    }

    return (
      <div className={styles.appstore}>
        {appCards}
      </div>
    );
  }
}

export default AppStore;
