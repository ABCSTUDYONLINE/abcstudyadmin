import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/user/userAction';
import * as moment from 'moment';
const { Text } = Typography;

export default function NewTeacher() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch(register(
            {
                'firstName': values.firstName,
                'lastName': values.lastName,
                'username': values.username,
                'password': values.password,
                'email': values.email,
                'phoneNumber': values.phoneNumber,
                'address': values.address,
                'role': 'teacher',
                'chuaco': moment(values.chuaco._d).format('DD/MM/YYYY')
            }
        ));
    };

    const onFinishFailed = (errorInfo) => {

    };

    return (
        <div style={{ backgroundColor: '#FFF', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 600, flexDirection: 'column' }}>
            <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 32 }}>New teacher</Text>
            </div>
            <div style={{ height: 400 }}>
                <Form
                    form={form}
                    name='control-hooks'
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: 400 }}>
                            <Form.Item
                                label='Username'
                                name='username'
                                rules={[{ required: true, message: 'Please input username!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div style={{ width: 400 }}>
                            <Form.Item
                                label='Password'
                                name='password'
                                rules={[{ required: true, message: 'Please input password!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: 400 }}>
                            <Form.Item
                                label='First name'
                                name='firstName'
                                rules={[{ required: true, message: 'Please input firstName!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div style={{ width: 400 }}>
                            <Form.Item
                                label='Last name'
                                name='lastName'
                                rules={[{ required: true, message: 'Please input lastName!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: 400 }}>
                            <Form.Item
                                label='Email'
                                name='email'
                                rules={[{ required: true, type: 'email', message: 'Please input email!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div style={{ width: 400 }}>
                            <Form.Item
                                label='Number phone'
                                name='phoneNumber'
                                rules={[{ required: true, message: 'Please input phoneNumber!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: 400 }}>
                            <Form.Item
                                label='Date of birth'
                                name='chuaco'
                                rules={[{ required: true, message: 'Please input date of birth!' }]}
                            >
                                <DatePicker format={'DD/MM/YYYY'} />
                            </Form.Item>
                        </div>
                        <div style={{ width: 400 }}>
                            <Form.Item
                                label='Address'
                                name='address'
                                rules={[{ required: true, message: 'Please input address!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Form.Item >
                            <Button type='primary' htmlType='submit' style={{ borderRadius: 6 }}>
                                New teacher
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    )
}