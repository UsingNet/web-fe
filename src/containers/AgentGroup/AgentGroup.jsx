import React, { PropTypes } from 'react';
import { Card, Popconfirm, Icon } from 'antd';
import EditAgentGroupModal from './components/EditAgentGroupModal';
import styles from './agent-group.less';

class AgentGroup extends React.Component {
  static propTypes = {
    agentGroupActions: PropTypes.object.isRequired,
    agentGroup: PropTypes.object.isRequired,
    members: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.agentGroupActions.getAgentGroup();
  }

  render() {
    const { agentGroup, agentGroupActions } = this.props;

    const groupCards = agentGroup.group.data.map(group => {
      const memberNode = group.users.map((m, i) => (
        <li key={i}>
          <img src={m.img} alt="" />
          <span>{m.name}</span>
        </li>
      ));

      return (
        <Card key={group.id} className={styles.card}>

          <h3 className={styles.title}>{group.name}</h3>

          <ul className={styles['member-list']}>
            {memberNode}
          </ul>

          <div className={styles.actions}>
            <span
              style={{ marginRight: 9 }}
              onClick={() => agentGroupActions.editAgentGroup(group)}
            >
              <Icon type="setting" />
            </span>

            <Popconfirm
              title="确定要删除这个分组吗？"
              onConfirm={() => agentGroupActions.deleteGroup(group.id)}
            >
              <Icon type="delete" />
            </Popconfirm>
          </div>
        </Card>
      );
    });

    return (
      <div className={styles['agent-group']}>
        {groupCards}
        <Card key="new" className={styles.card}>
          <span
            className={styles['new-group']}
            onClick={() => agentGroupActions.editAgentGroup({ users: [] })}
          >
            <Icon type="plus-circle" />
          </span>
        </Card>

        <EditAgentGroupModal {...this.props} />
      </div>
    );
  }
}

export default AgentGroup;
