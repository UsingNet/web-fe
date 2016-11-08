import React, { PropTypes } from 'react';
import SourceDevices from 'components/SourceDevices';
import { Row, Col } from 'antd';
import styles from '../history.less';

const ContactInfo = (props) => {
  const { contact } = props;
  let devices = '';
  let referrer = '';

  if (contact && contact.package && contact.package.user_agent) {
    const pkg = contact.package;
    let userAgent = pkg.user_agent;

    devices = (
      <SourceDevices userAgent={userAgent} />
    );

    if (contact.package.referrer) {
      referrer = (
        <p className="referrer ant-col-14">
          <a href={pkg.referrer} target="_blank">
            {pkg.referrer}
          </a>
        </p>
      );
    }
  }

  return (
    <div className={styles['user-info']}>
      <div className={styles.head}>
        <span>用户信息</span>
      </div>

      <div className={styles['user-content']}>
        <div className={`clearfix ${styles['info-item']}`}>
          <h4 className={styles.title}>
              客户资料
          </h4>

          <div className={styles.items}>
            <Row className={styles.items}>
              <Col span={6} className={styles['text-right']}>姓名：</Col>
              <Col span={14}>{contact.name}</Col>
            </Row>

            <Row>
              <Col span={6} className={styles['text-right']}>备注：</Col>
              <Col span={14}>{contact.remark}</Col>
            </Row>

            <Row>
              <Col span={6} className={styles['text-right']}>手机：</Col>
              <Col span={14}>{contact.phone}</Col>
            </Row>

            <Row>
              <Col span={6} className={styles['text-right']}>邮箱：</Col>
              <Col span={14}>{contact.email}</Col>
            </Row>
          </div>
        </div>

        <div className={`clearfix ${styles['info-item']}`}>
          <h4 className={styles.title}>
              访问信息
          </h4>

          <div className={styles.items}>
            <Row className={styles.items}>
              <Col span={6} className={styles['text-right']}>地址：</Col>
              <Col span={14}>{contact.package.address}</Col>
            </Row>

            <Row>
              <Col span={6} className={styles['text-right']}>IP：</Col>
              <Col span={14}>{contact.ip}</Col>
            </Row>

            <Row>
              <Col span={6} className={styles['text-right']}>设备：</Col>
              <Col span={14}>{devices}</Col>
            </Row>

            <Row>
              <Col span={6} className={styles['text-right']}>来源：</Col>
              <Col span={14}>{referrer}</Col>
            </Row>
          </div>

        </div>
      </div>
    </div>
  );
};

ContactInfo.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactInfo;
