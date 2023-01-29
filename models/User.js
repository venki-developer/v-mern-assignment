import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:[true,"Please Enter the username"]
    },
    phone: {
      type: String,
      required:[true,"Please Enter the product Name"],
      unique: true
    },
    password: {
      type: String,
      required: [true,"Please Enter the password"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },{ collection:"user-voosh-data"}
);

const User = mongoose.model("User", UserSchema);

export default User;
