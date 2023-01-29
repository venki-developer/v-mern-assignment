import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Form, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { HideLoading, ShowLoading } from '../redux/alertsSlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const Home = () => {
  const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const user = localStorage.getItem('token');
    useEffect(()=>{
      if (localStorage.getItem('token') === null) {
        window.location.reload();
      }
    })
    const onFinish = async(values)=>{
      console.log(values);
      try{
        dispatch(ShowLoading());
        const res = await axios.post('http://localhost:4000/api/users/get-user-by-id',{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        if(res.data.success){
          const response = await axios.post('http://localhost:4000/api/orders/add-order',{...values,userId:res.data.data._id});
          console.log(response.data)
          dispatch(HideLoading());
          if(response.data.success)
          {
            message.success(response.data.message);
            navigate('/')
          }else{
            message.error({content:"Something went wrong"});
            navigate('/')
          }

        }else{
          localStorage.clear();
          message.error({content:"User not authorized to perform this action"});
          navigate("/login");
        }
      
      }catch(error){
        message.error(error.message);
      }
        
    }
  return (
    <>
    <Navbar/>
    <div className='h-screen d-flex justify-content-center align-items-center flex-column'>
    <div><Link to='/get-order-details'>Click here to get the order details</Link></div>
    <div className='w-400 card p-3'>
    <h1 className="text-lg">Place an order</h1>
    <hr />
        <Form layout='vertical' form={form} onFinish={onFinish}>
            <Form.Item label='Subtotal' name='subtotal'>
                <input type="number"/>
            </Form.Item>
            <Form.Item label='Phone' name='phone'>
                <input type="text"/>
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center my-3">
        <button className='pri-btn' type="submit" >
          Submit
        </button>
      </div>
        </Form>
    </div>
</div>
    
    </>
  )
}

export default Home