import React, { PropTypes } from 'react';
import { Card } from 'antd';

const CurrentCombo = (props) => {
  const { currentPlan } = props;
  const color = (currentPlan.plan
                  && currentPlan.plan.slug !== 'experience'
                  && currentPlan.plan.color
                )
                || '#666';
  let endAt = '';

  if (currentPlan.plan && currentPlan.plan.slug === 'experience') {
    endAt = '无限期体验';
  } else if (currentPlan.plan && currentPlan.plan.slug !== 'experience') {
    endAt = currentPlan.end_at.substr(0, 10);
  }

  return (
    <Card
      title="当前套餐"
      bodyStyle={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <h3 style={{ color }}>{currentPlan.name}</h3>
      <span>
        <h3 style={{ color, display: 'inline-block' }}>{currentPlan.agent_num}</h3>个坐席
      </span>
      <span>
        到期时间：<h3 style={{ color, display: 'inline-block' }}>{endAt}</h3>
      </span>
    </Card>
  );
};

CurrentCombo.propTypes = {
  currentPlan: PropTypes.object.isRequired,
};

export default CurrentCombo;
