import { ReactNode } from "react";

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
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

export interface ImageProps {
  variant: 1 | 2;
  width: number;
  height: number;
  className?: string;
}

// TypeScript types for the props
export interface CardProps {
  title: string;
  value: string | number;
  chartOptions: ApexCharts.ApexOptions; // Using ApexCharts options type
  chartSeries: ApexAxisChartSeries; // Using ApexCharts series type
}