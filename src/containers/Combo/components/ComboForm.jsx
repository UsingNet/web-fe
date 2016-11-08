import React, { PropTypes } from 'react';
import { Form, InputNumber, Radio } from 'antd';
import { transformObjectToFitForm, getDatePart } from 'modules/helpers';
import styles from '../combo.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const ComboForm = (props) => {
  const { getFieldProps } = props.form;
  const { currentPlan, selectedPlan, plans } = props;

  const planRadios = plans.map(plan => (
    <Radio
      key={plan.id}
      value={plan.id}
    >
      <div className={styles['plan-card']} style={{ color: plan.color }}>
        <div className={styles.header}>
          <h1>{plan.name}</h1>
        </div>

        <div className={styles.body}>
          <h4>{plan.fit_for}</h4>
          <div className={styles['price-wrapper']}>
            <span>￥</span>
            <span className={styles.price}>{parseFloat(plan.price)}</span>
            <span>/坐席/年</span>
          </div>
        </div>

        <div className={styles.footer}>
          <span>{plan.desc}</span>
        </div>
      </div>
    </Radio>
  ));

  return (
    <Form horizontal className={styles['combo-form']}>

      <FormItem
        {...formItemLayout}
        label="选择套餐"
      >
        <RadioGroup
          {...getFieldProps('plan_id', {
            initialValue: selectedPlan.id,
          })}
        >
          {planRadios}
        </RadioGroup>
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="座席数"
      >
        <InputNumber
          {...getFieldProps('agent_num', {
            initialValue: parseInt(selectedPlan.agent_num, 10),
          })}
          min={parseInt(currentPlan.agent_num, 10)}
          max={99}
        />
        <span className="ant-form-text">个</span>
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="到期时间"
      >
        <InputNumber
          min={getDatePart(currentPlan.end_at, 'year')}
          max={2030}
          {...getFieldProps('year', {
            initialValue: getDatePart(selectedPlan.end_at, 'year'),
          })}
        />
        <span
          className="ant-form-text"
        >
          年 {getDatePart(selectedPlan.end_at, 'month')} 月
          {getDatePart(selectedPlan.end_at, 'day')} 日
        </span>
      </FormItem>
    </Form>
  );
};

ComboForm.propTypes = {
  form: PropTypes.object.isRequired,
  selectedPlan: PropTypes.object.isRequired,
  currentPlan: PropTypes.object.isRequired,
  plans: PropTypes.array.isRequired,
};

const mapPropsToFields = (props) => transformObjectToFitForm(props.selectedPlan);

const onFieldsChange = (props, fields) => props.comboActions.updatePlanFields({ fields });

export default Form.create({ mapPropsToFields, onFieldsChange })(ComboForm);
