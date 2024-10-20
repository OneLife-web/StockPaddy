import Image from "next/image";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen flex">
      <Image
        src="/bg.jpg" // Replace with your image path
        alt="Background"
        fill
        style={{ objectFit: "cover" }}
      />
      <div className="lg:basis-[55%] w-full glassmorphism h-screen lg:overflow-y-scroll lg:custom-scrollbar max-lg:px-[5%] px-[7%] backdrop-blur-lg bg-white">
        {children}
      </div>
    </div>
  );
};

export default layout;
