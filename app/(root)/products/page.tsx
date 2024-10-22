import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import AddProductForm from "@/components/forms/ProductForm";

// Server-side fetch to get the products
async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      cache: "no-store", // Disable caching to always get fresh data
    });

    if (!res.ok) {
      console.error("Error fetching products:", res.status, res.statusText);
      return []; // Return empty array on failure
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getProducts:", error);
    return []; // Return empty array on error
  }
}

export default async function Home() {
  const initialProducts = await getProducts(); // Fetch products on the server

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Inventory Management</h1>

      {/* Product Form */}
      <Suspense fallback={<div>Loading form...</div>}>
        <AddProductForm />
      </Suspense>

      {/* Product List */}
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList initialData={initialProducts} />
      </Suspense>
    </main>
  );
}
