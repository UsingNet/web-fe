import React, { PropTypes } from 'react';
import { Card } from 'antd';
import TextStatistics from './TextStatistics';

const TextWrapper = (props) => {
  const { className, data } = props;
  const textStats = data.map((d, i) => (
    <TextStatistics key={i} {...d} />
  ));

  return (
    <Card>
      <div className={className}>
        {textStats}
      </div>
    </Card>
  );
};

TextWrapper.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
};

export default TextWrapper;
