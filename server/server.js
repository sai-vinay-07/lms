import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import clerkWebhooks from "./controlles/webhooks.js";
import userRoutes from "./routers/user.js";

const app = express();

const startServer = async () => {
  try {
    await connectDB();

    // Clerk webhook needs raw body
    app.use("/clerk", express.json({ type: "*/*" }), clerkWebhooks);

    app.use(express.json());
    app.use(cors());

    app.get("/", (req, res) => {
      res.send("<h1>This is Base Router</h1>");
    });

    app.use("/users", userRoutes);

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
