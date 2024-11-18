"use client";
import BarcodeScanner from "@/components/BarCode/BarCodeScanner";

const POSPage = () => {
  const handleScan = (data: string) => {
    console.log("Scanned data:", data);
    // You can add additional logic here to handle the scanned data
  };
  return (
    <div>
      <h1>My POS</h1>
      <BarcodeScanner onScan={handleScan} />
    </div>
  );
};

export default POSPage;
