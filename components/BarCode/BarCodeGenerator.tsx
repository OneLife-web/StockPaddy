"use client";
import JsBarcode from "jsbarcode";
import { useRef, useEffect } from "react";

const BarcodeGenerator = ({ sku }: { sku: string }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    JsBarcode(barcodeRef.current, sku, {
      format: "CODE128", // Barcode format
      displayValue: true, // Show text below barcode
      fontSize: 18,
    });
  }, [sku]);

  return <svg ref={barcodeRef}></svg>; // SVG barcode
};

export default BarcodeGenerator;
