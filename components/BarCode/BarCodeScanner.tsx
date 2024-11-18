"use client";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScanner = ({ onScan }: { onScan: (data: string) => void }) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader", // Div ID
      { fps: 10, qrbox: { width: 250, height: 250 } }, // Options
      false
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText); // Callback with the scanned barcode text
      },
      (error) => {
        setErrorMessage(error); // Handle errors
      }
    );

    // Cleanup function
    return () => {
      scanner.clear(); // Call clear but do not return its promise
    };
  }, [onScan]);

  return (
    <div>
      <div id="reader" style={{ width: "300px" }}></div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default BarcodeScanner;
