/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { Table, Image, Button, Form, Select, Input, Modal, Upload } from 'antd'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses, deleteCourses, putCourses, putImageCourses, gotoTopic, publicCourse } from '../../../redux/courses/coursesAction'
import { getCategories } from '../../../redux/category/categoryAction'
import { LoadingDialog } from '../../../components/LoadingDialog'
import * as moment from 'moment'
// logo
import logo from '../../login/logo.svg'
import { InboxOutlined } from '@ant-design/icons'
const { Dragger } = Upload

const { Option } = Select

export default function TableSrc (props) {
  const [form] = Form.useForm()

  const dataCourse = useSelector(state => state.courses.courses)
  const totalCourse = useSelector(state => state.courses.total)
  const isChanged = useSelector(state => state.courses.isChanged)
  const dataCategory = useSelector(state => state.category.categories)
  const isLoading = useSelector(state => state.courses.loading)
  const profileChange = useSelector(state => state.user.profile)
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [limit] = useState(5)
  const [role, setRole] = useState(0)
  const [visible, setVisible] = useState(false)
  const [courseIdUpdate, setCourseIdUpdate] = useState()
  const [isImage, setImage] = useState(false)
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))

  useEffect(() => {
    const localProfile = JSON.parse(localStorage.getItem('profile'))
    setProfile(localProfile)
    setRole(localProfile.role === 'teacher' ? 1 : 0)
  }, [profileChange])

  const getDataCourses = () => {
    dispatch(getCourses(role, page, limit))
  }

  useEffect(() => {
    dispatch(getCategories(1, 100))
  }, [])

  useEffect(() => {
    getDataCourses()
  }, [page, limit, isChanged])

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current)
  }

  const onDelete = (courseId) => {
    dispatch(deleteCourses(courseId))
  }

  const toTopic = (courseId) => {
    dispatch(gotoTopic(courseId))
  }

  const toPublic = (courseId) => {
    dispatch(publicCourse({ courseId: courseId }))
  }

  const onEdit = (idCategory, course) => {
    setCourseIdUpdate(idCategory)
    form.setFieldsValue({
      categoryId: course.category.id,
      courseName: course.courseName,
      shortCourseDescription: course.shortCourseDescription,
      detailCourseDescription: course.detailCourseDescription,
      whatWillLearn: course.whatWillLearn,
      requirements: course.requirements,
      fee: course.fee
    })
    setImage(false)
    setVisible(true)
  }

  const updateImage = (link) => {
    const course = dataCourse.find((element) => {
      return element.courseImageLink === link
    })
    setCourseIdUpdate(course.id)
    setImage(true)
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onFinish = (values) => {
    if (isImage) {
      const formData = new FormData()
      formData.append('file', values.file[0].originFileObj)
      formData.append('courseId', courseIdUpdate)
      dispatch(putImageCourses(formData))
    } else {
      dispatch(putCourses(
        {
          courseId: courseIdUpdate,
          category: dataCategory.find((element) => {
            console.log(values.categoryId)
            return element.id === values.categoryId
          }),
          courseName: values.courseName,
          shortCourseDescription: values.shortCourseDescription,
          detailCourseDescription: values.detailCourseDescription,
          whatWillLearn: values.whatWillLearn,
          requirements: values.requirements,
          fee: values.fee.toString()
        }))
    }
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

  const columns = [
    {
      title: 'Image',
      dataIndex: 'courseImageLink',
      key: 'image',
      sorter: true,
      render: (link) => (
        <Button
          type="dashed"
          onClick={role === 1
            ? () => {
                updateImage(link)
              }
            : null}
          style={{ width: 100, height: 50 }}
        >
        <Image
          width={100}
          height={50}
          preview={false}
          src={link !== null ? link : logo }
        />
      </Button>
      )
    },
    {
      title: 'Name courses',
      dataIndex: 'courseName',
      key: 'courseName',
      sorter: true
    },
    {
      title: 'Teacher',
      dataIndex: 'teacher',
      key: 'teacher.id',
      sorter: true,
      render: (teacher) => <div>{teacher.firstName + ' ' + teacher.lastName}</div>
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
      sorter: true
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true
    },
    {
      title: 'Number student',
      dataIndex: 'studies',
      key: 'studies',
      sorter: true
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (createdAt) => <div>{moment(createdAt).format('DD/MM/YYYY')}</div>
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id, course) =>
        <div>
          <a style={{ cursor: 'pointer', color: '#ff6666', marginRight: 20 }} onClick={() => onDelete(id)}>delete</a>
          {role === 1 ? <a style={{ cursor: 'pointer', color: '#314CDB', marginRight: 20 }} onClick={() => onEdit(id, course)}>edit</a> : null}
          {role === 1 ? <a style={{ cursor: 'pointer', color: '#5FDF28', marginRight: 20 }} onClick={() => toTopic(id)}>topics</a> : null}
          {role === 1 ? <a style={course.status !== 'doing' ? { pointerEvents: 'none', opacity: '0.4', color: '#db9514', marginRight: 20 } : { cursor: 'pointer', color: '#db9514', marginRight: 20 }} onClick={() => toPublic(id)}>publish</a> : null}
        </div>
    }
  ]

  return (
    <div>
      <Table columns={ role === 1
        ? columns.filter((item, itemIndex) => itemIndex !== 2)
        : columns} dataSource={dataCourse} onChange={onChange} pagination={{
          current: page,
          pageSize: 5,
          total: totalCourse
        }} />
      <Modal
        title={isImage ? 'Update coure image' : 'Update course'}
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
        >
          {isImage
            ? (
            <>
              <Form.Item
                name="file"
                label="Course image"
                valuePropName="fileList"
                style={{ position: 'sticky' }}
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Please upload course image!' }]}
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
            : (
            <><Form.Item
                label="Category"
                name="categoryId"
                rules={[{ required: true, message: 'Please input category!' }]}
              >
                <Select allowClear filterOption={(inputValue, option) => option.props.children
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase())}
                  showSearch
                >
                  {dataCategory.map(option => (
                    <Option value={option.id}>{option.categoryName}</Option>
                  ))}
                </Select>
              </Form.Item><Form.Item
                label="Course name"
                name="courseName"
                rules={[{ required: true, message: 'Please input course name!' }]}
              >
                  <Input />
                </Form.Item><Form.Item
                  label="Short course description"
                  name="shortCourseDescription"
                  rules={[{ required: true, message: 'Please input short course description!' }]}
                >
                  <Input />
                </Form.Item><Form.Item
                  label="Detail course description"
                  name="detailCourseDescription"
                  rules={[{ required: true, message: 'Please input detail coure description!' }]}
                >
                  <Input />
                </Form.Item><Form.Item
                  label="What will learn"
                  name="whatWillLearn"
                  rules={[{ required: true, message: 'Please input what will learn!' }]}
                >
                  <Input />
                </Form.Item><Form.Item
                  label="Requirements"
                  name="requirements"
                  rules={[{ required: true, message: 'Please input requirements!' }]}
                >
                  <Input />
                </Form.Item><Form.Item
                  label="Fee"
                  name="fee"
                  rules={[{ required: true, message: 'Please input fee!' }]}
                >
                  <Input />
                </Form.Item></>
              )}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ borderRadius: 6 }}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <LoadingDialog isLoading={isLoading === 1} />
    </div>
  )
}
