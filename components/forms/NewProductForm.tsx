"use client";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormFieldComponent from "../FormField";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useSideNav } from "@/contexts/SideNavContext";
import toast from "react-hot-toast";
//.url("Please provide a valid image URL")

const FormSchema = z.object({
  name: z
    .string()
    .min(1, "Product Name is required")
    .max(100, "Product Name must be less than 100 characters"),
  image: z.string().optional(),
  category: z.string().min(1, "Product Category is required"),
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
  barcode: z
    .string()
    .min(1, "Product Barcode is required")
    .max(50, "Product Barcode must be less than 50 characters"),
});

const NewProductForm = () => {
  const { closeProductModal } = useSideNav();
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      image: "",
      category: "",
      sku: "",
      stockQuantity: 0,
      unitSellingPrice: 0,
      unitCostPrice: 0,
      lowStockThreshold: 0,
      barcode: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create product");
      setLoading(false);
      closeProductModal();
      toast.success("Product Added");
      // SWR will automatically update when socket emits 'productCreated'
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
          {/* {error && (
            <p className="text-sm mb-1 text-red-500 text-center">{error}</p>
          )} */}
          <div className="space-y-8">
            <FormFieldComponent
              form={form}
              name="name"
              label="Product Name"
              placeholder="Enter product name"
              className="bg-gray-100 placeholder:text-sm placeholder:text-text-2"
            />
            <FormFieldComponent
              form={form}
              name="image"
              label="Product Image"
              placeholder="Select Product Image"
              className="bg-gray-100 placeholder:text-sm placeholder:text-text-2"
              formType="image"
            />
            <div className="grid grid-cols-2 gap-3">
              <FormFieldComponent
                form={form}
                name="category"
                label="Product Category"
                placeholder="Select Category"
                className="bg-gray-100 placeholder:text-sm placeholder:text-text-2"
                formType="select"
              />
              <FormFieldComponent
                form={form}
                name="sku"
                label="SKU"
                placeholder="Enter SKU"
                className="bg-gray-100 placeholder:text-sm placeholder:text-text-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormFieldComponent
                form={form}
                name="stockQuantity"
                label="Stock Quantity"
                placeholder="Enter Stock Quantity"
                className="bg-gray-100 placeholder:text-sm placeholder:text-text-2"
                type="number"
              />
              <FormFieldComponent
                form={form}
                name="lowStockThreshold"
                label="Low Stock Threshold"
                placeholder="Enter Low Stock Threshold"
                className="bg-gray-100 placeholder:text-sm placeholder:text-text-2"
                type="number"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormFieldComponent
                form={form}
                name="unitSellingPrice"
                label="Unit Seling Price"
                placeholder="Enter Unit Selling Price"
                className="bg-gray-100 placeholder:text-sm placeholder:text-text-2"
                type="number"
              />
              <FormFieldComponent
                form={form}
                name="unitCostPrice"
                label="Unit Cost Price"
                placeholder="Enter Unit Cost Price"
                className="bg-gray-100 placeholder:text-sm placeholder:text-text-2"
                type="number"
              />
            </div>
            <FormFieldComponent
              form={form}
              name="barcode"
              label="Product Barcode"
              placeholder="Enter Product Barcode"
              className="bg-gray-100 placeholder:text-sm placeholder:text-text-2"
            />
            <button
              className="btn1 h-[48px] myFlex disabled:cursor-not-allowed"
              disabled={loading}
              type="submit"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Add Product"}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewProductForm;
