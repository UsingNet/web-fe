import React, { PropTypes } from 'react';
import { Popover, Icon } from 'antd';

const TextStatistics = (props) => {
  const { title, needPopover, popoverTitle, data } = props;
  let pop = '';

  if (needPopover) {
    pop = (
      <Popover placement="right" content={<p style={{ marginRight: 10 }}>{popoverTitle}</p>}>
        <Icon type="question-circle" />
      </Popover>
    );
  }

  return (
    <div>
      <header>
        {title}
        {pop}
      </header>
      <section>{data}</section>
    </div>
  );
};

TextStatistics.propTypes = {
  title: PropTypes.string.isRequired,
  needPopover: PropTypes.bool.isRequired,
  popoverTitle: PropTypes.string,
  data: PropTypes.string.isRequired,
};

export default TextStatistics;
