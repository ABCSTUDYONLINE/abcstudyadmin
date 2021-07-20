
import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Select, Modal } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, deleteCourses, putCourses } from '../../../redux/courses/coursesAction';


export default function TableSrc(props) {

  const dataCategory = useSelector(state => state.courses.courses);
  const totalCategory = useSelector(state => state.courses.total);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)

  const [coursesIdUpdate, setCategoryIdUpdate] = useState()

  const getDataCategory = () => {
    dispatch(getCourses(0, page, limit))
  }
  useEffect(() => {
    getDataCategory()
  }, [page, limit])

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current)
  }

  const onDelete = (idCategory) => {
    dispatch(deleteCourses(idCategory))
  }

  const onEdit = (idCategory) => {
    setCategoryIdUpdate(idCategory)
    setVisible(true);
  }

  const columns = [
    {
      title: 'Level courses',
      dataIndex: 'courseName',
      key: 'courseName',
      sorter: true,
    },
    {
      title: 'Category Name',
      dataIndex: 'fee',
      key: 'fee',
      sorter: true,
    },
    {
      title: 'Category Name',
      dataIndex: 'studies',
      key: 'studies',
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
    dispatch(putCourses(
      {
        'coursesId': coursesIdUpdate,
        'coursesName': values.coursesName,
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
        title="Update courses"
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
            label="Level courses"
            name="levelCategory"
            rules={[{ required: true, message: 'Please input level courses!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category name"
            name="coursesName"
            rules={[{ required: true, message: 'Please input courses name!' }]}
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