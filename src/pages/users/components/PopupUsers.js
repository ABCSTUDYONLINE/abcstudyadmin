/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Modal, DatePicker, Upload } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, hideProfile, updateAvatar } from '../../../redux/user/userAction'
import * as moment from 'moment'

import { InboxOutlined } from '@ant-design/icons'
const { Dragger } = Upload

const { Option } = Select

export default function PopupUsers (props) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState(props.visible)
  const [isAvatar, setAvatar] = React.useState(props.isAvatar)
  const [isRead, setRead] = React.useState(true)
  const isChanged = useSelector(state => state.user.isChanged)
  const isLoading = useSelector(state => state.user.loading)

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'))
    form.setFieldsValue({
      firstName: profile.firstName,
      lastName: profile.lastName,
      birthDay: moment(profile.birthDay),
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      address: profile.address
    })
    setRead(true)
    setVisible(props.visible)
    setAvatar(props.isAvatar)
  }, [props.visible])

  const handleCancel = () => {
    dispatch(hideProfile())
    setVisible(false)
  }

  const onFinish = (values) => {
    if (isAvatar) {
      const formData = new FormData()
      formData.append('file', values.file[0].originFileObj)
      dispatch(updateAvatar(formData))
    } else {
      values.birthDay = moment(values.birthDay._d).format('YYYY/MM/DD')
      dispatch(updateUser(values))
    }
    dispatch(hideProfile())
    setVisible(false)
  }

  const onFinishFailed = (errorInfo) => {
    setVisible(true)
  }

  const changeType = () => {
    setRead(!isRead)
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
      <Modal
        title={'Profile'}
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
        > {isAvatar
          ? (
          <>
            <Form.Item
              name="file"
              label="Avatar"
              valuePropName="fileList"
              style={{ position: 'sticky' }}
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload avatar here!' }]}
        >
          <Dragger multiple={false} customRequest={dummyRequest} name="logo" action="/upload.do" listType="picture">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        </Form.Item>
          </>
            )
          : <>
          <Form.Item
            label="First name"
            name="firstName"
            rules={[{ required: true, message: 'Please input first name description!' }]}
          >
            <Input readOnly={isRead}/>
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastName"
            rules={[{ required: true, message: 'Please input last name description!' }]}
          >
            <Input readOnly={isRead}/>
          </Form.Item>

          <Form.Item
            label="Birthday"
            name="birthDay"
            rules={[{ required: true, message: 'Please input your birthday!' }]}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} disabled={isRead}/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
          >
            <Input readOnly={isRead}/>
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <Input readOnly={isRead}/>
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input readOnly={isRead}/>
          </Form.Item>
          </>}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button hidden={isAvatar} type="primary" onClick={() => changeType()} style={{ borderRadius: 6, marginRight: 10 }}>
              {isRead ? 'Write' : 'Read'}
            </Button>
            <Button hidden={isRead && !isAvatar} type="primary" htmlType="submit" style={{ borderRadius: 6 }}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
