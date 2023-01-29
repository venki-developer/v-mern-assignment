import Order from '../models/Order.js';
import mongoose from 'mongoose';
export const addOrder = async(req,res)=>{
    try{
        const order = await Order.create(req.body);
        return res.send({
        message: "Order created successfully",
        success: true,
        data: order,
      });

    }catch(error){
        res.send({
            message: error.message,
            success: false,
            data: null,
          });

    }
}

export const getOrderById = async(req, res)=>{
   try{
    const order = await Order.find({userId:req.params.userId});
    if(!order){
        return res.send({
            message: "Order not found",
            success: false,
            data: null,
          });
    }

    return res.send({
        message:"Order fetched successfully",
        success: true,
        data:order
    });

   }catch(error){
    res.send({
        message: error.message,
        success: false,
        data: null,
      });

   }


}