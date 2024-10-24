import { NextApiRequest, NextApiResponse } from "next";
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
      const { name } = req.body;

      // Connect to the database
      await connectToDatabase();

      // Create the new product
      const newProduct = new Product({ name });
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
        .status(201)
        .json({ message: "Product created", product: newProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({ error: "Failed to create product" });
    }
  } else if (req.method === "GET") {
    try {
      // Connect to the database
      await connectToDatabase();

      // Fetch all products
      const products = await Product.find({});

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
