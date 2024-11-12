import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Inventory & POS System",
    short_name: "InvenPOS",
    description: "Inventory Management and POS System",
    scope: "/",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/icon-192-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/29.png",
        sizes: "29x29",
        type: "image/png",
      },
      {
        src: "/icons/180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}