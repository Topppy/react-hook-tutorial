import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import api from '../service/api';

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
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
    showSizeChanger: true,
    current: 1,
    loading: false,
  });

  async function getRankData() {
    const { pageSize, current } = pagination;
    const offset = (current - 1) * pageSize;
    setPagination({
      ...pagination,
      loading: true,
    });
    const res = await api.getRank(offset, pageSize);
    setData(res.results);
    setPagination({
      ...pagination,
      total: res.total,
      loading: false,
    });
  }

  useEffect(() => {
    getRankData();
  }, [pagination.pageSize, pagination.current]);

  const handleTableChange = (tablePagination, filters, sorter) => {
    setPagination({
      ...pagination,
      ...tablePagination,
    });
  };

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

