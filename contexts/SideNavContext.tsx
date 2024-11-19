"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the context type
interface SideNavContextType {
  isOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  isMobileOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  isProductModalOpen: boolean;
  openProductModal: () => void;
  closeProductModal: () => void;
  isSalesModalOpen: boolean;
  openSalesModal: () => void;
  closeSalesModal: () => void;
}

// Create the context
const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

// Provider component
export const SideNavProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);

  useEffect(() => {
    if (isProductModalOpen || isSalesModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isProductModalOpen, isSalesModalOpen]);

  const openNav = () => setIsOpen(true);
  const closeNav = () => setIsOpen(false);
  const openMobileNav = () => setIsMobileOpen(true);
  const closeMobileNav = () => setIsMobileOpen(false);
  const openProductModal = () => setIsProductModalOpen(true);
  const closeProductModal = () => setIsProductModalOpen(false);
  const openSalesModal = () => setIsSalesModalOpen(true);
  const closeSalesModal = () => setIsSalesModalOpen(false);

  return (
    <SideNavContext.Provider
      value={{
        isOpen,
        openNav,
        closeNav,
        isMobileOpen,
        openMobileNav,
        closeMobileNav,
        isProductModalOpen,
        openProductModal,
        closeProductModal,
        isSalesModalOpen,
        openSalesModal,
        closeSalesModal,
      }}
    >
      {children}
    </SideNavContext.Provider>
  );
};

// Hook to use the context
export const useSideNav = () => {
  const context = useContext(SideNavContext);
  if (!context) {
    throw new Error("useSideNav must be used within a SideNavProvider");
  }
  return context;
};
