"use client";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormFieldComponent from "../FormField";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, ScanBarcode, Trash, X } from "lucide-react";
import { useSideNav } from "@/contexts/SideNavContext";
import toast from "react-hot-toast";
import { ApiError, Product } from "@/types";
import { Html5Qrcode } from "html5-qrcode";
//.url("Please provide a valid image URL")

const FormSchema = z.object({
  date: z.date(),
  products: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      quantity: z.number().min(1),
      unitCost: z.number().min(0),
      discount: z.number().min(0).optional(),
    })
  ),
});

const SalesForm = () => {
  const { closeSalesModal } = useSideNav();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[] | []>([]);

  // Debounce state for tracking input delay
  const [debouncedQuery, setDebouncedQuery] = useState("");
  // const [error, setError] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
      products: [],
    },
  });

  const [isScannerActive, setIsScannerActive] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);

  const startScanner = () => {
    if (!scannerRef.current) return;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;
          html5QrcodeRef.current = new Html5Qrcode(scannerRef.current!.id);

          html5QrcodeRef.current
            .start(
              cameraId,
              { fps: 10, qrbox: 250 },
              onScanSuccess,
              (errorMessage) => {
                console.error("Scan Error:", errorMessage);
                toast.error(
                  "Failed to start scanner. Check camera permissions."
                );
              }
            )
            .catch((err) => {
              console.error("Start Error:", err);
              toast.error("Could not access camera. Please check permissions.");
            });

          setIsScannerActive(true);
        } else {
          toast.error("No cameras found");
        }
      })
      .catch((err) => {
        console.error("Camera Error:", err);
        toast.error("Failed to access cameras");
      });
  };

  const stopScanner = () => {
    if (html5QrcodeRef.current) {
      html5QrcodeRef.current.stop();
      html5QrcodeRef.current.clear();
      setIsScannerActive(false);
    }
  };

  const onScanSuccess = (decodedText: string) => {
    // Directly use the scanned barcode to search for product
    setQuery(decodedText);
    stopScanner();
  };

  // Add to existing component
  const addProductToForm = (product: Product) => {
    const currentProducts = form.getValues("products");

    // Check if product already exists to prevent duplicates
    const existingProductIndex = currentProducts.findIndex(
      (p) => p.code === product.sku
    );

    if (existingProductIndex !== -1) {
      toast.error("Product already added");
      return;
    }

    form.setValue("products", [
      ...currentProducts,
      {
        code: product.sku,
        name: product.name,
        quantity: 1, // Default quantity
        unitCost: product.unitCostPrice,
        discount: 0,
      },
    ]);

    // Clear search after adding
    setQuery("");
    setResults([]);
  };

  const removeProduct = (index: number) => {
    const products = form.getValues("products");
    products.splice(index, 1);
    form.setValue("products", products);
  };

  const updateQuantity = (index: number, value: number) => {
    const products = form.getValues("products");
    products[index].quantity = value;
    form.setValue("products", products);
  };

  // Debounce effect to update `debouncedQuery` after a delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Adjust the delay (in ms) as needed

    return () => clearTimeout(handler); // Cleanup timeout on component unmount or query change
  }, [query]);

  // Fetch products based on the debounced query
  const fetchProducts = useCallback(async (searchQuery: string) => {
    if (!searchQuery) {
      toast.error("Please enter a search term.");
      return;
    }

    try {
      const response = await fetch(`/api/products?query=${searchQuery}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data.products); // Update state with the fetched results
      } else {
        console.error(data.error || "Error fetching products");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, []);

  // Effect to trigger product fetching when `debouncedQuery` changes
  useEffect(() => {
    if (debouncedQuery) {
      fetchProducts(debouncedQuery);
    }
  }, [debouncedQuery, fetchProducts]);

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create product");
      setLoading(false);
      closeSalesModal();
      toast.success("Product Added");
      // SWR will automatically update when socket emits 'productCreated'
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating product:", error.message);
        toast.error(error.message);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "error" in error
      ) {
        const apiError = error as ApiError;
        console.error("API error:", apiError.error);
        toast.error(apiError.error);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
          {/* {error && (
            <p className="text-sm mb-1 text-red-500 text-center">{error}</p>
          )} */}
          <div className="space-y-8">
            <FormFieldComponent
              form={form}
              name="date"
              label="Date"
              formType="calendar"
            />
            <div className="grid gap-2 lg:text-sm">
              <label className="font-clashmd">Barcode / Search Product</label>
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Scan or search product by code or name"
                  className="rounded-lg w-full bg-gray-100 focus:ring-1 ring-orange-400 h-[48px] px-4 text-base focus:outline-none placeholder:text-sm"
                />
                <button
                  type="button"
                  onClick={isScannerActive ? stopScanner : startScanner}
                  className="absolute top-[50%] translate-y-[-50%] right-4 bg-white rounded-full p-1 myShadow"
                >
                  {isScannerActive ? (
                    <X />
                  ) : (
                    <ScanBarcode strokeWidth={1.5} size={18} />
                  )}
                </button>
              </div>
              {isScannerActive && (
                <div
                  id="scanner-container"
                  ref={scannerRef}
                  className="w-full h-[300px] mt-4"
                />
              )}
              <div>
                <h2>Results:</h2>
                <ul>
                  {results.length > 0
                    ? results.map((product) => (
                        <li
                          key={product._id}
                          className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => addProductToForm(product)}
                        >
                          {product.name} - {product.sku}
                          <button type="button" className="text-green-500">
                            + Add
                          </button>
                        </li>
                      ))
                    : query && (
                        <li className="text-gray-500">No products found</li>
                      )}
                </ul>
              </div>
            </div>
            {/* Product List */}
            <div className="mt-4 space-y-2">
              {form.getValues("products").map((product, index) => (
                <div
                  key={product.code}
                  className="flex items-center gap-2 border p-2 rounded"
                >
                  <span className="flex-1">{product.name}</span>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      updateQuantity(index, parseInt(e.target.value, 10) || 1)
                    }
                  />
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => removeProduct(index)}
                  >
                    <Trash />
                  </button>
                </div>
              ))}
            </div>
            <button
              className="btn1 h-[48px] myFlex disabled:cursor-not-allowed"
              disabled={loading}
              type="submit"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Add Sale"}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SalesForm;
