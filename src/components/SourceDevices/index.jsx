import React, { PropTypes } from 'react';
import UA from 'ua-device';

const SourceDevices = (props) => {
  const { userAgent } = props;
  let devices = '';

  if (userAgent === 'micromessenger') {
    devices = (
      <p className="devices">
        <i className="wechat" title="wechat"></i>
      </p>
    );
  } else if (userAgent.indexOf('spider') > -1 || userAgent.indexOf('bot') > -1) {
    devices = (
      <p className="devices">
        <i className="bot" title="爬虫"></i>
      </p>
    );
  } else {
    const ua = new UA(userAgent);
    const device = ua.device.type ? ua.device.type.toLowerCase() : '';

    const os = ua.os.name ? ua.os.name.toLowerCase() : '';
    let browser = ua.browser.name ? ua.browser.name.toLowerCase() : '';

    switch (browser) {
      case '百度框':
        browser = 'baiduboxapp';
        break;
      case '微信':
        browser = 'wechat';
        break;
      default:
        break;
    }

    const titleMap = {
      desktop: '电脑',
      mobile: '手机',
      chrome: '谷歌浏览器',
      chromium: '谷歌浏览器',
      'google browser': '谷歌浏览器',
      maxthon: '傲游浏览器',
      'qq browser': 'QQ浏览器',
      'sogou explorer': '搜狗浏览器',
      'miui browser': '小米手机浏览器',
      ios: '苹果',
      'mac os x': '苹果',
      baiduboxapp: '百度搜索',
      qt: 'Qt浏览器',
      wechat: '微信',
      firefox: '火狐浏览器',
      'internet explorer': 'IE浏览器',
      android: '安卓',
      linux: 'Linux系统',
      ubuntu: 'Ubuntu系统',
      opera: 'Opera浏览器',
      safari: 'Safari浏览器',
      windows: 'Windows系统',
      'browser uc': 'UC浏览器',
    };

    devices = (
      <p className="devices">
        <i className={device} title={titleMap[device]}></i>
        <i className={os} title={titleMap[os]}></i>
        <i className={browser} title={titleMap[browser]}></i>
      </p>
    );
  }

  return (
    <div className="user-agent-info">{devices}</div>
  );
};

SourceDevices.propTypes = {
  userAgent: PropTypes.string.isRequired,
};

export default SourceDevices;
