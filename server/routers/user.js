import express from "express";
import User from "../modules/User.js";

const router = express.Router();

// 🟢 Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟡 Get current user's enrolled courses
router.get("/:id/enrolled-courses", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.enrolledCourses || []);
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✏️ Update user profile
router.put("/:id", async (req, res) => {
  try {
    // Whitelist fields that are safe to update
    const allowedUpdates = ["name", "email", "imageUrl"];
    const updates = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
