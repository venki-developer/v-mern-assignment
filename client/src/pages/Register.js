import React from 'react'
import {  Form, message} from 'antd';
import '../resources/global.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import Navbar from '../components/Navbar';
const Register = () => {

  const [form] = Form.useForm();
   const dispatch = useDispatch();
   const navigate = useNavigate();
  const onFinish = async(values)=>{
    try{
      dispatch(ShowLoading());
      const response = await axios.post('https://voosh-api.onrender.com/api/users/add-user',values);
      dispatch(HideLoading());
      // console.log(response.data)
      if(response.data.success) {
        message.success(response.data.message);
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
        <h1 className="text-lg">Register</h1>
        <hr />
            <Form layout='vertical' initialValues={{ email: '', password: '' }} form={form} onFinish={onFinish}>
                <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
                    <input type="text"/>
                </Form.Item>
                <Form.Item label='Phone' name='phone' rules={[{ required: true, message: 'Please input your phone number!' }, { len: 10, message: 'Phone number must be 10 digits long' }]}>
                    <input type="text"/>
                </Form.Item>
                <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' } ]}>
                    <input type="password" />
                </Form.Item>
                <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/login">Click Here To Login</Link>
            <button className='sec-btn' type="submit">
              Register
            </button>
          </div>
            </Form>
        </div>
    </div>
    </>
  )
}

export default Register