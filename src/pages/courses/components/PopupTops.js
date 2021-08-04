/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { postTopic } from '../../../redux/topics/topicsAction'
import { gobackCourse } from '../../../redux/courses/coursesAction'

export default function PopupCate () {
  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState(false)
  const courseId = useSelector(state => state.courses.courseId)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onFinish = (values) => {
    values.courseId = courseId
    dispatch(postTopic(values))
    setVisible(false)
  }

  const onFinishFailed = (errorInfo) => {
    setVisible(true)
  }

  const goBack = () => {
    dispatch(gobackCourse())
  }

  return (
    <div>
      <div style={{ display: 'flex', float: 'right', marginBottom: 10 }}>
        <Button type="primary" onClick={() => goBack()} style={{ borderRadius: 6, right: 8 }}>
          Back
        </Button>
        <Button type="primary" onClick={showModal} style={{ borderRadius: 6 }}>
          New Topic
        </Button>
      </div>
      <Modal
        title="New course"
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
            label="Topic name"
            name="topicName"
            rules={[{ required: true, message: 'Please input topic name!' }]}
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
