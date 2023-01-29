import React from 'react'
import {  Form, message} from 'antd';
import '../resources/global.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import Navbar from '../components/Navbar';
const Register = () => {

  const [form] = Form.useForm();
   const dispatch = useDispatch();
  const onFinish = async(values)=>{
    try{
      dispatch(ShowLoading());
      const response = await axios.post('http://localhost:4000/api/users/add-user',values);
      dispatch(HideLoading());
      // console.log(response.data)
      if(response.data.success) {
        message.success(response.data.message);
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
                <Form.Item label='Name' name='name' >
                    <input type="text"/>
                </Form.Item>
                <Form.Item label='Phone' name='phone'>
                    <input type="text"/>
                </Form.Item>
                <Form.Item label='Password' name='password'>
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