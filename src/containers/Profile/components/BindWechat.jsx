import React from 'react';

const BindWechat = () => (
  <div>
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <div className="img" style={{ width: 200, height: 200, margin: 'auto' }}>
        <img alt="微信二维码" style={{ width: 200 }} src="/api/wechat/qrcode" />
      </div>
      <h4>使用微信“扫一扫”，绑定微信</h4>
      <p style={{ marginTop: 40 }}>当所有客服都不在线时，客户发来咨询消息将通过微信公众号通知您。</p>
    </div>
  </div>
);

export default BindWechat;
