import { Button, Form, Input, Toast } from 'antd-mobile'
import React from 'react'
import { useNavigate } from 'react-router'
import { login } from '../../services'

import './index.scss'

export const Login = () => {
    const [form] = Form.useForm();
    const navigator = useNavigate()

    const onFinish = (val) => {
        console.log(val)
        login(val).then(res => {
            debugger
            navigator('/home')
        }).catch(err => {
            Toast.show({
                content: err.msg,
            })
        })
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <Form
                    form={form}
                    layout='horizontal'
                    onFinish={onFinish}>
                    <Form.Item label='手机号' name="userName" rules={[{ required: true, message: '请输入手机号' }]}>
                        <Input placeholder='请输入手机号' />
                    </Form.Item>
                    <Form.Item label='密码' name="password" rules={[{ required: true, message: '请输入密码' }]}>
                        <Input placeholder='请输入密码' type='password' />
                    </Form.Item>
                    <Form.Item>
                        <div className="login-btn">
                            <Button color='primary' fill='none'>去注册</Button>
                            <Button type="submit">登录</Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}