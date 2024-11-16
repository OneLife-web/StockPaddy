"use client";
import { useSideNav } from "@/contexts/SideNavContext";
import { useSwipeable } from "react-swipeable";

const ProductModals = () => {
  const { isProductModalOpen, closeProductModal } = useSideNav();
  const handlers = useSwipeable({
    onSwipedDown: () => {
      closeProductModal();
    },
  });

  return (
    <>
      {isProductModalOpen && (
        <div
          onClick={closeProductModal}
          className="fixed top-0 bottom-0 z-30 right-0 left-0 bg-black/60 flex items-end"
        >
          <div
            {...handlers}
            onClick={(e) => e.stopPropagation}
            className="h-[90%] bg-white w-[100vw] rounded-3xl relative"
          >
            <div className="w-16 h-2 rounded-full bg-zinc-200 absolute top-4 left-[50%] translate-x-[-50%]" />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModals;
