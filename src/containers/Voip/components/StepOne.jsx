import React from 'react';
import { Button } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
class StepOne extends React.Component {
  render() {
    return (
      <div>
        <Button
          type="primary"
          loading
        >
          正在审核中，请耐心等候
        </Button>
      </div>
    );
  }
}

export default StepOne;
