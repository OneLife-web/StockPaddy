"use client";
import Papa from "papaparse";
import { useSideNav } from "@/contexts/SideNavContext";
import { Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Product } from "@/types";

const ProductModals = () => {
  const { isProductModalOpen, closeProductModal } = useSideNav();
  const [isVisible, setIsVisible] = useState(false);
  const [csvData, setCsvData] = useState<Product[] | null>(null);

  useEffect(() => {
    if (isProductModalOpen) {
      setIsVisible(true); // Show the modal with animation
    }
  }, [isProductModalOpen]);

  const handleClose = () => {
    setIsVisible(false); // Trigger the closing animation
    setTimeout(() => {
      closeProductModal(); // Close after animation completes
    }, 150); // Match the animation duration (150ms)
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Safely access the first file
    if (file) {
      Papa.parse(file, {
        header: true, // Map headers to keys
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<Product>) => {
          // Use a proper type here
          setCsvData(results.data);
          console.log("Parsed CSV Data:", results.data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };

  const handleUpload = async () => {
    if (!csvData) {
      alert("Please upload a CSV file first!");
      return;
    }

    /*  try {
      const response = await axios.post("/api/upload-csv", { data: csvData });
      console.log("Response from server:", response.data);
      alert("CSV uploaded successfully!");
    } catch (error) {
      console.error("Error uploading CSV:", error);
      alert("Failed to upload CSV.");
    } */
  };

  return (
    <>
      {isProductModalOpen && (
        <div
          onClick={handleClose}
          className={`fixed top-0 opacity-0 translate-y-[100%] bottom-0 z-30 right-0 left-0 bg-black/60 flex items-end ${
            isVisible ? "animate-modal-slide-up" : "animate-modal-slide-down"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`h-[95%] bg-white w-[100vw] rounded-tr-3xl rounded-tl-3xl relative px-[3%]`}
          >
            <div className="flex py-4 justify-between">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="mt-2 border rounded p-2"
              />
              <button
                onClick={handleUpload}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                <Upload strokeWidth={1.3} size={24} />
                <p className="max-md:text-xs text-sm">Upload CSV</p>
              </button>
              <button onClick={handleClose}>
                <X strokeWidth={1.3} size={30} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModals;
