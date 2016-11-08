/* eslint-disable */
import React, { PropTypes } from 'react';
import { Tabs } from 'antd';
import ClientInfoForm from './components/ClientInfoForm';
import AccessInfo from './AccessInfo';
import FromInfo from './FromInfo';
import PluginContent from './PluginContent';
import CategoryInfo from './CategoryInfo';
import TagInfo from './TagInfo';
import ExtendInfo from './ExtendInfo';
import styles from './chat-info.less';

const TabPane = Tabs.TabPane;

class ChatInfoSidebar extends React.Component {
  static propTypes = {
    selectedOrder: PropTypes.object.isRequired,
    updateClientInfoFields: PropTypes.func.isRequired,
    postContact: PropTypes.func.isRequired,
    infoTabChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      activeTab,
      selectedOrder,
      postContact,
      updateClientInfoFields,
      infoTabChange,
    } = this.props;
    const { contact } = this.props.selectedOrder;
    let from = '';

    if (contact.source) {
      from = (
        <div className={styles['info-item']}>
          <h4>来源</h4>
          <FromInfo />
        </div>
      );
    }

    if (contact.extend && contact.extend.length) {
      extendNode = (
        <div className={styles['info-item']}>
          <h4>扩展信息</h4>
          <ExtendInfo />
        </div>
      )
    }

    return (
      <div className={styles['chat-info-sidebar']}>
        <Tabs
          activeKey={activeTab}
          onChange={infoTabChange}
        >
          <TabPane
            key="client"
            tab="客户信息"
          >
            <div className={styles['info-item']}>
              <h4>客户资料</h4>
              <ClientInfoForm
                contact={contact}
                updateClientInfoFields={updateClientInfoFields}
                postContact={postContact}
              />
            </div>

            <div className={styles['info-item']}>
              <h4>访问信息</h4>
              <AccessInfo />
            </div>

            {from}

            <div className={styles['info-item']}>
              <h4>标签</h4>
              <TagInfo />
            </div>

            <div className={styles['info-item']}>
              <h4>对话归类</h4>
              <CategoryInfo />
            </div>
          </TabPane>

          <TabPane
            key="plugin"
            tab="插件"
          >
            <PluginContent />
          </TabPane>
        </Tabs>
        {selectedOrder.contact.name}
      </div>
    );
  }
}

export default ChatInfoSidebar;
