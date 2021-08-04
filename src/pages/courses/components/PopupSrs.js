/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Modal, Upload } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../../redux/category/categoryAction'
import { postCourses } from '../../../redux/courses/coursesAction'
import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select

export default function PopupCate () {
  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState(false)
  const dataCategory = useSelector(state => state.category.categories)
  const profileChange = useSelector(state => state.user.profile)
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
  const [role, setRole] = useState(0)

  useEffect(() => {
    const localProfile = JSON.parse(localStorage.getItem('profile'))
    setProfile(localProfile)
    setRole(localProfile.role === 'teacher' ? 1 : 0)
    dispatch(getCategories(1, 100))
  }, [profileChange])

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onFinish = (values) => {
    const formData = new FormData()
    formData.append('file', values.file[0].originFileObj)
    formData.append('categoryId', values.categoryId)
    formData.append('courseName', values.courseName)
    formData.append('shortCourseDescription', values.shortCourseDescription)
    formData.append('detailCourseDescription', values.detailCourseDescription)
    formData.append('whatWillLearn', values.whatWillLearn)
    formData.append('requirements', values.requirements)
    formData.append('fee', values.fee)
    dispatch(postCourses(formData))
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

  return (
    <div>
      {role === 1
        ? <div style={{ display: 'flex', float: 'right', marginBottom: 10 }}>
        <Button type="primary" onClick={showModal} style={{ borderRadius: 6 }}>
          New Course
        </Button>
      </div>
        : null}
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
            name="file"
            label="Coure image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Please upload course image!' }]}
          >
            <Upload multiple={false} customRequest={dummyRequest} name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: 'Please input category!' }]}
          >
            <Select allowClear filterOption={(inputValue, option) =>
              option.props.children
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())
              }
              showSearch
              >
              {dataCategory.map(option => (
                <Option value={option.id}>{option.categoryName}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Course name"
            name="courseName"
            rules={[{ required: true, message: 'Please input course name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Short course description"
            name="shortCourseDescription"
            rules={[{ required: true, message: 'Please input short course description!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Detail course description"
            name="detailCourseDescription"
            rules={[{ required: true, message: 'Please input detail coure description!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="What will learn"
            name="whatWillLearn"
            rules={[{ required: true, message: 'Please input what will learn!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Requirements"
            name="requirements"
            rules={[{ required: true, message: 'Please input requirements!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Fee"
            name="fee"
            rules={[{ required: true, message: 'Please input fee!' }]}
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
