"use client";
import Papa from "papaparse";
import { useSideNav } from "@/contexts/SideNavContext";
import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MyProduct } from "@/types";
import NewProductForm from "../forms/NewProductForm";

const ProductModals = () => {
  const { isProductModalOpen, closeProductModal } = useSideNav();
  const [isVisible, setIsVisible] = useState(false);
  const [csvData, setCsvData] = useState<MyProduct[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
        complete: (results: Papa.ParseResult<MyProduct>) => {
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
          className={`fixed top-0 bottom-0 z-30 right-0 left-0 bg-black/60 flex items-end ${
            !isVisible && "animate-modal-slide-down"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`h-[95%] bg-white w-[100vw] rounded-tr-3xl rounded-tl-3xl relative ${
              isVisible && "animate-modal-slide-up"
            }`}
          >
            <div className="fixed bg-white z-20 right-0 left-0 top-0 rounded-tl-xl rounded-tr-xl flex px-[3%] py-4 justify-between">
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button onClick={handleButtonClick}>
                <Upload strokeWidth={1.5} size={26} />
              </button>
              <button onClick={handleClose}>
                <X strokeWidth={1.5} size={30} />
              </button>
            </div>
            <div className="h-[90vh] pt-12 pb-6 px-[3%] overflow-y-scroll no-scrollbar">
              <NewProductForm />
            </div>
            <button onClick={handleUpload} className="hidden"></button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModals;
