import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {  Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import axios from 'axios';
import { message,Form} from 'antd';

const OrderDetails = () => {
    const [user,setUser] = useState('');
    const [data,setData] = useState([]);
    
    useEffect(
        ()=>{
            setUser(localStorage.getItem("userId"));


        }
    ,[])
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async(values) =>{
        try{

            dispatch(ShowLoading());
            const response = await axios.get(`http://localhost:4000/api/orders/get-order/${values.userId}`);
            console.log(response.data);
            dispatch(HideLoading());
            if(response.data.success) {
                message.success(response.data.message);
                setData(response.data.data);
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
    <div className='h-screen d-flex justify-content-center align-items-center flex-column'>
    <div>Logged in user ID:{user}</div>
    <div className='w-600 card p-3'>
    <h1 className="text-lg">Place an order</h1>
    <hr />
        <Form layout='vertical' form={form} onFinish={onFinish}>
            <Form.Item label='User ID' name='userId'>
                <input type="text"/>
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center my-3">
        <button className='pri-btn' type="submit" >
          Submit
        </button>
      </div>
        </Form>
        {data.length>0&&<>
        <div className='w-100'>
        <div className='d-flex justify-content-between align-items-center'>
        <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th >OrderId</th>
            <th >Phone No</th>
            <th >Order Amount</th>
          </tr>
          </thead>
          <tbody>{
         data.map((item, _id)=>(
                <tr key={_id}>
                    <td>{item._id}</td>
                    <td>{item.phone}</td>
                    <td>{item.subtotal}</td>
                </tr>
            ))}
            </tbody>
          </table>
          </div>
          </div>
          </>
        }
    </div>
</div>
    </>
  )
}

export default OrderDetails