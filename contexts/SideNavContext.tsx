"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
}

// Create the context
const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

// Provider component
export const SideNavProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const openNav = () => setIsOpen(true);
  const closeNav = () => setIsOpen(false);
  const openMobileNav = () => setIsMobileOpen(true);
  const closeMobileNav = () => setIsMobileOpen(false);
  const openProductModal = () => setIsProductModalOpen(true);
  const closeProductModal = () => setIsProductModalOpen(false);

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
