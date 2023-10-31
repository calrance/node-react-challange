import { useNavigate } from '@tanstack/react-router';
import { Alert, Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { axiosPublic as axios } from '../api/axios';
import useAuth from '../hooks/useAuth';

function Login() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState<string>('');

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate({
        to: '/dashboard',
      });
    }
  }, [auth, navigate]);

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        '/auth',
        JSON.stringify({
          username: values.username,
          password: values.password,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      setAuth({
        username: values.username,
        password: values.password,
        accessToken,
        isAuthenticated: true,
      });
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg('No Server Response. Try again later.');
      } else if (err.response?.status === 400) {
        setErrMsg('Please input your Username or Password.');
      } else if (err.response?.status === 401) {
        setErrMsg('Your Username or Password is incorrect.');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  const onFinishFailed = (errorInfo: any) => {};

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  return (
    <>
      <div className='h-screen mx-auto container flex justify-center items-center'>
        <div>
          {errMsg !== '' && (
            <Alert
              message='Error'
              description={errMsg}
              type='error'
              className='mb-4'
              showIcon
            />
          )}
          <div className='border rounded-xl py-14 px-6 bg-white shadow-xl'>
            <div className='text-3xl text-center mb-8'>
              <h1>Log In</h1>
            </div>
            <Form
              name='basic'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Form.Item<FieldType>
                label='Username'
                name='username'
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label='Password'
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item className='flex justify-center'>
                <Button
                  className='min-w-[140px] uppercase'
                  type='primary'
                  htmlType='submit'
                >
                  Log In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
