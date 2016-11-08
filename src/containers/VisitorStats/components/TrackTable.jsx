import React, { PropTypes } from 'react';
import { Table } from 'antd';

class TrackTable extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    track: PropTypes.object.isRequired,
    trackActions: PropTypes.object.isRequired,
  }

  render() {
    const track = this.props.track[this.props.id];

    const columns = [{
      title: '访问页面',
      dataIndex: 'url',
      width: '30%',
      render: (value, record) => (
        <a
          target="_blank"
          title={record.title}
          href={value}
          style={{ color: '#666666' }}
        >
          {`${record.title.substr(0, 30)}...`}
        </a>
      ),
    }, {
      title: '来源',
      dataIndex: 'referrer',
      width: '30%',
      render: (value) => {
        if (value && value.indexOf('http') > -1) {
          return (
            <a
              target="_blank"
              href={value}
              style={{ color: '#666666' }}
            >
              {`${value.substr(0, 40)}...`}
            </a>
          );
        }

        return value;
      },
    }, {
      title: '访问时间',
      dataIndex: 'created_at',
      width: '20%',
    }, {
      title: '离开时间',
      dataIndex: 'updated_at',
      width: '20%',
    }];

    const pagination = {
      total: track.total,
      size: 'small',
      pageSize: track.perPage,
      current: track.currentPage,
      showTotal: (total) => (`共${total}条`),
    };

    return (
      <Table
        size="small"
        columns={columns}
        pagination={pagination}
        dataSource={track.data}
        bordered
      />
    );
  }
}

export default TrackTable;
