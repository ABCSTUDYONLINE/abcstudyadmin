/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { Form, Input, Button, Select, Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { sendForgetPassword, confirmForgetPassword, forgetPassword } from '../../redux/user/userAction'

const { Option } = Select

export default function PopupConfirm (props) {
  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState(false)
  const [forgetPassValue, setForgetPassValue] = React.useState(0)
  const [seconds, setSeconds] = React.useState(0)
  const firstUpdate = React.useRef(true)
  const firstUpdateTimer = React.useRef(true)

  let token

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    setForgetPassValue(props.forgetPassValue)
    setSeconds(59)
    showModal()
  }, [props.isShow])

  const showModal = () => {
    setVisible(true)
  }

  useEffect(() => {
    if (firstUpdateTimer.current) {
      firstUpdateTimer.current = false
      return
    }
    if (forgetPassValue === 1) {
      clearTimeout(token)
      token = setTimeout(updateTime, 1000)
    }
  }, [seconds])

  const handleCancel = () => {
    setVisible(false)
    setSeconds(0)
    if (forgetPassValue === 1) {
      cleanUp()
    }
  }

  const onFinish = (values) => {
    setSeconds(0)
    switch (forgetPassValue) {
      case 0:
        dispatch(sendForgetPassword(values))
        setVisible(false)
        break
      case 1:
        cleanUp()
        const username = JSON.parse(localStorage.getItem('username'))
        values.username = username
        values.code = +values.code
        dispatch(confirmForgetPassword(values))
        setVisible(false)
        break
      case 2:
        if (values.newPassword !== values.confirmPassword) {
          Modal.error({
            title: 'Error!',
            content: 'The new password must be the same as the confirm password'
          })
        } else {
          delete values.confirmPassword
          const username = JSON.parse(localStorage.getItem('username'))
          values.username = username
          dispatch(forgetPassword(values))
          setVisible(false)
        }
        break
      default: break
    }
  }

  const onFinishFailed = (errorInfo) => {
    setVisible(true)
  }

  function updateTime () {
    const _secount = seconds - 1
    if (_secount <= 0) {
      cleanUp()
    } else {
      setSeconds(_secount)
    }
  }

  const cleanUp = () => {
    setSeconds(0)
    clearTimeout(token)
  }

  return (
    <div>
      <Modal
        title={forgetPassword === 0
          ? 'Input your email to receive code'
          : (forgetPassValue === 1
              ? 'Input your code to confirm account ' + `${seconds}`
              : 'Change Password')}
        visible={visible}
        onCancel={handleCancel}
        maskClosable = {false}
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
          { forgetPassValue === 0
            ? (<>
              <Form.Item
                label="User name"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
            </>)
            : (forgetPassValue === 1
                ? (
                <>
              <Form.Item
                label="Code"
                name="code"
                rules={[{ required: true, message: 'Please input your code!' }]}
              >
                <Input />
              </Form.Item>
            </>
                  )
                : (
                <>
              <Form.Item
                label="New password"
                name="newPassword"
                rules={[{ required: true, message: 'Please input new password!' }]}
              >
                <Input type='password'/>
              </Form.Item>
              <Form.Item
                label="Confirm password"
                name="confirmPassword"
                rules={[{ required: true, message: 'Please input confirm password!' }]}
              >
                <Input type='password'/>
              </Form.Item>
            </>
                  )
              )
          }
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ borderRadius: 6 }}>
              {forgetPassValue === 0 ? 'Send' : (forgetPassValue === 1 ? 'Confirm' : 'Submit')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
