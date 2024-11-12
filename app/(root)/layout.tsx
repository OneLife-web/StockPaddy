import Header from "@/components/Navigation/Header";
import SideNav from "@/components/Navigation/SideNav";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <SideNav />
      {children}
    </div>
  );
};

export default Layout;
