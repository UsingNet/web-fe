import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Select, Popover, Popconfirm, Icon, Upload, message } from 'antd';
import styles from './tool-bar.less';
import Emoji from 'components/Emoji';
import PasteImageModal from '../PasteImageModal';

const Option = Select.Option;

const Toolbar = ({
  chatActions,
  onClickEmoji,
  sendMessage,
  chat,
  orderId,
  orderType,
  phone,
  weiboId,
  email,
  openid,
  putOrder,
  voipStatus,
  smsStatus,
  apps,
}) => {
  const emoji = (
    <Emoji onClickEmoji={onClickEmoji} />
  );

  const { previewVisible, previewUrl, fastReplyVisible, pasteImageVisible, appsVisible } = chat;

  const picPreview = (
    <div className={styles['pic-preview']}>
      <img alt="图片预览" src={previewUrl} />
    </div>
  );

  const uploadPicProps = {
    showUploadList: false,
    name: 'file',
    action: '/v2/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        const response = info.file.response;
        if (response.code !== 200) {
          message.error(response.msg);
        } else {
          message.info('上传成功');
          const image = new Image();
          image.src = response.data;

          chatActions.setPicUrl(response.data);

          image.onload = () => {
            chatActions.togglePicPreview(true);
          };
        }
      } else if (info.file.status === 'error') {
        message.error('上传失败');
      }
    },
  };

  const types = [{
    IM: '消息',
  }];

  if (openid) {
    types.push({
      WECHAT: '微信',
    });
  }

  if (weiboId) {
    types.push({
      WEIBO: '微博',
    });
  }

  const typeOptions = types.map((t, i) => {
    const key = Object.keys(t)[0];
    return <Option key={i} value={key}>{t[key]}</Option>;
  });

  const appsList = (
    <div className="apps-list">
      <h4>应用列表</h4>
      <ul>
        {apps.map((app, index) => (
          <li key={index}>
            <a target="_blank" href={app.url}>{app.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );

  const toolbarClasses = classNames({
    [styles['tool-bar']]: true,
  });

  return (
    <div className={toolbarClasses}>
      <ul className={styles.tools}>
        <li>
          <Popover
            content={emoji}
            trigger="click"
            placement="topLeft"
          >
            <Icon type="meh" />
          </Popover>
        </li>
        <li>
          <Upload
            style={{ fontSize: 16 }}
            {...uploadPicProps}
          >
            <Icon type="picture" />
          </Upload>

          <Popconfirm
            title={picPreview}
            placement="topLeft"
            visible={previewVisible}
            onConfirm={() => {
              sendMessage({
                order_id: orderId,
                body: previewUrl,
              });

              chatActions.togglePicPreview(false);
            }}
            onCancel={() => {
              message.warning('已取消发送图片');
              chatActions.togglePicPreview(false);
            }}
          >
            <a href="#"></a>
          </Popconfirm>
        </li>
        <li
          onClick={() => chatActions.toggleFastReplyVisible(!fastReplyVisible)}
        >
          <Icon type="bars" />
        </li>

        <li
          onClick={() => chatActions.togglePasteImageVisible(true)}
        >
          <span
            className="fa fa-crop"
          />

          <PasteImageModal
            pasteImageVisible={pasteImageVisible}
            {...chatActions}
          />
        </li>

        <li>
          <Popover
            content={appsList}
            placement="topLeft"
            visible={appsVisible}
            trigger="click"
            onClick={() => chatActions.toggleAppsVisible(!appsVisible)}
          >
            <Icon type="appstore" />
          </Popover>
        </li>
      </ul>

      <div className={styles['type-select']}>
        <Select
          style={{ width: 80 }}
          value={orderType}
          onChange={(value) => putOrder({
            id: orderId,
            data: {
              type: value,
            },
          })}
        >
          {typeOptions}
        </Select>
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  orderId: PropTypes.number.isRequired,
  orderType: PropTypes.string.isRequired,
  chat: PropTypes.object.isRequired,
  chatActions: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  onClickEmoji: PropTypes.func.isRequired,
  putOrder: PropTypes.func.isRequired,
  voipStatus: PropTypes.bool.isRequired,
  smsStatus: PropTypes.bool.isRequired,
  weiboId: PropTypes.string,
  phone: PropTypes.string,
  openid: PropTypes.string,
  email: PropTypes.string,
  apps: PropTypes.array,
};

export default Toolbar;
