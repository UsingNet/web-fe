import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import QuickReplyPrompt from './QuickReplyPrompt';
import styles from '../chat-area.less';

class ImArea extends React.Component {
  static propTypes = {
    matchedReplies: PropTypes.array.isRequired,
    activeQuickReply: PropTypes.object.isRequired,
    enteredText: PropTypes.string,
    onInput: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
    onClickQuickReply: PropTypes.func.isRequired,
  };

  focus = () => {
    ReactDom.findDOMNode(this.refs.input).focus();
  }

  render() {
    const {
      matchedReplies,
      activeQuickReply,
      enteredText,
      onInput,
      onSend,
      onClickQuickReply,
    } = this.props;

    return (
      <div className={styles['im-area']}>
        <QuickReplyPrompt
          replies={matchedReplies}
          onClickQuickReply={onClickQuickReply}
          activeReplyIndex={activeQuickReply.index}
        />
        <textarea
          ref="input"
          value={enteredText}
          onChange={onInput}
          onKeyDown={(e) => onSend(e)}
        />
        <div className={styles.footer}>
          按Enter发送，Ctrl+Enter换行
        </div>
      </div>
    );
  }
}

export default ImArea;
