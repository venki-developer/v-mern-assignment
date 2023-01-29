import React from 'react'
import { Form, message} from 'antd';
import { Link ,useNavigate} from 'react-router-dom';
import '../resources/global.css';
import { useDispatch } from 'react-redux';
import { HideLoading,ShowLoading } from '../redux/alertsSlice';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async(values) =>{
        try{

            dispatch(ShowLoading());
            const response = await axios.post('https://voosh-api.onrender.com/api/users/login-user',values);
            // console.log(response);
            dispatch(HideLoading());
            if(response.data.success) {
                message.success(response.data.message);
                localStorage.setItem("token", response.data.data);
                localStorage.setItem("userId", response.data.userId);
                navigate('/login');
              }else{
                message.error(response.data.message);
              }
        }catch(error){
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
  return (
    <>
    <Navbar/>
    <div className='h-screen d-flex justify-content-center align-items-center'>
        <div className='w-400 card p-3'>
        <h1 className="text-lg">Login</h1>
        <hr />
            <Form layout='vertical' initialValues={{ email: '', password: '' }} form={form} onFinish={onFinish}>
                <Form.Item label='Phone' name='phone' rules={[{ required: true, message: 'Please input your phone number!' }, { len: 10, message: 'Phone number must be 10 digits long' }]}>
                <input type="text" />
                </Form.Item>
                <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                <input type="password" />
                </Form.Item>
                <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/register">Click Here To Register</Link>
            <button className='pri-btn' type="submit" >
              Login
            </button>
          </div>
            </Form>
        </div>
    </div>
    </>
  )
}

export default Login