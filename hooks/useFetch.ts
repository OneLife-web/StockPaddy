import { useState } from "react";
import toast from "react-hot-toast";

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
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      // Show success message and log data
      toast.success("Sign up successful!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData }; // Expose fetchData
};

export default useFetch;
