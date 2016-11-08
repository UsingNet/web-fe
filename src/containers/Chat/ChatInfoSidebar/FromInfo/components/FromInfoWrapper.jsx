import React, { PropTypes } from 'react';
import { Row, Col } from 'antd';
import styles from '../../chat-info.less';

const FromInfoWrapper = ({ label, info }) => (
  <Row className={styles['info-row']}>
    <Col
      span={6}
      className={styles['info-label']}
    >
      <span>{label}：</span>
    </Col>

    <Col
      span={14}
    >
      {info}
    </Col>
  </Row>
);

FromInfoWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.any,
};

export default FromInfoWrapper;
