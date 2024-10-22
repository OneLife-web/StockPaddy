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
  _id: string
  name: string
  /* quantity: number
  price: number
  createdAt: Date
  updatedAt: Date */
}