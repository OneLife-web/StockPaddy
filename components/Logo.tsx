import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="w-fit mx-auto">
      <Image src="/logo2.png" width={300} height={100} alt="Logo" />
    </div>
  );
};

export default Logo;
