"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the context type
interface SideNavContextType {
  isOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
}

// Create the context
const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

// Provider component
export const SideNavProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => setIsOpen(true);
  const closeNav = () => setIsOpen(false);

  return (
    <SideNavContext.Provider value={{ isOpen, openNav, closeNav }}>
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
