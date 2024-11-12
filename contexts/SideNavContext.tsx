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
}

// Create the context
const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

// Provider component
export const SideNavProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const openNav = () => setIsOpen(true);
  const closeNav = () => setIsOpen(false);
  const openMobileNav = () => setIsMobileOpen(true);
  const closeMobileNav = () => setIsMobileOpen(false);

  return (
    <SideNavContext.Provider
      value={{
        isOpen,
        openNav,
        closeNav,
        isMobileOpen,
        openMobileNav,
        closeMobileNav,
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
