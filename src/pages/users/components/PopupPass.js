/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import { Form, Input, Button, Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { changePassword } from '../../../redux/user/userAction'
import { useHistory } from 'react-router-dom'

export default function PopupPass (props) {
  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState(false)
  const firstUpdate = React.useRef(true)
  const history = useHistory()

  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    setVisible(true)
  }, [props.showDialog])

  const handleCancel = () => {
    setVisible(false)
  }

  const onFinish = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      Modal.error({
        title: 'Error!',
        content: 'The new password must be the same as the confirm password'
      })
    } else if (values.newPassword === values.oldPassword) {
      Modal.error({
        title: 'Error!',
        content: 'The new password must be different to old password'
      })
    } else {
      delete values.confirmPassword
      dispatch(changePassword(history, values))
      setVisible(false)
    }
  }

  const onFinishFailed = (errorInfo) => {
    setVisible(true)
  }

  return (
    <div>
      <Modal
        title={'Change Password'}
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
          name="base"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[{ required: true, message: 'Please input old password!' }]}
          >
            <Input type={'password'}/>
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'Please input new password!' }]}
          >
            <Input type={'password'}/>
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please input new password again!' }]}
          >
            <Input type={'password'}/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ borderRadius: 6 }}>
              Submit Change
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
