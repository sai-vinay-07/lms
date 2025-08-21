import express from "express";
import cors from "cors";
import "dotenv/config";   // ✅ silent dotenv
import connectDB from "./configs/mongodb.js";
import clerkWebhooks from './controlles/webhooks.js'

const app = express();

// ✅ connect DB first, then start server
const startServer = async () => {
  try {
    await connectDB();

    app.use(express.json());
    app.use(cors());

    //Routes
    app.get("/", (req, res) => {
      res.send("<h1>This is Base Router</h1>");
    });

    app.post('/clerk' , clerkWebhooks)


   //Port Declaration
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
