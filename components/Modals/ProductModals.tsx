"use client";
import { useSideNav } from "@/contexts/SideNavContext";
import { Upload, X } from "lucide-react";
import { useEffect, useState } from "react";

const ProductModals = () => {
  const { isProductModalOpen, closeProductModal } = useSideNav();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isProductModalOpen) {
      setIsVisible(true); // Show the modal with animation
    }
  }, [isProductModalOpen]);

  const handleClose = () => {
    setIsVisible(false); // Trigger the closing animation
    setTimeout(() => {
      closeProductModal(); // Close after animation completes
    }, 100); // Match the animation duration (150ms)
  };

  return (
    <>
      {isProductModalOpen && (
        <div
          onClick={handleClose}
          className="fixed top-0 bottom-0 z-30 right-0 left-0 bg-black/60 flex items-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`h-[95%] bg-white w-[100vw] rounded-tr-3xl rounded-tl-3xl relative px-[3%] ${
              isVisible ? "animate-modal-slide-up" : "animate-modal-slide-down"
            }`}
          >
            <div className="flex py-4 justify-between">
              <button className="flex flex-col items-center justify-center gap-1">
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
