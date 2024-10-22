import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: String,
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
