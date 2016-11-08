import React, { PropTypes } from 'react';
import { Row, Col } from 'antd';
import SourceDevices from 'components/SourceDevices';
import styles from '../chat-info.less';

const AccessInfo = ({ address, ip, userAgent }) => (
  <div className="access-info">
    <Row className={styles['info-row']}>
      <Col
        span={6}
        className={styles['info-label']}
      >
        <span>地址：</span>
      </Col>

      <Col
        span={14}
      >
        <span className={styles['info-detail']}>{address}</span>
      </Col>
    </Row>

    <Row className={styles['info-row']}>
      <Col
        span={6}
        className={styles['info-label']}
      >
        <span>IP：</span>
      </Col>

      <Col
        span={14}
      >
        <span className={styles['info-detail']}>{ip}</span>
      </Col>
    </Row>

    <Row className={styles['info-row']}>
      <Col
        span={6}
        className={styles['info-label']}
      >
        <span>设备：</span>
      </Col>

      <Col
        span={14}
      >
        <div className={styles['info-detail']}>
          <SourceDevices userAgent={userAgent} />
        </div>
      </Col>
    </Row>
  </div>
);

AccessInfo.propTypes = {
  address: PropTypes.string.isRequired,
  ip: PropTypes.string.isRequired,
  userAgent: PropTypes.string.isRequired,
};

export default AccessInfo;
