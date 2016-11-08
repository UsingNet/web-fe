/* eslint-disable */
import React, { PropTypes } from 'react';
import { message } from 'antd';
import styles from '../chat-area.less';

class VoipArea extends React.Component {
  static propTypes = {
    voipStatus: PropTypes.string.isRequired,
    enteredText: PropTypes.string,
    onInput: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
  }

  // onDialing = () => {
  //   if (this.props.voipStatus !== 'connected') {
  //     message.error('电话未准备就绪');
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    const { voipStatus, enteredText, onInput, onSend } = this.props;
    let voipNode = '';

    switch (voipStatus) {
      case 'inbound': {
        voipNode = (
          <div className={styles['voip-status']}>
            <div className={`${styles['voip-btn']} ${styles.inbound}`}>接听</div>
          </div>
        );
        break;
      }
      case 'outbound': {
        voipNode = (
          <div className={styles['voip-status']}>
            <div className={`${styles['voip-btn']} ${styles.hangup}`}>挂断</div>
          </div>
        );
        break;
      }
      case 'active': {
        voipNode = (
          <div className={styles['voip-status']}>
            <div className="status">通话中...0：00</div>
            <div className={`${styles['voip-btn']} ${styles.hangup}`}>挂断</div>
            <textarea
              placeholder="按回车提交备注"
              rows={3}
              value={enteredText}
              onChange={onInput}
              onKeyDown={(e) => onSend(e)}
            />
          </div>
        );
        break;
      }
      case 'disabled': {
        voipNode = (
          <div className={styles['voip-status']}>
            <div className="status">其他工单通话中...</div>
          </div>
        );
        break;
      }
      default: {
        voipNode = (
          <div className={styles['voip-status']}>
            <div className={`${styles['voip-btn']} ${styles.outbound}`}>拨打</div>
          </div>
        );
      }
    }

    return (
      <div className={styles['voip-area']}>
        {voipNode}
      </div>
    );
  }
}

export default VoipArea;
