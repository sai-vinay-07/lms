require('dotenv').config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Webhook } from "svix";
import User from "./modules/User.js";

const app = express();

// MongoDB connection setup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.log("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Clerk webhook handler
const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = req.body;
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const event = await whook.verify(payload, headers);
    const { data, type } = event;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email_addresses?.[0]?.email_address,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        console.log("✅ User created:", userData);
        return res.status(200).json({ status: "user.created handled" });
      }

      case "user.updated": {
        const updatedUserData = {
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email_addresses?.[0]?.email_address,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, updatedUserData, { new: true });
        console.log("✏️ User updated:", updatedUserData);
        return res.status(200).json({ status: "user.updated handled" });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted:", data.id);
        return res.status(200).json({ status: "user.deleted handled" });
      }

      default:
        console.log("ℹ️ Unhandled webhook event:", type);
        return res.status(200).json({ status: "ignored" });
    }
  } catch (error) {
    console.error("❌ Webhook verification failed:", error.message);
    return res.status(400).send("Invalid webhook");
  }
};

const startServer = async () => {
  try {
    await connectDB();
    app.use(express.json({ type: "*/*" }));
    app.use(cors({
      origin: 'http://localhost:5173', // Vite default port
      credentials: true
    }));

    // Clerk webhook endpoint
    app.post("/api/webhooks/clerk", clerkWebhooks);

    app.get("/", (req, res) => {
      res.send("<h1>This is Base Router</h1>");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();

