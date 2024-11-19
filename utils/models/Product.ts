import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, default: "" },
    category: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    stockQuantity: { type: Number, default: 0 },
    unitSellingPrice: { type: Number, required: true },
    unitCostPrice: { type: Number, required: true },
    lowStockThreshold: { type: Number, default: 0 },
    barcode: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
