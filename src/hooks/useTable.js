import { useState, useEffect } from 'react'
import api from '../service/api';

export default (fetchApi) => {
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
    const res = await api[fetchApi](offset, pageSize);
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

  return {
    data,
    pagination,
    handleTableChange
  }
}
