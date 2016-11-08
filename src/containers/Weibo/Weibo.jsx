import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { Card, Popconfirm, Icon, Modal, Input, Row, Col } from 'antd';
import { getUrlParamValueByName } from 'modules/helpers';
import GeneralEditModal from './GeneralEditModal';
import styles from 'containers/Wechat/wechat.less';

const confirm = Modal.confirm;

class Weibo extends React.Component {
  static propTypes = {
    weibos: PropTypes.array.isRequired,
    weiboActions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.weiboActions.getWeibo();
  }

  componentDidUpdate() {
    const { weibos } = this.props;
    const authWeiboId = getUrlParamValueByName('id');

    if (authWeiboId && weibos.length) {
      const authWeibo = weibos.find(weibo => weibo.id === Number(authWeiboId));
      this.onWeiboAuthComplete(authWeibo);
      this.props.router.push('/setting/weibo');
    }
  }

  onGeneralEdit = (weibo) => {
    const { weiboActions } = this.props;
    weiboActions.setEditWeibo(weibo);
    weiboActions.toggleGeneralEditVisible();
  }

  onAdvanceEdit = (weibo) => {
    this.onWeiboAuthComplete(weibo);
  }

  onWeiboAuthComplete = (weibo) => {
    const self = this;
    const content = (
      <div>
        <p>复制输入框内的值</p>

        <Row gutter={8} style={{ margin: '7px 0', lineHeight: '28px' }}>
          <Col span={5} style={{ textAlign: 'right' }}>URL：</Col>
          <Col span={19}>
            <Input defaultValue={weibo.url} />
          </Col>
        </Row>
        <Row gutter={8} style={{ lineHeight: '28px' }}>
          <Col span={5} style={{ textAlign: 'right' }}>APPKEY：</Col>
          <Col span={19}>
            <Input defaultValue="3702513602" />
          </Col>
        </Row>
        <p
          style={{ margin: '12px 0 7px' }}
        >
          <a
            target="_blank"
            href={weibo.redirect_uri}
          >
            点击链接
          </a> 打开微博页面，对上面的值进行填写
        </p>
      </div>
    );

    confirm({
      title: '授权已完成',
      content,
      onOk() {
        if (getUrlParamValueByName('id')) {
          self.props.router.push('/setting/weibo');
        }
      },
    });
  }

  render() {
    const { weibos, weiboActions } = this.props;

    const weiboCards = weibos.map(weibo => (
      <Card key={weibo.id} className={styles.card}>
        <div className={styles.body}>
          <div className={styles.hd}>
            <h4>{weibo.name}</h4>
          </div>

          <div className={styles.img}>
            <img role="presentation" src={`${weibo.img}-avatar`} />
          </div>

          <div className={styles.info}>
            <div className={styles.action}>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => this.onGeneralEdit(weibo)}
              >
                <Icon
                  style={{ paddingRight: 3 }}
                  type="message"
                />
              </span>

              <span
                style={{ cursor: 'pointer' }}
                onClick={() => this.onAdvanceEdit(weibo)}
              >
                <Icon
                  style={{ paddingRight: 3 }}
                  type="setting"
                />
              </span>

              <Popconfirm
                title="确认取消授权?"
                onConfirm={() => weiboActions.deleteWeibo(weibo.id)}
              >
                <Icon type="delete" />
              </Popconfirm>
            </div>
          </div>
        </div>
      </Card>
    ));

    return (
      <div className={styles.weibos}>
        <div className={styles.header}>
          <h3>微博接入</h3>
        </div>

        <div>
          {weiboCards}

          <Card className={`${styles.card} ${styles.add}`}>
            <a target="_blank" href="/api/weibo/auth">
              <Icon type="plus-circle" />
            </a>
          </Card>
        </div>

        <GeneralEditModal />
      </div>
    );
  }
}

export default withRouter(Weibo);
