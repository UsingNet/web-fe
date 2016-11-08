import React, { PropTypes } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const TagInfo = ({ tags, selectedTags, postContact, updateContactTags, contactId }) => {
  const tagOptions = tags.map((t, i) => (
    <Option
      key={i}
      value={t.name}
    >
      {t.name}
    </Option>
  ));

  return (
    <div>
      <Select
        tags
        style={{ width: '80%' }}
        value={selectedTags}
        searchPlaceholder="添加标签"
        onChange={(value) => {
          const newTags = value.map(v => ({
            name: v,
          }));
          updateContactTags(newTags);
          postContact({
            id: contactId,
            tags: value,
          });
        }}
      >
        {tagOptions}
      </Select>
    </div>
  );
};

TagInfo.propTypes = {
  tags: PropTypes.array.isRequired,
  selectedTags: PropTypes.array.isRequired,
  postContact: PropTypes.func.isRequired,
  updateContactTags: PropTypes.func.isRequired,
  contactId: PropTypes.number.isRequired,
};

export default TagInfo;
