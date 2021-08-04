/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { Table, Image, Button, Form, Select, Input, Modal, Upload } from 'antd'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux'
import { getLessons, deleteLesson, putLesson } from '../../../redux/lessons/lessonsAction'
import { LoadingDialog } from '../../../components/LoadingDialog'
import * as moment from 'moment'
// logo
import logo from '../../login/logo.svg'
import { InboxOutlined } from '@ant-design/icons'
const { Dragger } = Upload

const { Option } = Select

export default function TableLes (props) {
  const [form] = Form.useForm()

  const dataLessons = useSelector(state => state.lessons.lessons)
  const totalLesson = useSelector(state => state.lessons.total)
  const isChanged = useSelector(state => state.lessons.isChanged)
  const topicId = useSelector(state => state.courses.topicId)
  const isLoading = useSelector(state => state.lessons.loading)
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [limit] = useState(5)
  const [visible, setVisible] = useState(false)
  const [lessonIdUpdate, setLessonIdUpdate] = useState()

  const getDataLessons = () => {
    dispatch(getLessons(topicId, page, limit))
  }

  useEffect(() => {
    getDataLessons()
  }, [isChanged])

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current)
  }

  const onDelete = (lessonId) => {
    dispatch(deleteLesson(lessonId))
  }

  const onEdit = (id, lesson) => {
    setLessonIdUpdate(id)
    form.setFieldsValue({
      lessonName: lesson.lessonName,
      lessonDescription: lesson.lessonDescription
    })
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onFinish = (values) => {
    const formData = new FormData()
    if (values.file !== undefined) {
      formData.append('file', values.file[0].originFileObj)
    }
    formData.append('lessonId', lessonIdUpdate)
    formData.append('lessonName', values.lessonName)
    formData.append('lessonDescription', values.lessonDescription)
    dispatch(putLesson(formData))
    setVisible(false)
  }

  const onFinishFailed = (errorInfo) => {
    setVisible(true)
  }

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  const normFile = (e) => {
    console.log('Upload event:', e)

    if (Array.isArray(e)) {
      return e
    }

    return e && e.fileList
  }

  const columns = [
    {
      title: 'Lesson Name',
      dataIndex: 'lessonName',
      key: 'lessonName',
      sorter: true
    },
    {
      title: 'Lesson Description',
      dataIndex: 'lessonDescription',
      key: 'lessonDescription',
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
      render: (id, course) =>
        <div>
          <a style={{ cursor: 'pointer', color: '#ff6666', marginRight: 20 }} onClick={() => onDelete(id)}>delete</a>
          <a style={{ cursor: 'pointer', color: '#314CDB', marginRight: 20 }} onClick={() => onEdit(id, course)}>edit</a>
        </div>
    }
  ]

  return (
    <div>
      <Table columns={columns} dataSource={dataLessons} onChange={onChange} pagination={{
        current: page,
        pageSize: 5,
        total: totalLesson
      }} />
      <Modal
        title={'Update lesson'}
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
                name="file"
                label="Lesson video"
                valuePropName="fileList"
                style={{ position: 'sticky' }}
                getValueFromEvent={normFile}
                rules={[{ required: false, message: 'Please upload video for lesson!' }]}
          >
            <Dragger multiple={false} customRequest={dummyRequest} name="video" action="/upload.do" listType="video">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
          </Form.Item>
          <Form.Item
                label="Lesson name"
                name="lessonName"
                rules={[{ required: true, message: 'Please input lesson name!' }]}
              >
                  <Input />
                </Form.Item><Form.Item
                  label="Lesson description"
                  name="lessonDescription"
                  rules={[{ required: true, message: 'Please input lesson description!' }]}
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
      <LoadingDialog isLoading={isLoading === 1} />
    </div>
  )
}
