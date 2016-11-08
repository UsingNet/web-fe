import React, { PropTypes } from 'react';
import { Card, Button, Tag, Icon, Popconfirm } from 'antd';
import EditMemberModal from './EditMemberModal';
import styles from './member.less';

class Member extends React.Component {
  static propTypes = {
    memberActions: PropTypes.object.isRequired,
    members: PropTypes.array.isRequired,
    me: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.memberActions.getMember();
  }

  onAddMember = () => {
    const { memberActions } = this.props;
    memberActions.setEditMember({});
    memberActions.toggleModalVisible();
  }

  onEditMember = (member) => {
    const { memberActions } = this.props;
    memberActions.setEditMember(member);
    memberActions.toggleModalVisible();
  }

  render() {
    const { members, me, memberActions } = this.props;
    const memberNodes = members.map(m => {
      let actionNode = '';
      let tagsNode = '暂无标签';
      const roleColors = {
        MASTER: 'red',
        MANAGE: 'yellow',
        MEMBER: 'blue',
      };

      const action = (
        <div className={styles.action}>
          <Button
            type="ghost"
            icon="edit"
            onClick={() => this.onEditMember(m)}
          />

          <Popconfirm
            title="确定要删除这个成员吗？"
            onConfirm={() => memberActions.deleteMember(m.id)}
          >
            <Button type="ghost" icon="delete" />
          </Popconfirm>
        </div>
      );

      switch (me.role) {
        case 'MASTER':
          if (m.role !== 'MASTER' && m.id !== me.id) {
            actionNode = action;
          }
          break;
        case 'MANAGE':
          if ((m.role !== 'MASTER' && m.role !== 'MANAGE') && m.id !== me.id) {
            actionNode = action;
          }
          break;
        default:
          break;
      }

      if (m.tags && m.tags.length) {
        tagsNode = m.tags.map((t, i) => (
          <Tag key={i}>{t.name}</Tag>
        ));
      }

      return (
        <Card key={m.id} className={styles.card} >
          <h2>
            {m.name ? m.name : '请填写昵称'}
            <Tag
              className="pull-right"
              color={roleColors[m.role]}
            >
              {m.role_name}
            </Tag>
          </h2>

          <div className={styles.info}>
            <img
              alt={m.name}
              className={`pull-left ${styles.avatar}`}
              src={`${m.img}-avatar`}
            />

            <ul className={`pull-left ${styles.profile}`}>
              <li>
                <Icon type="phone" />{m.phone || '暂无电话'}
              </li>
              <li>
                <Icon type="mail" />{m.email || '暂无邮箱'}
              </li>
              <li>
                <Icon type="tags" />
                {tagsNode}
              </li>
            </ul>
          </div>
          {actionNode}
        </Card>
      );
    });

    return (
      <div className={styles['member-cards']}>
        {memberNodes}
        <Card key="new" className={styles.card}>
          <Button
            className={styles['new-member']}
            type="ghost"
            icon="plus-circle"
            onClick={this.onAddMember}
          />
        </Card>

        <EditMemberModal />
      </div>
    );
  }
}

export default Member;
