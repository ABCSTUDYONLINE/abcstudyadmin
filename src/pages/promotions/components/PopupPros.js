/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Input, Button, Modal, Select, DatePicker } from 'antd'
import { postPromotion } from '../../../redux/promotions/promotionsAction'
import { useDispatch, useSelector } from 'react-redux'

const { Option } = Select

export default function PopupCate () {
  const dispatch = useDispatch()

  const dataCourse = useSelector(state => state.courses.courses)

  const [visible, setVisible] = React.useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onFinish = (values) => {
    dispatch(postPromotion(values))
    setVisible(false)
  }

  const onFinishFailed = (errorInfo) => {
    setVisible(true)
  }

  const dataPercent = () => {
    const array = []
    for (let i = 0.1; i <= 1; i = i + 0.1) {
      const it = Math.round(i * 100) / 100
      const keyI = it.toString()
      array.push({ key: keyI, value: `${it * 100}%` })
      const j = Math.round((i + 0.05) * 100) / 100
      if (j < 1) {
        const keyJ = j.toString()
        array.push({ key: keyJ, value: `${Math.round(j * 100) / 1}%` })
      }
    }
    return array
  }

  return (

    <div>
      <div style={{ display: 'flex', float: 'right', marginBottom: 10 }}>
        <Button type="primary" onClick={showModal} style={{ borderRadius: 6 }}>
          New promotion
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
            label="Course name"
            name="courseId"
          >
            <Select allowClear filterOption={(inputValue, option) => option.props.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
                  showSearch
                >
                  {dataCourse.filter((item, itemIndex) => item.promotion === null).map(option => (
                    <Option value={option.id}>{option.courseName}</Option>
                  ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Percent"
            name="percent"
            rules={[{ required: true, message: 'Please input percent!' }]}
          >
            <Select allowClear filterOption={(inputValue, option) => option.props.children
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())}
                  showSearch
                >
                  {dataPercent().map(option => (
                    <Option value={option.key}>{option.value}</Option>
                  ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Information"
            name="information"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Expire time"
            name="expireTime"
            rules={[{ required: true, message: 'Please input expireTime!' }]}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
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
