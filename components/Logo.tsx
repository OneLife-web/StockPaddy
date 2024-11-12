import { ImageProps } from "@/types";
import Image from "next/image";
import React from "react";

const handleLogoVariant = (
  variant: number,
  width: number,
  height: number,
  className?: string
) => {
  switch (variant) {
    case 1:
      return (
        <Image
          src="/logo.png"
          width={width}
          height={height}
          alt="Logo"
          className={className}
        />
      );
    case 2:
      return (
        <Image
          src="/logo2.png"
          width={width}
          height={height}
          alt="Logo"
          className={className}
        />
      );

    default:
      break;
  }
};

const Logo = ({ variant, width, height, className }: ImageProps) => {
  return (
    <div>
      {handleLogoVariant(variant, height, width, className)}
    </div>
  );
};

export default Logo;
