import { NextApiRequest, NextApiResponse } from "next";
import { MongoServerError } from "mongodb";
import { Server as SocketIOServer } from "socket.io";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/utils/models/Product";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: {
      io?: SocketIOServer;
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (req.method === "POST") {
    try {
      const {
        name,
        image,
        category,
        sku,
        stockQuantity,
        unitSellingPrice,
        unitCostPrice,
        lowStockThreshold,
        barcode,
      } = req.body;

      // Connect to the database
      await connectToDatabase();

      // Create the new product
      const newProduct = new Product({
        name,
        image,
        category,
        sku,
        stockQuantity,
        unitSellingPrice,
        unitCostPrice,
        lowStockThreshold,
        barcode,
      });
      await newProduct.save();

      // Send POST request to external Socket.IO server to emit event
      const SOCKET_SERVER_URL = "https://socket-k4ex.onrender.com";

      try {
        await fetch(`${SOCKET_SERVER_URL}/emit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ event: "productCreated", data: newProduct }), // Send the new product to the Socket.IO server
        });

        console.log("New product emitted via Socket.IO server");
      } catch (emitError) {
        console.error("Failed to emit to Socket.IO server:", emitError);
      }

      // Return success response
      return res
        .status(200)
        .json({ message: "Product created", product: newProduct });
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        // Handle duplicate key error
        const duplicateField = Object.keys(error.keyValue)[0]; // Extract the field name causing the conflict
        const duplicateValue = error.keyValue[duplicateField]; // Extract the duplicate value

        return res.status(400).json({
          error: `Duplicate key error: The ${duplicateField} "${duplicateValue}" already exists.`,
        });
      }

      // For other errors
      console.error("Unexpected error:", error);
      return res.status(500).json({ error: "Failed to create product" });
    }
  } else if (req.method === "GET") {
    try {
      // Connect to the database
      await connectToDatabase();
      const { query } = req.query;

      // Build the search criteria
      let filter = {};
      if (query) {
        filter = {
          $or: [
            { name: { $regex: query, $options: "i" } }, // Case-insensitive search for name
            { sku: { $regex: query, $options: "i" } },
            { barcode: { $regex: query, $options: "i" } }, // Add barcode search
          ],
        };
      }

      // Fetch matching products
      const products = await Product.find(filter);
      if (!products.length) {
        return res.status(404).json({ error: "No products found." });
      }

      return res.status(200).json({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).json({ message: "Method not allowed" });
  }
}
