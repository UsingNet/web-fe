import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Modal, Form, Input, Select, Button, Icon } from 'antd';
import * as WebActions from 'actions/web';

const FormItem = Form.Item;
const Option = Select.Option;

class OrderFormModal extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    orderEditVisible: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    webActions: PropTypes.object.isRequired,
    siteIndex: PropTypes.number.isRequired,
    orderIndex: PropTypes.string.isRequired,
  }

  completeEditOrderForm = () => {
    const { webActions, data, siteIndex, orderIndex } = this.props;
    webActions.updateOrderForm({ siteIndex, orderIndex, data });
    webActions.toggleOrderFormModalVisible(false);
  }

  render() {
    const { getFieldProps, getFieldValue } = this.props.form;
    const { webActions } = this.props;

    const orderInputItem = getFieldValue('items').map((item, index) => (
      <FormItem
        key={index}
        wrapperCol={{ span: 24 }}
      >
        <Row gutter={10}>
          <Col span={4}>
            <Select
              {...getFieldProps(`item.${index}.type`, {
                initialValue: item.type,
              })}
            >
              <Option value="input">单行输入框</Option>
              <Option value="textarea">多行行输入框</Option>
            </Select>
          </Col>

          <Col span={17}>
            <Input
              {...getFieldProps(`item.${index}.placeholder`, {
                initialValue: item.placeholder,
              })}
              type="text"
              placeholder="提示语"
            />
          </Col>

          <Col span={1} onClick={() => webActions.upOrderFormItem(index)}>
            <Icon type="up" />
          </Col>

          <Col span={1} onClick={() => webActions.downOrderFormItem(index)}>
            <Icon type="down" />
          </Col>

          <Col span={1} onClick={() => webActions.removeOrderFormItem(index)}>
            <Icon type="cross" />
          </Col>
        </Row>
      </FormItem>
    ));

    return (
      <Modal
        title="编辑表单"
        visible={this.props.orderEditVisible}
        onOk={this.completeEditOrderForm}
        onCancel={() => webActions.toggleOrderFormModalVisible(false)}
      >
        <Row className="change-item-type">
          <Col span={10}>
            <Button
              type="primary"
              size="small"
              onClick={webActions.addOrderFormItem}
            >
                添加
            </Button>
          </Col>
        </Row>

        <Form horizontal>
          <h4>标题</h4>
          <FormItem
            wrapperCol={{ span: 24 }}
          >
            <Input
              {...getFieldProps('title')}
              type="text"
              placeholder="标题"
            />
          </FormItem>

          <h4>输入框</h4>
          {orderInputItem}
        </Form>
      </Modal>
    );
  }
}

function mapStateToProps({ siteOrder }) {
  return {
    data: siteOrder.orderFormData,
    orderEditVisible: siteOrder.orderEditVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    webActions: bindActionCreators(WebActions, dispatch),
  };
}

function mapPropsToFields(props) {
  return {
    title: {
      value: props.data.title,
    },
    items: {
      value: props.data.items,
    },
  };
}

function onFieldsChange(props, fields) {
  const { webActions } = props;

  webActions.updateOrderFormItemValue({ fields });
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({
  mapPropsToFields,
  onFieldsChange,
})(OrderFormModal));
