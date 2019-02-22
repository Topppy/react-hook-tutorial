import React, { useEffect, useReducer } from 'react';
import { Table } from 'antd';
import api from '../service/api';
import { reducer, initialState } from '../model/rank';

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

export default function ReducerHookTable(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, pagination } = state;

  async function getRankData() {
    const { pageSize, current } = pagination;
    const offset = (current - 1) * pageSize;
    dispatch({ type: 'startLoading' });
    const res = await api.getRank(offset, pageSize);
    dispatch({
      type: 'setRank',
      ...res,
    });
  }

  useEffect(() => {
    getRankData();
  }, [pagination.pageSize, pagination.current]);

  const handleTableChange = (tablePagination, filters, sorter) => {
    dispatch({
      type: 'changePage',
      payload: tablePagination,
    });
  };

  return (
    <React.Fragment>
      <h3>使用reducer hooks实现的表格</h3>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </React.Fragment>
  );
}