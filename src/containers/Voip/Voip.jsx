import React, { PropTypes } from 'react';
import { Steps } from 'antd';
import QueueAnim from 'rc-queue-anim';
import StepZero from './components/StepZero';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import styles from './voip.less';

const Step = Steps.Step;

const steps = [{
  title: '申请',
  description: '向优信申请开通电话功能；',
}, {
  title: '审核',
  description: '优信的员工对您的申请进行细致的审核；',
}, {
  title: '绑定自定义号码（可选）',
  description: '申请审核成功，您可以绑定您的自定义号码；',
}, { title: '接入成功', description: '电话已经处于接入状态。',
}].map((s, i) => (<Step key={i} title={s.title} description={s.description} />));

class Voip extends React.Component {
  static propTypes = {
    voip: PropTypes.object.isRequired,
    voipActions: PropTypes.object.isRequired,
    baseSetting: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.voipActions.getVoip();
  }

  render() {
    const { voip, baseSetting, voipActions } = this.props;

    const stepContents = [
      <StepZero
        key={0}
        voipPrice={baseSetting.price.voip}
        applyVoip={voipActions.applyVoip}
      />,
      <StepOne key={1} />,
      [
        <StepTwo
          key={2}
          voip={voip.voip}
          checkFiles={voip.checkFiles}
          showEditForm={voip.showEditForm}
          {...voipActions}
        />,
        <StepThree
          key={3}
          voip={voip.voip}
          showEditForm={voip.showEditForm}
          {...voipActions}
        />,
      ],
      <StepFour
        key={4}
        voipNumber={voip.voip.number}
        displayNumberStatus={voip.voip.display_number_status}
        voipPrice={baseSetting.price.voip}
        {...voipActions}
      />,
    ];

    return (
      <div className={styles['phone-access']}>
        <Steps current={voip.currentStep} size="small">
          {steps}
        </Steps>
        <div className={styles['phone-access-body']}>
          <QueueAnim>
            {stepContents[voip.currentStep]}
          </QueueAnim>
        </div>
      </div>
    );
  }
}

export default Voip;
