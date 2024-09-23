import React from 'react';
import {Button, DatePicker, Form, Input, Radio} from "antd";
import {NavLink} from "react-router-dom";

const Register = ({ registerHandler }) => {

    const onFinish = object => {
        return registerHandler(object);
    }

    return (
        <div className="register-wrapper">
            <NavLink className="button" to="/">
                На головну
            </NavLink>
            <Form
                name="register"
                labelCol={{
                    span: 23,
                }}
                wrapperCol={{
                    span: 30,
                }}
                style={{
                    maxWidth: 900,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label="Full name"
                    name="fullname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your full name!',
                        },
                        {
                            min: 3,
                            message: 'The input is not valid length!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Date of birth"
                    name="birthday"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your date of birth!',
                        },
                    ]}
                >
                    <DatePicker/>
                </Form.Item>
                <Form.Item
                    label="Where did you hear about this event?"
                    name="fromGetInfo"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a data!',
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value="Social media"> Social media </Radio>
                        <Radio value="Friends"> Friends </Radio>
                        <Radio value="Found myself"> Found myself </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;