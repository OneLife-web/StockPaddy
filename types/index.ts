import { ReactNode } from "react";

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string | number) => void;
  type?: string;
  className?: string;
  icon?: ReactNode;
}

export interface Product {
  _id: string;
  name: string;
  /* quantity: number
  price: number
  createdAt: Date
  updatedAt: Date */
}

export type MyProduct = {
  name: string;
  price: number;
  stock: number;
};


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
  actor: string,
  action: string,
  timestamp: string
}