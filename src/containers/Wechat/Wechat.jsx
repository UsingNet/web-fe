import React, { PropTypes } from 'react';
import { Card, Popconfirm, Icon, Modal } from 'antd';
import GeneralEditModal from './GeneralEditModal';
import AdvanceEditModal from './AdvanceEditModal';
import styles from './wechat.less';

const confirm = Modal.confirm;

class Wechat extends React.Component {
  static propTypes = {
    wechatActions: PropTypes.object.isRequired,
    wechats: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.wechatActions.getWechat();
  }

  onGeneralEdit = (wechat) => {
    const { wechatActions } = this.props;
    wechatActions.setEditWechat(wechat);
    wechatActions.toggleGeneralEditVisible();
  }

  onAdvanceEdit = (wechat) => {
    const { wechatActions } = this.props;
    wechatActions.setEditWechat(wechat);
    wechatActions.toggleAdvanceEditVisible();
  }

  onAuth = () => {
    const { wechatActions } = this.props;

    confirm({
      title: '认证完成？',
      okText: '已完成',
      onOk() {
        wechatActions.getWechat();
      },
    });
  }

  render() {
    const { wechats, wechatActions } = this.props;
    const wechatCards = wechats.map(wechat => (
      <Card key={wechat.id} className={styles.card}>
        <div className={styles.body}>
          <div className={styles.hd}>
            <h4>{wechat.nick_name}</h4>
          </div>

          <div className={styles.img}>
            <img src={`${wechat.head_img}-avatar`} alt="" />
          </div>

          <div className={styles.info}>
            <div className={styles.action}>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => this.onGeneralEdit(wechat)}
              >
                <Icon
                  style={{ paddingRight: 3 }}
                  type="message"
                />
              </span>

              <span
                style={{ cursor: 'pointer' }}
                onClick={() => this.onAdvanceEdit(wechat)}
              >
                <Icon
                  style={{ paddingRight: 3 }}
                  type="setting"
                />
              </span>
              <Popconfirm
                title="确认取消授权?"
                onConfirm={() => wechatActions.deleteWechat(wechat.id)}
              >
                <Icon type="delete" />
              </Popconfirm>
            </div>
          </div>
        </div>
      </Card>
    ));

    return (
      <div className={styles.wechats}>
        <div className={styles.header}>
          <h3>微信接入</h3>
        </div>

        <div>
          {wechatCards}
          <Card className={`${styles.card} ${styles.add}`}>
            <a
              onClick={this.onAuth}
              href="https://wx.usingnet.com/v2/wechat/auth"
              target="_blank"
            >
              <Icon type="plus-circle" />
            </a>
          </Card>
        </div>

        <div className={styles.desc}>
          <ul>
            <li>你的公众号必须是认证过的微信订阅号或服务号，否则无法正常回复顾客对话</li>
          </ul>
        </div>

        <GeneralEditModal />
        <AdvanceEditModal />
      </div>
    );
  }
}

export default Wechat;
