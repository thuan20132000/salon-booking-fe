'use client';
import type { FormProps } from 'antd';
import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Form, Checkbox, Button, Input, Spin } from 'antd';
import useAuthenticationStore from '@/store/useAuthenticationStore';
import { AuthenticationState } from '../../../store/useAuthenticationStore';
import { useRouter } from 'next/navigation';
import Loader from "@/components/common/Loader";

const { Header, Content, Footer, Sider } = Layout;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};



const Signin: React.FC = () => {
  const router = useRouter();
  const {
    isAuthenticated,
    login,
    logout,
    user,
    isAuthenticating,
    setIsAuthenticating
  } = useAuthenticationStore((AuthenticationState) => AuthenticationState);

  const [form] = Form.useForm<FieldType>();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setIsAuthenticating(true);
      await login({
        username: values?.username || '',
        password: values?.password || ''
      });
      // router.refresh();
      console.log('Success:', values);

    } catch (error) {
      console.log('Failed:', error);

    } finally {
      setIsAuthenticating(false);
    };
  };

  const onLoginSubmit = () => {

  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Layout>
        <Spin spinning={isAuthenticating} fullscreen={true} />
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
                form={form}

              >
                <Form.Item<FieldType>
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                  initialValue={'jonatruong'}
                >
                  <Input defaultValue={'jonatruong'} />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  initialValue={'Thuan860012'}
                >
                  <Input.Password defaultValue={'Thuan860012'} />
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