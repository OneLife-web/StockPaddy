import { ReactNode } from "react";

export interface ApiError {
  error: string;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string | number) => void;
  type?: string;
  className?: string;
  icon?: ReactNode;
}

export interface Product {
  _id: string; // Unique identifier
  name: string; // Product name
  image?: string; // URL for the product image (optional)
  category: string; // Product category
  sku: string; // Stock Keeping Unit, unique identifier
  stockQuantity: number; // Quantity in stock (optional, defaults to 0)
  unitSellingPrice: number; // Selling price per unit
  unitCostPrice: number; // Cost price per unit
  lowStockThreshold: number; // Minimum quantity before low-stock alert (optional)
  barcode: string; // Unique barcode for the product
  createdAt: Date; // Timestamp of product creation
  updatedAt: Date; // Timestamp of last update
}

export interface SingleProduct {
  id: string;
  name: string;
  sku: string;
  unitCost: number;
  quantity: number;
  discount?: number;
  stock: number;
  lowStockThreshold: number;
}

export interface ImageProps {
  variant: 1 | 2;
  width: number;
  height: number;
  className?: string;
}

// TypeScript types for the props
export interface CardProps {
  title: string;
  value: number;
  chartOptions: ApexCharts.ApexOptions; // Using ApexCharts options type
  chartSeries: ApexAxisChartSeries; // Using ApexCharts series type
}

export interface AuditType {
  actor: string;
  action: string;
  timestamp: string;
}
