import React, { PropTypes } from 'react';
import InfoWrapper from './InfoWrapper';
import styles from '../chat-info.less';

const ExtendInfo = ({ extendInfo }) => {
  const extendNode = extendInfo.map((ex, i) => {
    const text = (
      <span className={styles['info-detail']}>{ex.value}</span>
    );

    return (
      <InfoWrapper key={i} label={ex.key} info={text} />
    );
  });

  return (
    <div>
      {extendNode}
    </div>
  );
};

ExtendInfo.propTypes = {
  extendInfo: PropTypes.array.isRequired,
};

export default ExtendInfo;
