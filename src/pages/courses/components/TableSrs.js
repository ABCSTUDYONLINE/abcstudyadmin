/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { Table, Image, Button, Form, Select, Input, Modal, Upload, Alert } from 'antd'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses, deleteCourses, putCourses, putImageCourses, gotoTopic, publicCourse, updateOperationCourse } from '../../../redux/courses/coursesAction'
import { getCategories } from '../../../redux/category/categoryAction'
import { getAuthUsers } from '../../../redux/user/userAction'
import { LoadingDialog } from '../../../components/LoadingDialog'
import moment from 'moment'
import { EditorState, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

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
  const teachers = useSelector(state => state.user.users)
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [limit] = useState(5)
  const [role, setRole] = useState(0)
  const [visible, setVisible] = useState(false)
  const [courseIdUpdate, setCourseIdUpdate] = useState()
  const [isImage, setImage] = useState(false)
  const firstUpdateProfile = React.useRef(true)
  const [contentChange, setContentChange] = useState(null)

  useEffect(() => {
    console.log('1')
    const localProfile = JSON.parse(localStorage.getItem('profile'))
    setRole(localProfile.role === 'teacher' ? 1 : 0)
    dispatch(getCategories(1, 100))
    if (localProfile.role !== 'teacher') {
      dispatch(getAuthUsers(1, 100, 'teacher'))
    }
    getDataCourses(localProfile.role === 'teacher' ? 1 : 0)
  }, [profileChange])

  const getDataCourses = (role) => {
    dispatch(getCourses('empty', role, page, limit))
  }

  useEffect(() => {
    if (firstUpdateProfile.current) {
      firstUpdateProfile.current = false
      return
    }
    console.log('2')
    getDataCourses(role)
  }, [page, isChanged])

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
    const contentBlock = htmlToDraft(course.content)
    let content = EditorState.createEmpty()
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      content = EditorState.createWithContent(contentState)
    }
    form.setFieldsValue({
      categoryId: course.category.id,
      courseName: course.courseName,
      shortCourseDescription: course.shortCourseDescription,
      // content: convertToRaw(content.getCurrentContent()),
      fee: course.fee
    })
    setContentChange(content)
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
          content: draftToHtml(values.content),
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

  const updateOperation = (id, operation) => {
    dispatch(updateOperationCourse({ courseId: id, operation: operation === 'enable' ? 'disable' : 'enable' }))
  }

  const onEditorStateChange = (editorState) => {
    console.log(editorState.getCurrentContent())
    setContentChange(editorState)
  }

  function handleChange (value) {
    console.log(`selected ${value}`)
    dispatch(getCourses(value === undefined ? 'empty' : value, role, 1, limit))
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
          {role === 0 ? <a style={{ cursor: 'pointer', color: course.operation === 'enable' ? '#DA251C' : '#5AC18E', marginRight: 20 }} onClick={() => updateOperation(id, course.operation)}>{course.operation === 'enable' ? 'lock' : 'unlock'}</a> : null}
        </div>
    }
  ]

  return (
    <div>
      { role === 0
        ? <Select style={{ display: 'flex', float: 'left', marginBottom: 10, width: 200 }}
        placeholder="Search to Select"
        allowClear filterOption={(inputValue, option) => option.props.children
          .toString()
          .toLowerCase()
          .includes(inputValue.toLowerCase())}
                  showSearch
                  onChange={handleChange}>
          {teachers.map(option => (
            <Option value={option.id}>{`${option.firstName} ${option.lastName}`}</Option>
          ))}
      </Select>
        : null
      }
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
        width='60%'
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
                  label="Content"
                  name="content"
                  rules={[{ required: true, message: 'Please input content!' }]}
                >
                  <Editor
                    editorState={contentChange}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={(editorState) => onEditorStateChange(editorState)}
                    />
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
