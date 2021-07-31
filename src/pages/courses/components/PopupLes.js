/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Modal, Upload } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { postLesson } from '../../../redux/lessons/lessonsAction'
import { UploadOutlined } from '@ant-design/icons'
import { gobackTopic } from '../../../redux/courses/coursesAction'

const { Option } = Select

export default function PopupCate () {
  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState(false)
  const topicId = useSelector(state => state.courses.topicId)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onFinish = (values) => {
    const formData = new FormData()
    formData.append('file', values.file[0].originFileObj)
    formData.append('topicId', topicId.toString())
    formData.append('lessonName', values.lessonName)
    formData.append('lessonDescription', values.lessonDescription)
    dispatch(postLesson(formData))
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

  const goBack = () => {
    dispatch(gobackTopic())
  }

  return (
    <div>
      <div style={{ display: 'flex', float: 'right', marginBottom: 10 }}>
        <Button type="primary" onClick={() => goBack()} style={{ borderRadius: 6, right: 8 }}>
          Back
        </Button>
        <Button type="primary" onClick={showModal} style={{ borderRadius: 6 }}>
          New Lesson
        </Button>
      </div>
      <Modal
        title="New lesson"
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
          name="basic"
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
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Please upload video for lesson!' }]}
          >
            <Upload multiple={false} customRequest={dummyRequest} name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Lesson name"
            name="lessonName"
            rules={[{ required: true, message: 'Please input lesson name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lesson description"
            name="lessonDescription"
            rules={[{ required: true, message: 'Please input short lesson description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ borderRadius: 6 }}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
