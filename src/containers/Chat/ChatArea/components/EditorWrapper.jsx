import React, { Component, PropTypes } from 'react';
import Toolbar from '../Toolbar';
import ImArea from './ImArea';
import VoipArea from './VoipArea';
import SmsArea from '../SmsArea';
import EmailArea from '../EmailArea';
import styles from '../chat-area.less';

class EditorWrapper extends Component {
  static propTypes = {
    orderActions: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    sendNoteOrSms: PropTypes.func.isRequired,
    setMatchedReplies: PropTypes.func.isRequired,
    orderId: PropTypes.number.isRequired,
    contactId: PropTypes.number.isRequired,
    orderType: PropTypes.string.isRequired,
    selectedOrderExtraInfo: PropTypes.object.isRequired,
    allQuickReplies: PropTypes.array.isRequired,
    matchedReplies: PropTypes.array.isRequired,
    activeQuickReply: PropTypes.object.isRequired,
    setActiveReply: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.refs.im) {
      this.refs.im.focus();
    }
  }

  onSend = (e) => {
    const {
      orderId,
      matchedReplies,
      activeQuickReply,
      setActiveReply,
      setMatchedReplies,
    } = this.props;
    const { setOrderExtraInfo } = this.props.orderActions;
    const elem = e.target;
    const message = elem.value.trim();

    if (e.keyCode === 13 && e.ctrlKey) {
      setOrderExtraInfo({ id: orderId, key: 'enteredText', value: `${message}\n` });
    } else if (e.keyCode === 13) {
      e.preventDefault();

      if (!message) {
        return false;
      }

      if (activeQuickReply.index > -1) {
        setOrderExtraInfo({ id: orderId, key: 'enteredText', value: activeQuickReply.content });
      } else {
        this.props.sendMessage({
          order_id: this.props.orderId,
          body: message,
        });

        setOrderExtraInfo({ id: orderId, key: 'enteredText', value: '' });
      }

      setMatchedReplies([]);
      setActiveReply(-1);
    }

    if (matchedReplies.length) {
      switch (e.keyCode) {
        // 方向键：上
        case 38: {
          e.preventDefault();
          setActiveReply(activeQuickReply.index - 1);
          break;
        }
        // 方向键：下
        case 40: {
          e.preventDefault();
          setActiveReply(activeQuickReply.index + 1);
          break;
        }
        default:
          break;
      }
    }

    return true;
  }

  onSendNote = (e) => {
    const { contactId, orderId } = this.props;
    const { setOrderExtraInfo } = this.props.orderActions;
    const elem = e.target;
    const note = elem.value.trim();

    if (e.keyCode === 13 && e.ctrlKey) {
      setOrderExtraInfo({ id: orderId, key: 'enteredText', value: `${note}\n` });
    } else if (e.keyCode === 13) {
      e.preventDefault();

      if (!note) {
        return false;
      }

      this.props.sendNoteOrSms({
        to: contactId,
        body: note,
        type: 'NOTE',
      });

      setOrderExtraInfo({ id: orderId, key: 'enteredText', value: '' });
    }

    return true;
  }

  onSendEmail = (e) => {
    const { selectedOrderExtraInfo, contactId, orderId } = this.props;
    const { setOrderExtraInfo } = this.props.orderActions;

    const elem = e.target;
    const emailBody = elem.value.trim();

    if (e.keyCode === 13 && e.ctrlKey) {
      setOrderExtraInfo({ id: orderId, key: 'enteredText', value: `${emailBody}\n` });
    } else if (e.keyCode === 13) {
      e.preventDefault();

      if (!emailBody) {
        return false;
      }

      this.props.sendNoteOrSms({
        to: contactId,
        title: selectedOrderExtraInfo.emailTitle,
        body: emailBody,
        type: 'MAIL',
      });

      setOrderExtraInfo({ id: orderId, key: 'enteredText', value: '' });
      setOrderExtraInfo({ id: orderId, key: 'emailTitle', value: '' });
    }

    return true;
  }

  onInsert = (value) => {
    const { orderId, selectedOrderExtraInfo } = this.props;
    const { setOrderExtraInfo } = this.props.orderActions;
    const oldText = selectedOrderExtraInfo.enteredText || '';
    setOrderExtraInfo({ id: orderId, key: 'enteredText', value: oldText + value });
  }

  onInput = (e, type) => {
    const {
      orderId,
      allQuickReplies,
      setMatchedReplies,
    } = this.props;
    const { setOrderExtraInfo } = this.props.orderActions;
    const text = e.target.value;

    setOrderExtraInfo({ id: orderId, key: 'enteredText', value: text });

    if (text && type !== 'MAIL' && type !== 'NOTE') {
      let replies = [];
      if (text === '#') {
        replies = allQuickReplies;
      } else {
        replies = allQuickReplies.filter(reply => (text
                                                  && (reply.shortcut.indexOf(text) > -1
                                                  || reply.content.indexOf(text) > -1)));
      }

      const matchedQuickReplies = replies.map(r => ({
        shortcut: r.shortcut.replace(text, `<i>${text}</i>`),
        htmlContent: r.content.replace(text, `<i>${text}</i>`),
        content: r.content,
      }));

      setMatchedReplies(matchedQuickReplies);
    }

    if (!text) {
      setMatchedReplies([]);
    }
  }

  onClickQuickReply = (value) => {
    const { orderId, setMatchedReplies } = this.props;
    const { setOrderExtraInfo } = this.props.orderActions;
    setOrderExtraInfo({ id: orderId, key: 'enteredText', value });
    setMatchedReplies([]);

    this.refs.im.focus();
  }

  render() {
    const { selectedOrderExtraInfo, orderType, matchedReplies, activeQuickReply } = this.props;
    let inputArea = '';

    switch (orderType) {
      case 'IM':
      case 'WECHAT':
      case 'WEIBO': {
        inputArea = (
          <ImArea
            ref="im"
            matchedReplies={matchedReplies}
            activeQuickReply={activeQuickReply}
            enteredText={selectedOrderExtraInfo.enteredText}
            onInput={this.onInput}
            onSend={(e) => this.onSend(e)}
            onClickQuickReply={this.onClickQuickReply}
          />
        );

        break;
      }
      case 'VOIP': {
        inputArea = (
          <VoipArea
            voipStatus={selectedOrderExtraInfo.voipStatus}
            enteredText={selectedOrderExtraInfo.enteredText}
            onInput={this.onInput}
            onSend={e => this.onSendNote(e)}
          />
        );
        break;
      }
      case 'SMS': {
        inputArea = (
          <SmsArea />
        );
        break;
      }
      case 'MAIL': {
        inputArea = (
          <EmailArea
            orderId={this.props.orderId}
            emailTitle={selectedOrderExtraInfo.emailTitle}
            enteredText={selectedOrderExtraInfo.enteredText}
            onInput={this.onInput}
            onSend={e => this.onSendEmail(e)}
          />
        );
        break;
      }
      default:
        break;
    }

    return (
      <div className={styles.editor}>
        <Toolbar
          onClickEmoji={this.onInsert}
        />

        <div className={styles['input-area']}>
          {inputArea}
        </div>
      </div>
    );
  }
}

export default EditorWrapper;
