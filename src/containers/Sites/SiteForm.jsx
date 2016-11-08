import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Popconfirm,
  message,
  Popover,
  Form,
  Select,
  InputNumber,
  Input,
  Radio,
  Button,
  Upload,
  Icon,
  Switch,
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import { transformObjectToFitForm } from 'modules/helpers';
import OrderFormModal from './OrderFormModal';
import AccessCodeModal from './AccessCodeModal';
import * as WebActions from 'actions/web';
import styles from './sites.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class SiteForm extends React.Component {
  static propTypes = {
    siteCount: PropTypes.number.isRequired,
    site: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    webActions: PropTypes.object.isRequired,
    pageDistanceCustomVisible: PropTypes.bool.isRequired,
    orderIndex: PropTypes.string.isRequired,
    siteIndex: PropTypes.number.isRequired,
    accessCodeVisible: PropTypes.bool.isRequired,
    customColorVisible: PropTypes.bool.isRequired,
  }

  onLogoUpload = (e) => {
    const { siteIndex } = this.props;
    if (e.fileList && e.fileList.length > 1) {
      e.fileList.shift();
    }
    if (e.file.status === 'done') {
      // this.props.form.setFieldsValue({ icon_shape: 'none' });
      if (e.file.response.code === 200) {
        this.props.webActions.updateSiteValue({
          siteIndex,
          fields: {
            logo: {
              name: 'logo',
              value: e.file.response.data,
            },
          },
        });
      } else {
        message.error(e.file.response.msg);
      }
    }

    this.props.webActions.updateSiteValue({
      siteIndex,
      fields: {
        logoList: {
          name: 'logoList',
          value: [e.file],
          uid: -1,
        },
      },
    });
  }

  onIconUpload = (e) => {
    const { siteIndex } = this.props;
    if (e.fileList && e.fileList.length > 1) {
      e.fileList.shift();
    }

    if (e.file.status === 'done') {
      this.props.webActions.updateSiteValue({
        siteIndex,
        fields: {
          icon_shape: {
            name: 'icon_shape',
            value: 'custom',
          },
        },
      });

      if (e.file.response.code === 200) {
        this.props.webActions.updateSiteValue({
          siteIndex,
          fields: {
            customer_icon: {
              name: 'customer_icon',
              value: e.file.response.data,
              uid: -2,
            },
          },
        });
      } else {
        message.error(e.file.response.msg);
      }
    }
  }

  onInviteImageUpload = (e) => {
    const { webActions, siteIndex } = this.props;

    if (e.file.status === 'done') {
      webActions.updateSiteValue({
        siteIndex,
        fields: {
          invite_img: {
            name: 'invite_img',
            value: e.file.response.data,
          },
        },
      });
    } else if (e.file.status === 'error') {
      message.error('上传失败');
    }
  }

  onWelcomeImageUpload = (e) => {
    const { webActions, siteIndex } = this.props;
    if (e.fileList && e.fileList.length > 1) {
      e.fileList.shift();
    }
    if (e.file.status === 'done') {
      webActions.updateSiteValue({
        siteIndex,
        fields: {
          welcome: {
            name: 'welcome',
            value: e.file.response.data,
          },
        },
      });
      webActions.updateSiteValue({
        siteIndex,
        fields: {
          welcomeImageList: {
            name: 'welcome',
            value: [e.file],
            uid: -1,
          },
        },
      });
    } else if (e.file.status === 'error') {
      message.error('上传失败');
    }
  }

  addOrderForm = () => {
    const { webActions, siteIndex } = this.props;
    webActions.addOrderForm({ siteIndex });
    webActions.toggleOrderFormModalVisible(true);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { siteIndex } = this.props;
    this.props.webActions.submitSite(siteIndex);
  }

  render() {
    const { getFieldProps, getFieldValue } = this.props.form;
    const {
      webActions,
      siteIndex,
      siteCount,
      site,
      orderIndex,
      customColorVisible,
      accessCodeVisible,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 18,
      },
    };

    const customOffset = (
      <div>
        <Row gutter={8} style={{ marginBottom: 15 }}>
          <Col span={12}>
            <label>距页边：</label>
            <InputNumber
              {...getFieldProps('page_distance', { initialValue: 0 })}
              min={0}
              max={360}
              placeholder="距页面边距"
            />
          </Col>
          <Col span={12}>
            <label>距页脚：</label>
            <InputNumber
              {...getFieldProps('page_bottom_distance', { initialValue: 0 })}
              min={0}
              max={360}
              placeholder="距页脚边距"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button
              type="primary"
              onClick={webActions.hidePageDistanceEdit}
            >
                确定
            </Button>
          </Col>
        </Row>
      </div>
    );

    const customColorNode = (
      <div style={{ width: 275 }}>
        <Row style={{ margin: '7px 0' }} gutter={8}>
          <Col span={19}>
            <Input
              {...getFieldProps('button_bg_color')}
              size="default"
              addonBefore="#"
              placeholder="16进制RGB颜色"
            />
          </Col>
          <Col span={1}>
            <Button size="default" type="primary">确定</Button>
          </Col>
        </Row>
      </div>
    );

    let orderOptions = '';
    if (site.order) {
      orderOptions = getFieldValue('order').map((item, i) => (
        <Option key={i} value={`${i}`}>{item.title}</Option>
      ));
    }

    let orderEditDiv = '';

    if (site.type === 'ORDER') {
      let orderSelect = '';
      if (!site.order) {
        site.order = [];
      }

      if (site.order.length > 0) {
        orderSelect = (
          <FormItem
            label="所有表单"
            {...formItemLayout}
          >
            <Select
              {...getFieldProps('orderIndex')}
            >
              {orderOptions}
            </Select>

            <Button
              type="ghost"
              size="small"
              onClick={() => {
                webActions.editOrderForm(site.order[orderIndex]);
                webActions.toggleOrderFormModalVisible(true);
              }}
            >
              修改
            </Button>
          </FormItem>
        );
      }

      orderEditDiv = (
        <div>
          <h4>表单设置</h4>
          {orderSelect}
          <FormItem
            label="表单操作"
            {...formItemLayout}
          >
            <Button
              type="ghost"
              size="small"
              onClick={this.addOrderForm}
            >
                添加表单
            </Button>
          </FormItem>
        </div>
      );
    }

    let welcome = '';
    if (site.welcome_type === 'TEXT') {
      welcome = (<Input
        {...getFieldProps('welcome', { initialValue: '' })}
        type="textarea"
        style={{ height: 100 }}
      />);
    } else {
      welcome = (<div><Upload
        name="file"
        accept="image/*"
        action="/v2/upload"
        onChange={this.onWelcomeImageUpload}
        showUploadList={false}
      >
       {/qnssl/.test(site.welcome) && <div className={styles['welcome-image']}><img src={site.welcome} width="100"/></div>}
       <div className={styles['upload-welcome-image']}>
        <Icon type="plus" />
        <span className="ant-upload-text">
          点击上传
        </span>
       </div>
      </Upload></div>);
    }

    return (
      <div className={styles['form-wapper']}>
        <div className={styles['edit-form']}>
          <Form horizontal>
            <h4>通用设置</h4>
            <Input
              {...getFieldProps('id')}
              type="hidden"
            />

            <Input
              {...getFieldProps('message_left_bg_color')}
              type="hidden"
            />

            <Input
              {...getFieldProps('message_left_font_color')}
              type="hidden"
            />

            <Input
              {...getFieldProps('title_txt_color')}
              type="hidden"
            />

            <Input
              {...getFieldProps('button_txt_color')}
              type="hidden"
            />

            <Input
              {...getFieldProps('message_right_font_color')}
              type="hidden"
            />

            <Input
              {...getFieldProps('message_right_bg_color')}
              type="hidden"
            />

            <Input
              {...getFieldProps('title_bg_color')}
              type="hidden"
            />

            <FormItem
              label="网站名称"
              {...formItemLayout}
            >
              <Input {...getFieldProps('name', { initialValue: '' })} />
            </FormItem>

            <FormItem
              label="对话框的颜色"
              className={styles['color-radio']}
              {...formItemLayout}
            >
              <RadioGroup
                className={styles['bg-color-group']}
                {...getFieldProps('button_bg_color', { initialValue: '62a8ea' })}
              >
                <Radio
                  className={styles['bg-color-radio']}
                  key="f96868"
                  value={'f96868'}
                >
                  <div style={{ background: '#f96868' }}></div>
                </Radio>

                <Radio
                  className={styles['bg-color-radio']}
                  key="f2a654"
                  value={'f2a654'}
                >
                  <div style={{ background: '#f2a654' }}></div>
                </Radio>

                <Radio
                  className={styles['bg-color-radio']}
                  key="926dde"
                  value={'926dde'}
                >
                  <div style={{ background: '#926dde' }}></div>
                </Radio>

                <Radio
                  className={styles['bg-color-radio']}
                  key="57c7d4"
                  value={'57c7d4'}
                >
                  <div style={{ background: '#57c7d4' }}></div>
                </Radio>

                <Radio
                  className={styles['bg-color-radio']}
                  key="62a8ea"
                  value={'62a8ea'}
                >
                  <div style={{ background: '#62a8ea' }}></div>
                </Radio>

                <Radio
                  className={styles['bg-color-radio']}
                  key="46be8a"
                  value={'46be8a'}
                >
                  <div style={{ background: '#46be8a' }}></div>
                </Radio>

                <Radio
                  className={styles['bg-color-radio']}
                  key="526069"
                  value={'526069'}
                >
                  <div style={{ background: '#526069' }}></div>
                </Radio>

                <Radio
                  className={styles['bg-color-radio']}
                  key="custom"
                  value={site.button_bg_color}
                  ref="customColor"
                >
                  <div>
                    <Popover
                      content={customColorNode}
                      title="自定义颜色"
                      trigger="click"
                      visible={customColorVisible}
                      onVisibleChange={() => webActions.toggleCustomColorVisible()}
                    >
                      <Button
                        style={{ background: `#${site.button_bg_color}` }}
                        type="primary"
                      >
                        自定义
                      </Button>
                    </Popover>
                  </div>
                </Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="网站Logo：" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
              <Upload
                onPreview={(file) => { window.open(file.url); }}
                name="file"
                accept="image/*"
                action="/v2/upload"
                listType="picture-card"
                onChange={this.onLogoUpload}
                fileList={site.logoList}
              >
                <Icon type="plus" />
                <div className="ant-upload-text">点击上传</div>
              </Upload>
            </FormItem>

            <FormItem label="占位文字：" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
              <Input
                placeholder=""
                {...getFieldProps('input_placeholder', { initialValue: '' })}
              />
            </FormItem>

            <FormItem label="欢迎语：" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
              <RadioGroup
                {...getFieldProps('welcome_type', {
                  initialValue: 'TEXT',
                })}
              >
                <Radio key="text" value="TEXT">
                  文字
                </Radio>
                <Radio key="image" value="IMAGE">
                  图片
                </Radio>
              </RadioGroup>
              {welcome}
            </FormItem>

            <FormItem
              label="客服入口样式："
              className={styles['shape-radio']}
              {...formItemLayout}
            >
              <RadioGroup
                {...getFieldProps('icon_shape', { initialValue: '62a8ea' })}
              >
                <Radio
                  className={styles['icon-shape-radio']}
                  key="bar"
                  value={'bar'}
                >
                  <div>
                    <div
                      style={{
                        margin: '15px 0 0 0',
                        background: `#${site.button_bg_color}`,
                        width: 35,
                        height: 123,
                        borderRadius: 17,
                        position: 'relative',
                      }}
                    >
                      <img
                        role="presentation"
                        src="/resource/images/web-plugin-icon-bar.png"
                      />
                    </div>
                  </div>
                </Radio>

                <Radio
                  className={styles['icon-shape-radio']}
                  key="square"
                  value={'square'}
                >
                  <div>
                    <div
                      style={{
                        margin: '15px 0 0 0',
                        background: `#${site.button_bg_color}`,
                        width: 72,
                        height: 72,
                        borderRadius: 0,
                        position: 'relative',
                      }}
                    >
                      <img
                        role="presentation"
                        style={{ position: 'absolute', left: 0 }}
                        src="/resource/images/web-plugin-icon-square.png"
                      />
                    </div>
                  </div>
                </Radio>

                <Radio
                  className={styles['icon-shape-radio']}
                  key="circle"
                  value={'circular'}
                >
                  <div>
                    <div
                      style={{
                        margin: '15px 0 0 0',
                        background: `#${site.button_bg_color}`,
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        position: 'relative',
                      }}
                    >
                      <img
                        role="presentation"
                        style={{ position: 'absolute', left: 0 }}
                        src="/resource/images/web-plugin-icon-circle.png"
                      />
                    </div>
                  </div>
                </Radio>

                <Radio
                  className={`${styles['icon-shape-radio']} ${styles.custom}`}
                  key="custom"
                  value="custom"
                >
                  <div>
                    <Upload
                      name="file"
                      action="/v2/upload"
                      onChange={this.onIconUpload}
                      accept="image/*"
                    >
                      <Button
                        style={{
                          backgroundColor: `${site.customer_icon ? '' : '#ddd'}`,
                          border: 0, fontSize: 16, color: '#fff',
                        }}
                        type="ghost"
                      >
                          {
                            site.customer_icon
                              ? <img
                                role="presentation"
                                style={{ width: 70 }}
                                src={site.customer_icon}
                              /> : '自定义'
                          }
                      </Button>
                    </Upload>
                  </div>
                </Radio>
              </RadioGroup>
            </FormItem>

            <FormItem
              label="客服入口位置"
              {...formItemLayout}
            >
              <Select
                {...getFieldProps('direction', { initialValue: 'bottom-right' })}
                style={{ width: 70, marginRight: 12 }}
              >
                <Option key={1} value="bottom-left">左下</Option>
                <Option key={2} value="bottom-right">右下</Option>
                <Option key={3} value="middle-left">左中</Option>
                <Option key={4} value="middle-right">右中</Option>
              </Select>

              <Popover
                content={customOffset}
                title="自定义边距（单位px）"
                trigger="click"
                visible={this.props.pageDistanceCustomVisible}
                onVisibleChange={webActions.togglePageDistanceEdit}
              >
                <Button
                  type="ghost"
                >
                  自定义边距
                </Button>
              </Popover>
            </FormItem>

            <FormItem
              label="分组设置"
              {...formItemLayout}
            >
              <span>让用户进入对话时选择分组&nbsp;</span>
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                {...getFieldProps('display_agent_group', {
                  valuePropName: 'checked',
                  initialValue: !!site.display_agent_group,
                })}
              />
            </FormItem>

            <h4>邀请设置</h4>
            <FormItem
              label="自动邀请"
              key={0}
              {...formItemLayout}
            >
              <div>
                <span>客户访问你的网站时，系统可以自动向其发出对话邀请&nbsp;</span>
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  {...getFieldProps('invite', {
                    valuePropName: 'checked',
                    initialValue: !!site.invite,
                  })}
                />
              </div>
            </FormItem>

            <QueueAnim type="bottom" leaveReverse>
              {
                !!site.invite ? [
                  <FormItem
                    key={1}
                    label="邀请时间"
                    {...formItemLayout}
                  >
                    <span>在客户访问网站</span>
                    <InputNumber
                      min={0}
                      max={1800}
                      style={{ width: 66, margin: '0 4px' }}
                      {...getFieldProps('invite_wait_time', {
                        initialValue: site.invite_wait_time,
                      })}
                    />
                    <span>秒后发出对话邀请</span>
                  </FormItem>,

                  <FormItem
                    label="关闭后不在弹出"
                    key={2}
                    {...formItemLayout}
                  >
                    <div>
                      <Switch
                        checkedChildren="开"
                        unCheckedChildren="关"
                        {...getFieldProps('invite_closed', {
                          valuePropName: 'checked',
                          initialValue: !!site.invite_closed,
                        })}
                      />
                    </div>
                  </FormItem>,

                  <FormItem
                    key={3}
                    label="邀请文字"
                    {...formItemLayout}
                  >
                    <Input
                      {...getFieldProps('invite_text', {
                        initialValue: site.invite_text,
                      })}
                      type="textarea"
                      autoComplete="off"
                      maxLength={27}
                      rows={4}
                      style={{ width: 300 }}
                    />

                    <div className={styles['invite-preview']}>
                      <span>预览</span>
                      <div>
                        <img alt="邀请背景图" src={site.invite_img} />
                        <p>{site.invite_text}</p>
                        <i className={styles['invite-close']}></i>
                      </div>
                    </div>
                  </FormItem>,

                  <FormItem
                    key={4}
                    label="图片设置"
                    className={styles['invite-image']}
                    {...formItemLayout}
                  >
                    <Button
                      size="default"
                      onClick={() => {
                        webActions.updateSiteValue({
                          siteIndex,
                          fields: {
                            invite_img: {
                              name: 'invite_img',
                              value: '//o1hpnn7d6.qnssl.com/default-invite.png',
                            },
                          },
                        });
                      }}
                    >使用默认图片</Button>
                    <Upload
                      name="file"
                      accept="image/*"
                      action="/v2/upload"
                      onChange={this.onInviteImageUpload}
                    >
                      <Button style={{ marginLeft: 10 }}>
                        <Icon type="upload" /> 上传自定义图片
                      </Button>
                    </Upload>
                  </FormItem>,
                ] : ''
              }
            </QueueAnim>

            <h4>模式设置</h4>
            <FormItem
              label="默认模式"
              {...formItemLayout}
            >
              <RadioGroup
                {...getFieldProps('type', {
                  initialValue: 'IM',
                })}
              >
                <Radio key="im-lm" value="IM-LM">
                  对话和留言
                </Radio>
                <Radio key="im" value="IM">
                  对话
                </Radio>
                <Radio key="order" value="ORDER">
                  表单
                </Radio>
              </RadioGroup>

              <OrderFormModal
                siteIndex={siteIndex}
                orderIndex={this.props.orderIndex}
              />
            </FormItem>

            {orderEditDiv}

            <FormItem
              className="submit"
              wrapperCol={{ span: 16, offset: 4 }}
              style={{ marginTop: 24 }}
            >
              <Button
                type="primary"
                style={{ marginRight: 10 }}
                onClick={this.handleSubmit}
              >
                  确定
              </Button>

              <Popconfirm
                title="确认删除当前对站点？"
                placement="top"
                onConfirm={webActions.removeSite}
              >
                <Button
                  size="large"
                  className={siteCount === 1 ? 'hide' : ''}
                >
                    删除
                </Button>
              </Popconfirm>
            </FormItem>
          </Form>

          <div className={styles.preview}>
            <div
              style={{
                transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
                background: `#${site.button_bg_color}`,
                display: 'inline-block',
                height: 244,
                width: 230,
                boxShadow: '0 0 8px #999',
              }}
            >
              <img
                role="presentation"
                src="/resource/images/web-plugin-preview.png"
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <Button
                type="primary"
                disabled={!site.id}
                onClick={() => webActions.toggleAccessCode(true)}
              >
                查看接入代码
              </Button>

              <AccessCodeModal
                visible={accessCodeVisible}
                hideAccessCode={() => webActions.toggleAccessCode(false)}
                tid={site.id}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapPropsToFields(props) {
  const { site } = props;

  return transformObjectToFitForm(site);
}

function onFieldsChange(props, fields) {
  const { siteIndex, webActions } = props;

  webActions.updateSiteValue({
    siteIndex,
    fields,
  });
}

function mapStateToProps({ web }) {
  return {
    pageDistanceCustomVisible: web.pageDistanceCustomVisible,
    orderIndex: web.orderIndex,
    customColorVisible: web.customColorVisible,
    accessCodeVisible: web.accessCodeVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    webActions: bindActionCreators(WebActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({
  mapPropsToFields,
  onFieldsChange,
})(SiteForm));
