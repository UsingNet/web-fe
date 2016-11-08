import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../chat-area.less';

const QuickReplyPrompt = ({ replies, onClickQuickReply, activeReplyIndex }) => {
  const replyNode = replies.map((r, i) => {
    const liClasses = classNames({
      [styles.active]: activeReplyIndex === i,
    });

    return (
      <li
        key={i}
        className={liClasses}
        onClick={() => onClickQuickReply(r.content)}
      >
        #
        <span
          className={styles.shortcut}
          dangerouslySetInnerHTML={{ __html: r.shortcut }}
        >
        </span>
        <span
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: r.htmlContent }}
        >
        </span>
      </li>
    );
  });

  return (
    <div className={styles['quick-reply-prompt']}>
      <ul>
        {replyNode}
      </ul>
    </div>
  );
};

QuickReplyPrompt.propTypes = {
  replies: PropTypes.array.isRequired,
  activeReplyIndex: PropTypes.number.isRequired,
  onClickQuickReply: PropTypes.func.isRequired,
};

export default QuickReplyPrompt;
