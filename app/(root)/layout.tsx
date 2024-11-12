import Header from "@/components/Navigation/Header";
import MobileSideNav from "@/components/Navigation/MobileSideNav";
import SideNav from "@/components/Navigation/SideNav";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <SideNav />
      <MobileSideNav/>
      {children}
    </div>
  );
};

export default Layout;
