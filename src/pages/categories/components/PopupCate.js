import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { postCategories, getCategories } from '../../../redux/category/categoryAction';

export default function PopupCate() {
  
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);


  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const onFinish = (values) => {
    dispatch(postCategories(values))
    setVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    setVisible(true);
  };
  return (

    <div>
      <Button type="primary" onClick={showModal}>
        New category
      </Button>
      <Modal
        title="New category"
        visible={visible}
        onCancel={handleCancel}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        cancelButtonProps={{
          style: {
            display: "none",
          },
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Category name"
            name="categoryName"
            rules={[{ required: true, message: 'Please input category name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              New
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
