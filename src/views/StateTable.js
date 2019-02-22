import React, { Component } from 'react';
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

export default class StateTable extends Component {
  state = {
    data: [],
    pagination: {
      total: 0,
      pageSize: 10,
      showSizeChanger: true,
    },
    loading: false,
  };

  componentDidMount() {
    this.getRankData(1);
  }

  async getRankData(page) {
    const { pagination } = this.state;
    const { pageSize } = pagination;
    const offset = (page - 1) * pageSize;
    this.setState({ loading: true });
    const data = await api.getRank(offset, pageSize);
    this.setState((state, props) => {
      const pager = { ...state.pagination };
      pager.total = data.total;
      return {
        pagination: pager,
        data: data.results,
        loading: false,
      };
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState(
      (state, props) => {
        const pager = { ...state.pagination, ...pagination };
        return {
          pagination: pager,
        };
      },
      () => this.getRankData(pagination.current)
    );
  };

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <React.Fragment>
        <h3>使用reducer hooks实现的表格</h3>
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        />
      </React.Fragment>
    );
  }
}
