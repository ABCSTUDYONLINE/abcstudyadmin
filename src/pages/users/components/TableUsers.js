/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react'
import { Table, Radio } from 'antd'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthUsers, deleteAuthUser, updateOperationUser } from '../../../redux/user/userAction'
import { LoadingDialog } from '../../../components/LoadingDialog'
import moment from 'moment'

export default function TableUsers (props) {
  const dataCategory = useSelector(state => state.user.users)
  const totalCategory = useSelector(state => state.user.total)
  const isChanged = useSelector(state => state.user.isChanged)
  const isLoading = useSelector(state => state.user.loading)
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [limit] = useState(5)
  const [role, setRole] = useState('student')

  const getDataAuthUsers = () => {
    dispatch(getAuthUsers(page, limit, role))
  }
  useEffect(() => {
    getDataAuthUsers()
  }, [page, role, isChanged])

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current)
  }

  const onDelete = (userId) => {
    dispatch(deleteAuthUser(userId))
  }

  const updateOperation = (id, operation) => {
    dispatch(updateOperationUser({ userId: id, operation: operation === 'enable' ? 'disable' : 'enable' }))
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      render: (id, student) => <div>{student.firstName + ' ' + student.lastName}</div>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true
    },
    {
      title: 'Number phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: true
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: true
    },
    {
      title: 'Date create',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (createdAt) => <div>{moment(createdAt).format('DD/MM/YYYY')}</div>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id, user) =>
        <div>
          <a style={{ cursor: 'pointer', color: '#ff6666', marginRight: 20 }} onClick={() => onDelete(id)}>delete</a>
          <a style={{ cursor: 'pointer', color: user.operation === 'enable' ? '#DA251C' : '#5AC18E', marginRight: 20 }} onClick={() => updateOperation(id, user.operation)}>{user.operation === 'enable' ? 'lock' : 'unlock'}</a>
        </div>
    }
  ]
  const onChangeRole = e => {
    setRole(e.target.value)
    setPage(1)
  }
  return (
    <div>
      <div style={{ height: 60, backgroundColor: '#FFF', marginBottom: 10, display: 'flex', alignItems: 'center', paddingLeft: 20, borderRadius: 6 }}>
        <Radio.Group onChange={onChangeRole} value={role}>
          <Radio value={'student'}>Student</Radio>
          <Radio value={'teacher'}>Teacher</Radio>
        </Radio.Group>
      </div>
      <Table columns={columns} dataSource={dataCategory} onChange={onChange} pagination={{
        current: page,
        pageSize: 5,
        total: totalCategory
      }} />
      <LoadingDialog isLoading={isLoading === 1} />
    </div>
  )
}
