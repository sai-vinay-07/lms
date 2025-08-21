import { Webhook } from "svix";
import User from "../modules/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    // 1. Verify webhook
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // 2. Get event data
    const { data, type } = req.body;

    // 3. Switch on event type
    switch (type) {
      // 🟢 Create user
      case "user.created": {
        const userData = {
          _id: data.id, // Clerk’s user ID becomes our DB ID
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          imageUrl: data.image_url,
        };

        await User.create(userData);
        console.log("✅ User created:", userData);
        res.json({ status: "user.created handled" });
        break;
      }

      // 🟡 Update user
      case "user.updated": {
        const updatedUserData = {
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, updatedUserData, { new: true });
        console.log("✏️ User updated:", updatedUserData);
        res.json({ status: "user.updated handled" });
        break;
      }

      // 🔴 Delete user
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted:", data.id);
        res.json({ status: "user.deleted handled" });
        break;
      }

      default:
        console.log("ℹ️ Unhandled webhook event:", type);
        res.json({ status: "ignored" });
        break;
    }
  } catch (error) {
    console.error("❌ Webhook verification failed:", error);
    res.status(400).send("Invalid webhook");
  }
};
