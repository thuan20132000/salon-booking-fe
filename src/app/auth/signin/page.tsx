import type { FormProps } from 'antd';
import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Form, Checkbox, Button, Input } from 'antd';
import useAuthenticationStore from '@/store/useAuthenticationStore';
import { AuthenticationState } from '../../../store/useAuthenticationStore';

const { Header, Content, Footer, Sider } = Layout;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};



const Signin: React.FC = () => {
  const form = Form.useForm();
  const {
    isAuthenticated,
    login,
    logout,
    user
  } = useAuthenticationStore((AuthenticationState) => AuthenticationState);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    login({
      username: values?.username || '',
      password: values?.password || ''
    });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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