import React, { PropTypes } from 'react';
import { Dropdown, Menu, Icon } from 'antd';
import styles from './chat-header.less';

const MenuItem = Menu.Item;

const ChatHeader = ({
  agents,
  shiftOrder,
  orderId,
  getOnlineAgents,
  closeOrder,
  contactName,
}) => {
  let menu = (
    <Menu>
      <MenuItem key="1">
        没有在线客服
      </MenuItem>
    </Menu>
  );

  if (agents.length) {
    menu = (
      <Menu>
        {agents.map(agent => (
          <MenuItem key={agent.id}>
            <a
              onClick={() => shiftOrder({
                orderId,
                userId: agent.id,
              })}
            >
              {agent.name}
            </a>
          </MenuItem>)
        )}
      </Menu>
    );
  }

  return (
    <div className={styles.header}>
      <div className={styles.name}>{contactName}</div>
      <div className={styles.action}>
        <div className={styles.shift}>
          <Dropdown
            overlay={menu}
            trigger={['click']}
            onClick={() => getOnlineAgents()}
          >
            <a className="ant-dropdown-link" href="#">
              转接 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div className={styles.close}>
          <Icon type="cross" onClick={() => closeOrder(orderId)} />
        </div>
      </div>
    </div>
  );
};

ChatHeader.propTypes = {
  orderId: PropTypes.number.isRequired,
  contactName: PropTypes.string.isRequired,
  agents: PropTypes.array.isRequired,
  shiftOrder: PropTypes.func.isRequired,
  closeOrder: PropTypes.func.isRequired,
  getOnlineAgents: PropTypes.func.isRequired,
};

export default ChatHeader;
