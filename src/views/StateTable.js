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
    data: [], // 数据列表
    pagination: {
      total: 0, // 数据总条数
      pageSize: 10, // 每页数量
      showSizeChanger: true, // 显示pageSize改变按钮
    },
    loading: false, // 加载状态
  };

  componentDidMount() {
    this.getRankData(1);
  }

  async getRankData(page) {
    const { pagination } = this.state;
    // 数据条数
    const { pageSize } = pagination;
    // 数据起始index
    const offset = (page - 1) * pageSize;
    // 展示加载ing UI
    this.setState({ loading: true });
    // 请求数据
    const data = await api.getRank(offset, pageSize);
    // 存到state中
    this.setState((state, props) => {
      const pager = { ...state.pagination };
      pager.total = data.total;
      return {
        pagination: pager, // 分页数据
        data: data.results, // 数据列表
        loading: false, // 加载状态
      };
    });
  }

  // 翻页事件
  handleTableChange = (pagination, filters, sorter) => {
    // 改变数据
    this.setState(
      (state, props) => {
        const pager = { ...state.pagination, ...pagination };
        return {
          pagination: pager,
        };
      },
      // state改变成功之后去获取数据
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
