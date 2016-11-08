import React, { PropTypes } from 'react';
import { Card } from 'antd';

const ChartWrapper = (props) => (
  <Card className={props.className}>
    {props.children}
  </Card>
);

ChartWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default ChartWrapper;
