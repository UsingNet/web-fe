import React, { PropTypes } from 'react';
import { Card, Steps } from 'antd';
import ComboForm from './ComboForm';
import ComboPreview from './ComboPreview';
import ComboPreviewTable from './ComboPreviewTable';
import PayCombo from './PayCombo';
import styles from '../combo.less';

const Step = Steps.Step;

const BuyCombo = (props) => {
  const { combo } = props;
  const step = combo.currentStep;
  let currentStepNode = '';

  switch (step) {
    case 0: {
      currentStepNode = (
        <div className={styles['set-combo']}>
          <ComboForm {...combo} comboActions={props.comboActions} />
          <div className={styles.spacer}></div>
          <ComboPreview {...combo} comboActions={props.comboActions} />
        </div>
      );
      break;
    }

    case 1: {
      currentStepNode = (
        <ComboPreviewTable
          {...combo}
          comboActions={props.comboActions}
        />
      );
      break;
    }

    case 2: {
      currentStepNode = (
        <PayCombo
          baseSetting={props.baseSetting}
          baseSettingActions={props.baseSettingActions}
          comboActions={props.comboActions}
          pay={props.pay}
          payActions={props.payActions}
          {...props.combo}
        />
      );
      break;
    }

    default:
      break;
  }

  return (
    <Card title="购买套餐" style={{ marginTop: 20 }}>
      <Steps size="small" current={combo.currentStep} style={{ marginBottom: 30 }}>
        <Step key={1} title="设置套餐" />
        <Step key={2} title="确认套餐" />
        <Step key={3} title="支付" />
      </Steps>

      {currentStepNode}
    </Card>
  );
};

BuyCombo.propTypes = {
  combo: PropTypes.object.isRequired,
  pay: PropTypes.object.isRequired,
  payActions: PropTypes.object.isRequired,
  baseSetting: PropTypes.object.isRequired,
  comboActions: PropTypes.object.isRequired,
  baseSettingActions: PropTypes.object.isRequired,
};

export default BuyCombo;
