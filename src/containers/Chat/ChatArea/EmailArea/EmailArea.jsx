import React, { PropTypes } from 'react';
import { Input } from 'antd';
import styles from './email-area.less';

class EmailArea extends React.Component {
  static propTypes = {
    orderId: PropTypes.number.isRequired,
    emailTitle: PropTypes.string,
    enteredText: PropTypes.string,
    onInput: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
    setOrderExtraInfo: PropTypes.func.isRequired,
  }

  onEmailTitleChange = (e) => {
    const { orderId, setOrderExtraInfo } = this.props;
    setOrderExtraInfo({ id: orderId, key: 'emailTitle', value: e.target.value.trim() });
  }

  render() {
    const { emailTitle, enteredText, onInput, onSend } = this.props;

    return (
      <div className={styles['email-area']}>
        <Input
          className={styles['email-title']}
          placeholder="邮件标题"
          value={emailTitle}
          onChange={this.onEmailTitleChange}
        />

        <textarea
          placeholder="按回车直接发送邮件"
          value={enteredText}
          onChange={e => onInput(e, 'MAIL')}
          onKeyDown={e => onSend(e)}
        >
        </textarea>
      </div>
    );
  }
}

export default EmailArea;
