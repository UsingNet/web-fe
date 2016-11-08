import React, { PropTypes } from 'react';
import ChatHeader from './ChatHeader';
import EditorWrapper from './components/EditorWrapper';
import Message from 'containers/Messages';
import styles from './chat-area.less';

class ChatArea extends React.Component {
  static propTypes = {
    contactId: PropTypes.number.isRequired,
    orderType: PropTypes.string.isRequired,
    orderActions: PropTypes.object.isRequired,
    messageActions: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    allQuickReplies: PropTypes.array.isRequired,
    matchedReplies: PropTypes.array.isRequired,
    orderExtraInfo: PropTypes.object.isRequired,
    getOnlineAgents: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    hasMoreMessage: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    getApps: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { getApps } = this.props;
    const { getMessageList } = this.props.messageActions;
    getMessageList({ order_id: this.props.params.id });
    getApps();
  }

  componentDidUpdate(preProps) {
    if (this.props.params.id !== preProps.params.id) {
      this.props.messageActions.getMessageList({ order_id: this.props.params.id });
    }
  }

  onLoadMoreMessage = () => {
    const { messages } = this.props;
    const { getMoreMessage } = this.props.messageActions;
    /*eslint no-underscore-dangle: [2, { "allow": ["_id"] }]*/
    const lastMessageId = messages[0]._id;
    const orderId = this.props.params.id;
    getMoreMessage({ orderId, lastMessageId });
  }

  onUndoMessage = (msgId) => {
    const { messageActions } = this.props;
    // messageActions.undoMessage(msgId);
    messageActions.toggleMessageUndoStatus({ id: msgId, undoStatus: true });
  }

  render() {
    const {
      messages,
      orderExtraInfo,
      messageActions,
    } = this.props;
    const orderId = parseInt(this.props.params.id, 10);

    const selectedOrderExtraInfo = orderExtraInfo[orderId] || {};

    return (
      <div className={styles['chat-area']}>
        <div className={styles['chat-box']}>

          <ChatHeader />

          <div className={styles['message-area']}>
            <Message
              messages={messages}
              hasMoreMessage={this.props.hasMoreMessage}
              onLoadMoreMessage={this.onLoadMoreMessage}
              onUndoMessage={this.onUndoMessage}
              action={this.props.action}
            />
          </div>

          <EditorWrapper
            orderId={orderId}
            sendMessage={messageActions.sendMessage}
            sendNoteOrSms={messageActions.sendNoteOrSms}
            selectedOrderExtraInfo={selectedOrderExtraInfo}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

export default ChatArea;
