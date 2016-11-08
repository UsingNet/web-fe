import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Tabs, Icon } from 'antd';
import classNames from 'classnames';
import ReplyWrapper from './components/ReplyWrapper';
import styles from './fast-reply.less';

const TabPane = Tabs.TabPane;

class FastReply extends React.Component {
  static propTypes = {
    getCommonQuickReply: PropTypes.func.isRequired,
    getPersonalQuickReply: PropTypes.func.isRequired,
    setFastReplyTab: PropTypes.func.isRequired,
    setOrderExtraInfo: PropTypes.func.isRequired,
    toggleFastReplyVisible: PropTypes.func.isRequired,
    activeReplyTab: PropTypes.string.isRequired,
    personalReplies: PropTypes.array.isRequired,
    commonReplies: PropTypes.array.isRequired,
    orderId: PropTypes.number.isRequired,
    fastReplyVisible: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { getCommonQuickReply, getPersonalQuickReply } = this.props;
    getPersonalQuickReply();
    getCommonQuickReply();
  }

  render() {
    const {
      personalReplies,
      commonReplies,
      orderId,
      setFastReplyTab,
      setOrderExtraInfo,
      activeReplyTab,
      fastReplyVisible,
      toggleFastReplyVisible,
    } = this.props;

    const replyDivclasses = classNames({
      [styles['fast-reply']]: true,
      [styles.open]: fastReplyVisible,
    });

    return (
      <div className={replyDivclasses}>
        <header>
          <span>快捷回复</span>
          <div className={styles['set-close']}>
            <Link to="/profile/quickReply">
              <Icon type="setting" />
            </Link>
            <Icon type="cross" onClick={() => toggleFastReplyVisible(false)} />
          </div>
        </header>
        <Tabs
          activeKey={activeReplyTab}
          onChange={setFastReplyTab}
        >
          <TabPane
            key="personal"
            tab="自定义"
          >
            <ReplyWrapper
              orderId={orderId}
              replies={personalReplies}
              setOrderExtraInfo={setOrderExtraInfo}
            />
          </TabPane>

          <TabPane
            key="common"
            tab="通用"
          >
            <ReplyWrapper
              orderId={orderId}
              replies={commonReplies}
              setOrderExtraInfo={setOrderExtraInfo}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default FastReply;
