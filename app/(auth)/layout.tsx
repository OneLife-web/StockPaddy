import Image from "next/image";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen flex">
      <Image
        src="/bg.jpg" // Replace with your image path
        alt="Background"
        layout="fill"
        objectFit="cover"
      />
      <div className="lg:basis-[55%] w-full glassmorphism min-h-screen max-lg:px-[3%] px-[7%] backdrop-blur-lg bg-white">
        {children}
      </div>
    </div>
  );
};

export default layout;
