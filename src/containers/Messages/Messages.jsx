import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Modal, Button } from 'antd';
import transformText from 'modules/transformText';
import MessageSendItem from './components/MessageSendItem';
import MessageReceiveItem from './components/MessageReceiveItem';
import MessageSystemItem from './components/MessageSystemItem';
import styles from './messages.less';

class Messages extends React.Component {
  static propTypes = {
    messages: PropTypes.array,
    hasMoreMessage: PropTypes.bool,
    onLoadMoreMessage: PropTypes.func,
    onUndoMessage: PropTypes.func,
    messagesActions: PropTypes.object.isRequired,
    messagesState: PropTypes.object.isRequired,
    action: PropTypes.string.isRequired,
  }

  state = {
    emailTitle: '',
    emailBody: '',
    emailVisible: false,
  }

  componentDidUpdate() {
    if (this.props.action === 'row') {
      this.resetScroll();
    }
  }

  createMarkup = (html) => ({
    __html: transformText(html.replace(/\n/g, '<br/>')),
  })

  resetScroll = () => {
    const dom = ReactDOM.findDOMNode(this.refs.messages);
    const height = dom.scrollHeight;
    dom.scrollTop = height;
    const images = dom.getElementsByTagName('img');
    const count = images.length;
    for (let i = 0; i < count; i++) {
      images[i].onload = () => {
        const newHeight = dom.scrollHeight;
        dom.scrollTop = newHeight;
      };
    }
  };

  showMail = (email) => {
    const { title, body } = email;
    this.setState({
      emailTitle: title,
      emailBody: body,
      emailVisible: true,
    });
  }

  hideMail = () => {
    this.setState({
      emailVisible: false,
    });
  }

  render() {
    const that = this;
    const { hasMoreMessage, messages, messagesActions } = this.props;
    let loadMoreNode = '';

    const sortedMessages = messages.sort((prev, next) => {
      if (prev.created_at > next.created_at) {
        return 1;
      } else if (prev.created_at < next.created_at) {
        return -1;
      }
      return 0;
    });

    const messageNodes = sortedMessages.map((m, i) => {
      const createdAt = moment(Number(m.created_at)).fromNow();

      // if (typeof m.created_at === 'string') {
      //   const createdAtUnix = moment(m.created_at).unix();
      //   createdAt = moment(createdAtUnix * 1000).fromNow();
      // } else {
      //   createdAt = moment(m.created_at * 1000).fromNow();
      // }

      if (m.direction === 'SEND' && m.type !== 'SYSTEM') {
        return (
          <MessageSendItem
            key={i}
            message={m}
            createdAt={createdAt}
            createMarkup={this.createMarkup}
            onUndoMessage={this.props.onUndoMessage}
            showMail={that.showMail}
          />
        );
      }

      if (m.direction === 'RECEIVE' && m.type !== 'SYSTEM') {
        return (
          <MessageReceiveItem
            key={i}
            message={m}
            createdAt={createdAt}
            createMarkup={this.createMarkup}
            showMail={that.showMail}
          />
        );
      }

      if (m.type === 'SYSTEM') {
        return (
          <MessageSystemItem
            key={i}
            message={m}
            createdAt={createdAt}
            createMarkup={this.createMarkup}
          />
        );
      }

      return (<div key={i}></div>);
    });

    if (hasMoreMessage) {
      loadMoreNode = (
        <div
          className={styles['more-message']}
          onClick={this.props.onLoadMoreMessage}
        >
          更多消息
        </div>
      );
    }

    const modalFooter = (
      <Button type="primary" size="large" onClick={messagesActions.hideMail}>确定</Button>
    );

    return (
      <div className={styles.messages} ref="messages">
        {loadMoreNode}
        {messageNodes}

        <Modal
          title="邮件详细"
          wrapClassName="mail-modal"
          visible={this.state.emailVisible}
          onCancel={this.hideMail}
          footer={modalFooter}
        >
          <div className="head">
            <h4>标题</h4>
            <p>
                {this.state.emailTitle}
            </p>
          </div>
          <div className="body">
            <h4>内容</h4>
            <p dangerouslySetInnerHTML={this.createMarkup(this.state.emailBody)}></p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Messages;
