import { NextApiRequest, NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import http from "http";
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
  // Initialize Socket.IO if not already initialized
  if (!res.socket.server.io) {
    console.log("Initializing new Socket.IO server...");
    
    // Ensure that we are passing the raw HTTP server
    const io = new SocketIOServer(res.socket.server as unknown as http.Server); 
    res.socket.server.io = io;

    // Handle new connections
    io.on("connection", () => {
      console.log("A user connected");
    });
  }

  if (req.method === "POST") {
    try {
      const { name } = req.body;

      // Connect to the database
      await connectToDatabase();

      // Create the new product
      const newProduct = new Product({ name });
      await newProduct.save();

      // Emit the new product event to all connected clients
      const io = res.socket.server.io;
      io.emit("productCreated", newProduct); // Notify clients about the new product
      console.log("New product emitted via Socket.IO");

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