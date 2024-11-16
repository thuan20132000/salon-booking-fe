'use client';
import type { FormProps } from 'antd';
import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Form, Checkbox, Button, Input, InputNumber } from 'antd';
import useAuthenticationStore from '@/store/useAuthenticationStore';
import { AuthenticationState } from '../../../store/useAuthenticationStore';

const { Header, Content, Footer, Sider } = Layout;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  phonenumber?: string;
};



const Signin: React.FC = () => {
  const {
    isAuthenticated,
    login,
    logout,
    user
  } = useAuthenticationStore((AuthenticationState: AuthenticationState) => AuthenticationState);



  return (
    <div>

      <Layout>

        <Layout>
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}

                >
                  <Input defaultValue={'customer'} />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password defaultValue={'Matkhau@123'} />
                </Form.Item>
                <Form.Item<FieldType>
                  label="phonenumber"
                  name="phonenumber"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <InputNumber<number>
                    defaultValue={1000}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                  />
                </Form.Item>
                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                  <Button htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>

        </Layout>
      </Layout>
    </div>
  )
};

export default Signin;