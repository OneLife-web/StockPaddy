"use client";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormFieldComponent from "../FormField";
//import { useState } from "react";
//import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  productName: z
    .string()
    .min(1, "Product Name is required")
    .max(100, "Product Name must be less than 100 characters"),
  productImage: z.string().url("Please provide a valid image URL").optional(),
  productCategory: z.string().min(1, "Product Category is required"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .max(50, "SKU must be less than 50 characters"),
  stockQuantity: z
    .number()
    .int()
    .min(0, "Stock Quantity cannot be negative")
    .optional(),
  unitSellingPrice: z
    .number()
    .min(0, "Unit Selling Price must be zero or greater"),
  unitCostPrice: z
    .number()
    .min(0, "Product Cost Price must be zero or greater"),
  lowStockThreshold: z
    .number()
    .int()
    .min(0, "Reorder Threshold cannot be negative")
    .optional(),
  productBarcode: z
    .string()
    .min(1, "Product Barcode is required")
    .max(50, "Product Barcode must be less than 50 characters"),
});

const NewProductForm = ({ handleUpload }: { handleUpload: () => void }) => {
  /*   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); */
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productName: "",
      productImage: "",
      productCategory: "",
      sku: "",
      stockQuantity: 0,
      unitSellingPrice: 0,
      unitCostPrice: 0,
      lowStockThreshold: 0,
      productBarcode: "",
    },
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpload)} className="mt-10">
          {/* {error && (
            <p className="text-sm mb-1 text-red-500 text-center">{error}</p>
          )} */}
          <div className="space-y-8">
            <FormFieldComponent
              form={form}
              name="productName"
              label="Product Name"
              placeholder="Enter product name"
              className="bg-gray-100 placeholder:text-sm"
            />
            <FormFieldComponent
              form={form}
              name="productImage"
              label="Product Image"
              placeholder="Select Product Image"
              className="bg-gray-100 placeholder:text-sm"
            />
            <div className="grid grid-cols-2 gap-3">
              <FormFieldComponent
                form={form}
                name="productCategory"
                label="Product Category"
                placeholder="Select Product Category"
                className="bg-gray-100 placeholder:text-sm"
              />
              <FormFieldComponent
                form={form}
                name="sku"
                label="SKU"
                placeholder="Enter SKU"
                className="bg-gray-100 placeholder:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormFieldComponent
                form={form}
                name="stockQuantity"
                label="Stock Quantity"
                placeholder="Enter Stock Quantity"
                className="bg-gray-100 placeholder:text-sm"
              />
              <FormFieldComponent
                form={form}
                name="lowStockThreshold"
                label="Low Stock Threshold"
                placeholder="Enter Low Stock Threshold"
                className="bg-gray-100 placeholder:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormFieldComponent
                form={form}
                name="unitSellingPrice"
                label="Unit Seling Price"
                placeholder="Enter Unit Selling Price"
                className="bg-gray-100 placeholder:text-sm"
              />
              <FormFieldComponent
                form={form}
                name="unitCostPrice"
                label="Unit Cost Price"
                placeholder="Enter Unit Cost Price"
                className="bg-gray-100 placeholder:text-sm"
              />
            </div>
            <FormFieldComponent
              form={form}
              name="productBarcode"
              label="Product Barcode"
              placeholder="Enter Product Barcode"
              className="bg-gray-100 placeholder:text-sm"
            />
            <button
              className="btn1 h-[48px] myFlex disabled:cursor-not-allowed"
              /* disabled={loading} */
              type="submit"
            >
              Add Product
              {/* {loading ? <Loader2 className="animate-spin" /> : "Add Product"} */}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewProductForm;
