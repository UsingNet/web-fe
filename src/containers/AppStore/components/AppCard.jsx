import React, { PropTypes } from 'react';
import { Card, Tag, Button } from 'antd';
import styles from '../appstore.less';

const AppCard = (props) => {
  const { app, onDisableApp, onEnableApp } = props;

  return (
    <Card
      title={app.name}
      extra={app.used ? <Tag color="green">已启用</Tag> : <Tag>未启用</Tag>}
    >
      <div className={`${styles.info} clearfix`}>
        <div style={{ float: 'left' }}>
          <img style={{ width: 80 }} alt="" src={app.img} />
        </div>

        <p style={{ margin: '12px 7px', float: 'left' }} >
          {app.desc}
        </p>
      </div>
      {
        app.used ? (
          <div className={`${styles.action} clearfix`}>
            <Button
              type="ghost"
              size="small"
              onClick={(event) => onDisableApp(event, app.id)}
            >
              停用
            </Button>
          </div>
        ) : (
          <div className={`${styles.action} clearfix`}>
            <Button
              type="primary"
              size="small"
              onClick={(event) => onEnableApp(event, app.id)}
            >
              启用
            </Button>
          </div>
        )
      }
    </Card>
  );
};

AppCard.propTypes = {
  app: PropTypes.object.isRequired,
  onDisableApp: PropTypes.func.isRequired,
  onEnableApp: PropTypes.func.isRequired,
};

export default AppCard;
