/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { Form, Input, Button, Select, Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { postAuthOtpSend, postAuthOtpConfirm } from '../../redux/user/userAction'

const { Option } = Select

export default function PopupConfirm (props) {
  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState(false)
  const [isConfirm, setConfirm] = React.useState(false)
  const [seconds, setSeconds] = React.useState(0)
  // const [minutes, setMinutes] = React.useState(5)
  // const [timerRunning, setTimerRunning] = React.useState(false)
  const firstUpdate = React.useRef(true)
  const firstUpdateTimer = React.useRef(true)

  let token

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    setConfirm(props.isConfirm)
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
    if (isConfirm) {
      clearTimeout(token)
      token = setTimeout(updateTime, 1000)
    }
  }, [seconds])

  const handleCancel = () => {
    setVisible(false)
    setSeconds(0)
    if (isConfirm) {
      cleanUp()
    }
  }

  const onFinish = (values) => {
    setVisible(false)
    setSeconds(0)
    if (isConfirm) {
      cleanUp()
      const email = JSON.parse(localStorage.getItem('email'))
      values.email = email
      dispatch(postAuthOtpConfirm(values))
    } else {
      dispatch(postAuthOtpSend(values))
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
        title={isConfirm
          ? 'Input your code to confirm account ' +
         `${seconds}`
          : 'Input your email to receive code'}
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
          { isConfirm
            ? (
            <>
              <Form.Item
                label="Code"
                name="code"
                rules={[{ required: true, message: 'Please input your code!' }]}
              >
                <Input />
              </Form.Item>
            </>)
            : (<>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input />
              </Form.Item>
            </>)
          }
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ borderRadius: 6 }}>
              {isConfirm ? 'Confirm' : 'Send'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
