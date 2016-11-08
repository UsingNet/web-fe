import React, { PropTypes } from 'react';
import { QQFaceList } from 'modules/emojiMap';
import styles from './emoji.less';
import chatStyles from '../../containers/Chat/ChatArea/chat-area.less';

const Emoji = (props) => {
  const emojiList = QQFaceList.map((item, i) => (
    <li
      key={i}
      data={`[${item}]`}
      onClick={e => {
        const textAreaNode = document.querySelector(`.${chatStyles['im-area']} textarea`);
        if (textAreaNode) {
          textAreaNode.focus();
        }

        props.onClickEmoji(e.target.getAttribute('data'));
      }}
    >
      <span data={`[${item}]`} className={`qqemoji qqemoji${i}`}></span>
    </li>
  ));

  return (
    <ul className={styles['emoji-list']}>
      {emojiList}
    </ul>
  );
};

Emoji.propTypes = {
  onClickEmoji: PropTypes.func,
};

export default Emoji;
