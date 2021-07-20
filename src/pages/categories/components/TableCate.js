import { Table } from 'antd';
import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategories, putCategories } from '../../../redux/category/categoryAction';


export default function TableCate(props) {

  const dataCategory = useSelector(state => state.category.categories);
  const totalCategory = useSelector(state => state.category.total);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)

  const getDataCategory = () => {
    dispatch(getCategories(page, limit))
  }
  useEffect(() => {
    getDataCategory()
  }, [page, limit])

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current)
  }

  const onDelete = (idCategory) => {
    console.log(idCategory)
  }

  const onEdit = (idCategory) => {
    console.log(idCategory)
  }

  const columns = [
    {
      title: 'Level category',
      dataIndex: 'levelCategory',
      key: 'levelCategory',
      sorter: true,
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id) =>
        <div>
          <a style={{ cursor: 'pointer', color: '#ff6666', marginRight: 20 }} onClick={() => onDelete(id)}>delete</a>
          <a style={{ cursor: 'pointer' }} onClick={() => onEdit(id)}>edit</a>
        </div>
    },
  ];

  return (
    <Table columns={columns} dataSource={dataCategory} onChange={onChange} pagination={{
      current: page,
      pageSize: 5,
      total: totalCategory
    }} />
  )
}