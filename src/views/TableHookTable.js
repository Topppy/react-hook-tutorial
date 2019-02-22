import React from 'react';
import { Table } from 'antd';
import useTable from '../hooks/useTable'

const columns = [
  {
    title: '排名',
    dataIndex: 'rank',
    width: '50%',
  },
  {
    title: '分数',
    dataIndex: 'score',
  },
];

export default function StateHookTable(props) {
  const {
    data,
    pagination,
    handleTableChange
  } = useTable('getRank');

  return (
    <React.Fragment>
      <h3>使用state hooks实现的表格</h3>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        pagination={pagination}
        loading={pagination.loading}
        onChange={handleTableChange}
      />
    </React.Fragment>
  );
}

