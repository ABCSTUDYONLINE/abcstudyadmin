/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react'
import { Table, Form, Input, Button, Select, Modal, DatePicker } from 'antd'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPromotions, deletePromotion, putPromotion } from '../../../redux/promotions/promotionsAction'
import { LoadingDialog } from '../../../components/LoadingDialog'
import { getCourses } from '../../../redux/courses/coursesAction'
import * as moment from 'moment'

const { Option } = Select

export default function TablePro (props) {
  const [form] = Form.useForm()

  const dataPromotion = useSelector(state => state.promotions.promotions)
  const totalPromotion = useSelector(state => state.promotions.total)
  const isChanged = useSelector(state => state.promotions.isChanged)
  const isLoading = useSelector(state => state.promotions.loading)
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [limit] = useState(5)

  const [promotionIdUpdate, setPromotionIdUpdate] = useState()

  const getDataPromotion = () => {
    dispatch(getPromotions(page, limit))
    dispatch(getCourses(1, 1, 100))
  }
  useEffect(() => {
    getDataPromotion()
  }, [page, limit, isChanged])

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current)
  }

  const onDelete = (id) => {
    dispatch(deletePromotion(id))
  }

  const onEdit = (id, promotion) => {
    setPromotionIdUpdate(id)
    form.setFieldsValue({
      courseName: promotion.course.courseName,
      percent: promotion.percent,
      information: promotion.information,
      expireTime: moment(promotion.expireTime)
    })
    setVisible(true)
  }

  const columns = [
    {
      title: 'Course name',
      dataIndex: 'course',
      key: 'courseName',
      sorter: true,
      render: (course) => <div>{course.courseName}</div>
    },
    {
      title: 'Percent',
      dataIndex: 'percent',
      key: 'percent',
      sorter: true,
      render: (percent) => <div>{`${Math.round(+percent * 100) / 1}%`}</div>
    },
    {
      title: 'Information',
      dataIndex: 'information',
      key: 'information',
      sorter: true
    },
    {
      title: 'Information',
      dataIndex: 'information',
      key: 'information',
      sorter: true
    },
    {
      title: 'Expire time',
      dataIndex: 'expireTime',
      key: 'expireTime',
      sorter: true,
      render: (expireTime) => <div>{moment(expireTime).format('DD/MM/YYYY')}</div>
    },
    {
      title: 'Date create',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (createdAt) => <div>{moment(createdAt).format('DD/MM/YYYY')}</div>
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id, promotion) =>
        <div>
          <a style={{ cursor: 'pointer', color: '#ff6666', marginRight: 20 }} onClick={() => onDelete(id)}>delete</a>
          <a style={{ cursor: 'pointer', color: '#314CDB' }} onClick={() => onEdit(id, promotion)}>edit</a>
        </div>
    }
  ]

  const [visible, setVisible] = useState(false)

  const handleCancel = () => {
    setVisible(false)
  }

  const onFinish = (values) => {
    delete values.courseName
    console.log(values)
    dispatch(putPromotion(
      {
        promotionId: promotionIdUpdate,
        percent: values.percent,
        information: values.information,
        expireTime: moment(values.expireTime._d).format('YYYY/MM/DD')
      }))
    setVisible(false)
  }

  const onFinishFailed = (errorInfo) => {
    setVisible(true)
  }

  const dataPercent = () => {
    const array = []
    for (let i = 0.1; i <= 1; i = i + 0.1) {
      const it = Math.round(i * 100) / 100
      let keyI = it.toString()
      if (i < 1) { keyI = keyI + '0' }
      array.push({ key: keyI, value: `${it * 100}%` })
      const j = Math.round((i + 0.05) * 100) / 100
      if (j < 1) {
        const keyJ = j.toString()
        array.push({ key: keyJ, value: `${Math.round(j * 100) / 1}%` })
      }
    }
    return array
  }

  return (
    <div>
      <Table columns={columns} dataSource={dataPromotion} onChange={onChange} pagination={{
        current: page,
        pageSize: 5,
        total: totalPromotion
      }} />
      <Modal
        title="Update promotion"
        visible={visible}
        onCancel={handleCancel}
        okButtonProps={{
          style: {
            display: 'none'
          }
        }}
        cancelButtonProps={{
          style: {
            display: 'none'
          }
        }}
      >
        <Form
          form={form}
          name="control-hooks"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Course name"
            name="courseName"
          >
            <Input readOnly={true}/>
          </Form.Item>

          <Form.Item
            label="Percent"
            name="percent"
            rules={[{ required: true, message: 'Please input percent!' }]}
          >
            <Select allowClear filterOption={(inputValue, option) => option.props.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
                  showSearch
                >
                  {dataPercent().map(option => (
                    <Option value={option.key}>{option.value}</Option>
                  ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Information"
            name="information"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Expire time"
            name="expireTime"
            rules={[{ required: true, message: 'Please input expireTime!' }]}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ borderRadius: 6 }}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <LoadingDialog isLoading={isLoading === 1} />
    </div>
  )
}
