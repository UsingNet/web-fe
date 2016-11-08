import React, { PropTypes } from 'react';
import { Button } from 'antd';

const StepZero = (props) => (
  <div>
    <ul style={{ listStyle: 'inherit', marginLeft: 15 }}>
      <li>专业版及其以上套餐方可开通电话功能，如权限不足，请升级您的套餐；</li>
      <li>接入电话功能后该功能不能关闭；</li>
      <li>电话功能是优信提供的后付费功能，资费为：{props.voipPrice}元/分钟。</li>
    </ul>

    <Button
      type="primary"
      size="large"
      style={{ marginTop: 20, marginLeft: 15 }}
      onClick={props.applyVoip}
    >
      申请开通电话功能
    </Button>
  </div>
);

StepZero.propTypes = {
  voipPrice: PropTypes.number.isRequired,
  applyVoip: PropTypes.func.isRequired,
};

export default StepZero;
