"use client";
import BarcodeScanner from "@/components/BarCode/BarCodeScanner";
import { useState } from "react";

const POSPage = () => {
  const [barCodeData, setBarCodeData] = useState("");
  const handleScan = (data: string) => {
    console.log("Scanned data:", data);
    setBarCodeData(data);
    // You can add additional logic here to handle the scanned data
  };
  return (
    <div className="pageContainer">
      <h1>My POS</h1>
      <BarcodeScanner onScan={handleScan} />
      <p>{barCodeData}</p>
    </div>
  );
};

export default POSPage;
