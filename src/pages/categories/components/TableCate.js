
import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Select, Modal } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategories, putCategories } from '../../../redux/category/categoryAction';


export default function TableCate(props) {

  const dataCategory = useSelector(state => state.category.categories);
  const totalCategory = useSelector(state => state.category.total);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)

  const [categoryIdUpdate, setCategoryIdUpdate] = useState()

  const getDataCategory = () => {
    dispatch(getCategories(page, limit))
  }
  useEffect(() => {
    getDataCategory()
  }, [page, limit])

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current)
  }

  const onDelete = (idCategory) => {
    dispatch(deleteCategories(idCategory))
  }

  const onEdit = (idCategory) => {
    setCategoryIdUpdate(idCategory)
    setVisible(true);
  }

  const columns = [
    {
      title: 'Level category',
      dataIndex: 'levelCategory',
      key: 'levelCategory',
      sorter: true,
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id) =>
        <div>
          <a style={{ cursor: 'pointer', color: '#ff6666', marginRight: 20 }} onClick={() => onDelete(id)}>delete</a>
          <a style={{ cursor: 'pointer' }} onClick={() => onEdit(id)}>edit</a>
        </div>
    },
  ];

  const [visible, setVisible] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    dispatch(putCategories(
      {
        'categoryId': categoryIdUpdate,
        'categoryName': values.categoryName,
        'levelCategory': values.levelCategory
      }))
    setVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    setVisible(true);
  };

  return (
    <div>
      <Table columns={columns} dataSource={dataCategory} onChange={onChange} pagination={{
        current: page,
        pageSize: 5,
        total: totalCategory
      }} />
      <Modal
        title="Update category"
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}