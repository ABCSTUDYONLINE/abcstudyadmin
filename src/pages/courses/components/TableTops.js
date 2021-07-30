/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Table, Image, Button, Form, Select, Input, Modal, Upload } from 'antd'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux'
import { getTopics, deleteTopic, putTopic } from '../../../redux/topics/topicsAction'
import * as moment from 'moment'

export default function TableTops (props) {
  const [form] = Form.useForm()

  const dataTopic = useSelector(state => state.topics.topics)
  const totalCourse = useSelector(state => state.topics.total)
  const isChanged = useSelector(state => state.topics.isChanged)
  const courseId = useSelector(state => state.courses.courseId)
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [limit] = useState(5)
  const [visible, setVisible] = useState(false)
  const [topicIdUpdate, setTopicIdUpdate] = useState()

  const getDataCourses = () => {
    dispatch(getTopics(courseId, page, limit))
  }

  useEffect(() => {
    getDataCourses()
  }, [page, limit, isChanged])

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current)
  }

  const onDelete = (topicId) => {
    dispatch(deleteTopic(topicId))
  }

  const onEdit = (topicId, topic) => {
    console.log(topicId)
    setTopicIdUpdate(topicId)
    form.setFieldsValue({
      topicName: topic.topicName
    })
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onFinish = (values) => {
    dispatch(putTopic(
      {
        topicId: topicIdUpdate,
        topicName: values.topicName
      }))
    setVisible(false)
  }

  const onFinishFailed = (errorInfo) => {
    setVisible(true)
  }

  const columns = [
    {
      title: 'Name topic',
      dataIndex: 'topicName',
      key: 'topicName',
      sorter: true
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
      render: (id, topic) =>
        <div>
          <a style={{ cursor: 'pointer', color: '#ff6666', marginRight: 20 }} onClick={() => onDelete(id)}>delete</a>
          <a style={{ cursor: 'pointer', color: '#314CDB', marginRight: 20 }} onClick={() => onEdit(id, topic)}>edit</a>
          <a style={{ cursor: 'pointer', color: '#5FDF28', marginRight: 20 }} onClick={null}>lessons</a>
        </div>
    }
  ]

  return (
    <div>
      <Table columns={columns} dataSource={dataTopic} onChange={onChange} pagination={{
        current: page,
        pageSize: 5,
        total: totalCourse
      }} />
      <Modal
        title={'Update topic'}
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
                name="topicName"
                rules={[{ required: true, message: 'Please input topic name!' }]}
              >
                  <Input />
                </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ borderRadius: 6 }}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
