import React, { PropTypes } from 'react';
import { Popover, Icon } from 'antd';
import FromInfoWrapper from './components/FromInfoWrapper';
import TrackTimeline from './components/TrackTimeline';
import styles from '../chat-info.less';

const FromInfo = ({ fromInfo, wechatName, track }) => {
  let fromNode = '';
  const { type } = fromInfo;

  switch (type) {
    case '电话': {
      const numberInfo = (
        <span className={styles['info-detail']}>{fromInfo.number}</span>
      );
      const locationInfo = (
        <span className={styles['info-detail']}>{fromInfo.location}</span>
      );

      fromNode = (
        <div>
          <FromInfoWrapper label="号码" info={numberInfo} />
          <FromInfoWrapper label="归属" info={locationInfo} />
        </div>
      );
      break;
    }
    case '邮件': {
      fromNode = (
        <div>
          <FromInfoWrapper label="邮箱" text={fromInfo.email} />
        </div>
      );
      break;
    }
    case '网站': {
      const siteInfo = (
        <span className={styles['info-detail']}>{fromInfo.site_name}</span>
      );

      const trackNode = (
        <TrackTimeline trackData={track.data} />
      );

      const trackInfo = (
        <span className={styles['info-detail']}>
          <a className={styles['track']} href={fromInfo.href} target="_blank" title={fromInfo.name}>{fromInfo.name}</a>
          <Popover
            title="客户轨迹"
            placement="topRight"
            trigger="click"
            content={trackNode}
          >
            <Icon type="caret-circle-o-down" />
          </Popover>
        </span>
      );

      fromNode = (
        <div>
          <FromInfoWrapper label="名称" info={siteInfo} />
          {track.data.length ? <FromInfoWrapper label="途径" info={trackInfo} /> : ''}
        </div>
      );
      break;
    }
    case '微博': {
      const weiboInfo = (
        <span className={styles['info-detail']}>{fromInfo.name}</span>
      );

      const weiboLink = (
        <span className={styles['info-detail']}>
          <a href={fromInfo.url} target="_blank" title={fromInfo.url}>{fromInfo.url}</a>
        </span>
      );

      fromNode = (
        <div>
          <FromInfoWrapper label="帐号" info={weiboInfo} />
          <FromInfoWrapper label="链接" info={weiboLink} />
        </div>
      );
      break;
    }
    case '微信': {
      fromNode = (
        <div>
          <FromInfoWrapper label="公众号" text={wechatName} />
        </div>
      );
      break;
    }
    default:
      break;
  }

  return (
    <div>
      {fromNode}
    </div>
  );
};

FromInfo.propTypes = {
  fromInfo: PropTypes.object.isRequired,
  wechatName: PropTypes.string,
  track: PropTypes.object,
};

export default FromInfo;
