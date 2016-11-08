import React, { PropTypes } from 'react';
import { Card, Icon } from 'antd';

const ChartWrapper = ({ children, className, title, empty }) => {
  let child = children;

  if (empty) {
    child = (
      <div>
        <h2 style={{ fontWeight: 400 }}>{title}</h2>
        <div
          style={{
            opacity: 1,
            display: 'flex',
            height: 195,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon type="frown" /><span>暂无数据</span>
        </div>
      </div>
    );
  }

  return (
    <Card className={className}>
      {child}
    </Card>
  );
};

ChartWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  title: PropTypes.string,
  empty: PropTypes.bool,
};

export default ChartWrapper;
