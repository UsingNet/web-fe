import React, { PropTypes } from 'react';
import SmsSignature from './components/SmsSignature';
import SmsTemplates from './components/SmsTemplates';
import styles from './sms.less';

class Sms extends React.Component {
  static propTypes = {
    smsActions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.smsActions.getSmsSetting();
    this.props.smsActions.getSmsTemplates();
  }

  render() {
    return (
      <div className={styles['sms-setting']}>
        <SmsSignature {...this.props} />
        <SmsTemplates {...this.props} />
      </div>
    );
  }
}

export default Sms;
