import { useState } from "react";

// Define the parameters for the fetch
interface FetchParams {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE"; // Allowed HTTP methods
  body?: any; // Request body (for POST/PUT methods)
  headers?: HeadersInit; // Optional headers
}

const useFetch = ({ url, method = "GET", headers = {} }: FetchParams) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async (body: any = null) => {
    setLoading(true);
    setError(null); // Reset error state on new fetch

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: method === "GET" ? null : JSON.stringify(body), // Only stringify body for POST/PUT
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        const errorMessage =
          result?.error || response.statusText || "Unknown error";
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData }; // Expose fetchData
};

export default useFetch;
