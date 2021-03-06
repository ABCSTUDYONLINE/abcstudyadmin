/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Input, Button, Modal, Select } from 'antd'
import { useDispatch } from 'react-redux'
import { postCategories } from '../../../redux/category/categoryAction'

const { Option } = Select

export default function PopupCate () {
  const dispatch = useDispatch()

  const [visible, setVisible] = React.useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onFinish = (values) => {
    dispatch(postCategories(values))
    setVisible(false)
  }

  const onFinishFailed = (errorInfo) => {
    setVisible(true)
  }

  return (

    <div>
      <div style={{ display: 'flex', float: 'right', marginBottom: 10 }}>
        <Button type="primary" onClick={showModal} style={{ borderRadius: 6 }}>
          New category
        </Button>
      </div>
      <Modal
        title="New category"
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
            label="Level category"
            name="levelCategory"
            rules={[{ required: true, message: 'Please input level category!' }]}
          >
            <Select defaultValue='web'>
              <Option value="web">web</Option>
              <Option value="mobile">mobile</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Category name"
            name="categoryName"
            rules={[{ required: true, message: 'Please input category name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ borderRadius: 6 }}>
              New
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
