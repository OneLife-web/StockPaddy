"use client";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormFieldComponent from "../FormField";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Loader, Loader2, ScanBarcode, X } from "lucide-react";
import { useSideNav } from "@/contexts/SideNavContext";
import toast from "react-hot-toast";
import { ApiError, Product, SingleProduct } from "@/types";
import { Html5Qrcode } from "html5-qrcode";
import { SalesProductListTable } from "../Tables/SalesProductListTable";
//.url("Please provide a valid image URL")

const FormSchema = z.object({
  date: z.date(),
  products: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      sku: z.string(),
      unitCost: z.number(),
      quantity: z.number().min(1),
      stock: z.number(),
      lowStockThreshold: z.number(),
      discount: z.number().min(0).optional(),
    })
  ),
  attendedBy: z.string(),
  status: z.enum(["pending", "completed", "cancelled"]),
  discount: z.number().min(0).default(0),
});

const SalesForm = () => {
  const { closeSalesModal } = useSideNav();
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[] | []>([]);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
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

  const products: SingleProduct[] = form.getValues("products");

 /*  const handleInputChange = (index: number, value: number) => {
    updateQuantity(index, value || 1);
  }; */

  useEffect(() => {
    return () => {
      if (html5QrcodeRef.current) {
        html5QrcodeRef.current
          .stop()
          .then(() => html5QrcodeRef.current?.clear())
          .catch(console.error);
      }
    };
  }, []);

  const startScanner = async () => {
    if (isScannerActive) {
      toast.error("Scanner is already running");
      return;
    }
    try {
      const cameras = await Html5Qrcode.getCameras();
      if (!cameras || cameras.length === 0) {
        toast.error("No cameras found");
        return;
      }

      // Prefer back camera (last camera in the list)
      const backCameraId = cameras[cameras.length - 1].id;

      if (!scannerRef.current) {
        toast.error("Scanner container not found");
        return;
      }

      const container = scannerRef.current;
      const scannerId = "barcode-scanner-container";
      container.id = scannerId;

      container.style.display = "block";

      const html5QrcodeInstance = new Html5Qrcode(scannerId);

      const config = {
        fps: 10,
        qrbox: { width: 300, height: 300 },
      };

      // Disable verbose logging and error messages
      await html5QrcodeInstance.start(
        backCameraId,
        config,
        onScanSuccess,
        () => {
          // Empty error callback to suppress console warnings
          return;
        }
      );

      html5QrcodeRef.current = html5QrcodeInstance;
      setIsScannerActive(true);
    } catch (err) {
      console.error("Scanner Start Error:", err);
      toast.error("Could not start scanner");
    }
  };

  const stopScanner = async () => {
    try {
      if (html5QrcodeRef.current) {
        // Stop the scanner
        await html5QrcodeRef.current.stop();
        // Clear the scanner after stopping
        await html5QrcodeRef.current.clear();
        html5QrcodeRef.current = null; // Reset the instance
        setIsScannerActive(false);
      }
    } catch (err) {
      console.error("Stop Scanner Error:", err);
      toast.error("Failed to stop scanner.");
    }
  };

  const onScanSuccess = (decodedText: string) => {
    toast.success(`Scanned: ${decodedText}`);
    setQuery(decodedText);
  };

  // Add to existing component
  const addProductToForm = (product: Product) => {
    const currentProducts = form.getValues("products");

    // Check if product already exists to prevent duplicates
    const existingProductIndex = currentProducts.findIndex(
      (p) => p.id === product._id
    );

    if (existingProductIndex !== -1) {
      toast.error("Product already added");
      return;
    }

    form.setValue("products", [
      ...currentProducts,
      {
        id: product._id,
        name: product.name,
        sku: product.sku,
        unitCost: product.unitCostPrice,
        stock: product.stockQuantity,
        lowStockThreshold: product.lowStockThreshold,
        quantity: 1, // Default quantity
        discount: 0,
      },
    ]);

    // Clear search after adding
    setQuery("");
    setResults([]);
  };
/* 
  const removeProduct = (index: number) => {
    const products = form.getValues("products");
    products.splice(index, 1);
    form.setValue("products", products);
  };

  const updateQuantity = (index: number, value: number) => {
    const products = form.getValues("products");
    products[index].quantity = value;
    form.setValue("products", products);
  }; */

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
    setSearchLoading(true);
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
    } finally {
      setSearchLoading(false);
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
                    <X strokeWidth={1.5} size={20} />
                  ) : (
                    <ScanBarcode strokeWidth={1.5} size={20} />
                  )}
                </button>
              </div>
              {/**Create scanenr modal */}
              <div
                ref={scannerRef}
                className={`w-full mt-4 ${
                  isScannerActive ? "block" : "hidden"
                }`}
              />
              {/**Search Result */}
              <div className={`${!query ? "hidden" : "block min-h-[120px]"}`}>
                {searchLoading ? (
                  <div className="myFlex flex-col gap-1 h-full text-text-1 max-md:text-sm">
                    <Loader className="animate-spin" /> searching...
                  </div>
                ) : results.length > 0 ? (
                  <div className="pt-3 max-h-[350px] overflow-y-scroll no-scrollbar">
                    <h2 className="font-clashmd">Search Results:</h2>
                    <ul>
                      {results.map((product) => (
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
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="pt-3 myFlex h-full">
                    <p className="text-text-1 max-md:text-sm">
                      No products found
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Product List */}
            <div className="grid gap-2 lg:text-sm">
              <label className="font-clashmd">Selected Products</label>
              <SalesProductListTable products={products} />
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
