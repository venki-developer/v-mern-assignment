import User from "../models/User.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt  from "jsonwebtoken";


dotenv.config({path:'./.env'})

//register user
export const register = async (req, res) => {
    try {
      const existingUser = await User.findOne({ phone: req.body.phone });
      if (existingUser) {
        return res.send({
          message: "User already registered",
          success: false,
          data: null,
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      const newUser = new User({
        ...req.body,
        password: hashedPassword,
      });
      await newUser.save();
  
      return res.send({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  };

//user login
export const login = async (req, res) => {
    try {
      const user = await User.findOne({ phone: req.body.phone });
      if (!user) {
        return res.send({
          message: "User does not exist",
          success: false,
          data: null,
        });
      } else {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          return res.send({
            message: "Incorrect password",
            success: false,
            data: null,
          });
        }
  
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.send({
          message: "User logged in successfully",
          success: true,
          data: token,
          userId:user._id
        });
      }
    } catch (error) {
      res.send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  };


  export const getUser = async(req, res) => {
    try {
      console.log(req.body);
      const user = await User.findById(req.body.userId);
      res.send({
        message: "User fetched successfully",
        success: true,
        data: user,
      });
    }catch(error) {
      res.send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  };
