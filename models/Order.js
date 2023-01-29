import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    }
  },
  { timestamps: true ,collection:"order-data"}
);

export default mongoose.model("Order", OrderSchema);










