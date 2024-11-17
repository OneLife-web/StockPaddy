"use client";
import { useSideNav } from "@/contexts/SideNavContext";
import { Upload, X } from "lucide-react";

const ProductModals = () => {
  const { isProductModalOpen, closeProductModal } = useSideNav();

  return (
    <>
      {isProductModalOpen && (
        <div
          onClick={closeProductModal}
          className="fixed top-0 bottom-0 z-30 right-0 left-0 bg-black/60 flex items-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`h-[95%] bg-white w-[100vw] opacity-0 translate-y-[100%] rounded-tr-3xl rounded-tl-3xl relative px-[3%] ${
              isProductModalOpen
                ? "animate-modal-slide-up"
                : "animate-modal-slide-down"
            }`}
          >
            <div className="flex py-4 justify-between">
              <button className="flex flex-col items-center justify-center gap-1">
                <Upload strokeWidth={1.3} size={24} />
                <p className="max-md:text-xs text-sm">Upload CSV</p>
              </button>
              <button onClick={closeProductModal}>
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
