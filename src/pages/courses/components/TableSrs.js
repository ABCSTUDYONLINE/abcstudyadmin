
import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Select, Modal } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, deleteCourses, putCourses } from '../../../redux/courses/coursesAction';
import * as moment from 'moment';

export default function TableSrc(props) {

  const dataCategory = useSelector(state => state.courses.courses);
  const totalCategory = useSelector(state => state.courses.total);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)

  const [coursesIdUpdate, setCategoryIdUpdate] = useState()

  const getDataCategory = () => {
    dispatch(getCourses(0, page, limit))
  }
  useEffect(() => {
    getDataCategory()
  }, [page, limit])

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current)
  }

  const onDelete = (coursesID) => {
    dispatch(deleteCourses(coursesID))
  }
  const columns = [
    {
      title: 'Name courses',
      dataIndex: 'courseName',
      key: 'courseName',
      sorter: true,
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
      sorter: true,
    },
    {
      title: 'Teacher',
      dataIndex: 'teacher',
      key: 'teacher.id',
      sorter: true,
      render: (teacher) => <div>{teacher.firstName + ' ' + teacher.lastName}</div>
    },
    {
      title: 'Number student',
      dataIndex: 'studies',
      key: 'studies',
      sorter: true,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (createdAt) => <div>{moment(createdAt).format('DD/MM/YYYY')}</div>
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id) =>
        <div>
          <a style={{ cursor: 'pointer', color: '#ff6666', marginRight: 20 }} onClick={() => onDelete(id)}>delete</a>
        </div>
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={dataCategory} onChange={onChange} pagination={{
        current: page,
        pageSize: 5,
        total: totalCategory
      }} />
    </div>
  )
}