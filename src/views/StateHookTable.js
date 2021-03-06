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
  // 数据列表
  const [data, setData] = useState([]);
  // 分页数据
  const [pagination, setPagination] = useState({
    total: 0,  // 数据总条数
    pageSize: 10,  // 页面显示条数
    showSizeChanger: true,  // 显示pageSize改变按钮
    current: 1, // 当前页码
    loading: false, // 加载状态
  });

  // 请求数据
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

  // 只有[pagination.pageSize, pagination.current] 改变的时候执行
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

