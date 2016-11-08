import React, { PropTypes } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const MemberFilter = (props) => {
  const { members, onMemberChange } = props;

  const memberNode = members.map((member) => (
    <Option key={member.id} value={`${member.id}`}>
      {member.name}
    </Option>
  ));

  return (
    <div className="member-select">
      <Select
        defaultValue="0"
        style={{ width: 120 }}
        onChange={onMemberChange}
      >
        <Option value="0">全部客服</Option>
        {memberNode}
      </Select>
    </div>
  );
};

MemberFilter.propTypes = {
  members: PropTypes.array,
  onMemberChange: PropTypes.func,
};

export default MemberFilter;
