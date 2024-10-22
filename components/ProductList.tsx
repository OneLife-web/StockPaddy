"use client";

import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { io, Socket } from "socket.io-client";
import { Product } from "@/types";

interface ProductListProps {
  initialData: Product[];
}

interface ApiResponse {
  products: Product[];
}

const fetcher = async (url: string): Promise<Product[]> => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data: ApiResponse = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
};

export default function ProductList({ initialData }: ProductListProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const {
    data: products,
    error,
    isLoading,
  } = useSWR<Product[]>("/api/products", fetcher, {
    fallbackData: initialData,
    refreshInterval: 0,
    revalidateOnFocus: false,
    shouldRetryOnError: true,
    dedupingInterval: 5000,
  });

  useEffect(() => {
    const initSocket = async () => {
      try {
        // Ensure the socket is ready by calling /api/socket first
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/socket`);

        const socketInstance = io(process.env.NEXT_PUBLIC_API_URL, {
          path: "/api/socket",
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        socketInstance.on("connect", () => {
          console.log("Socket connected");
          setIsConnecting(false);
        });

        socketInstance.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
          setIsConnecting(false);
        });

        socketInstance.on("productCreated", (newProduct: Product) => {
          console.log("New product received:", newProduct);
          mutate(
            "/api/products",
            (currentProducts: Product[] = []) => {
              if (currentProducts.some((p) => p._id === newProduct._id)) {
                return currentProducts;
              }
              return [...currentProducts, newProduct];
            },
            false
          );
        });

        setSocket(socketInstance);
      } catch (error) {
        console.error("Socket initialization failed:", error);
        setIsConnecting(false);
      }
    };

    initSocket();

    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, []);

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        <h2 className="text-lg font-semibold">Error loading products</h2>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  if (isLoading || isConnecting) {
    return (
      <div className="p-4 text-gray-500">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="p-4 text-gray-500 text-center">
        <p className="text-lg">No products available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product._id}
          className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold">{product.name}</h3>
          {/* Add more product details as needed */}
        </div>
      ))}
    </div>
  );
}
