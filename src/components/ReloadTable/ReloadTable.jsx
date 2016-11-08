import React, { PropTypes } from 'react';
import { Button } from 'antd';

const ReloadTable = (props) => (
  <div className="reload-table">
    <Button type="ghost" onClick={props.reload}>刷新列表</Button>
  </div>
);

ReloadTable.propTypes = {
  reload: PropTypes.func.isRequired,
};

export default ReloadTable;
