import { Webhook } from "svix";
import User from "../modules/User.js";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Clerk requires raw body (Buffer)
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
        return res.json({ status: "user.created handled" });
      }

      case "user.updated": {
        const updatedUserData = {
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email_addresses?.[0]?.email_address,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, updatedUserData, { new: true });
        console.log("✏️ User updated:", updatedUserData);
        return res.json({ status: "user.updated handled" });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted:", data.id);
        return res.json({ status: "user.deleted handled" });
      }

      default:
        console.log("ℹ️ Unhandled webhook event:", type);
        return res.json({ status: "ignored" });
    }
  } catch (error) {
    console.error("❌ Webhook verification failed:", error.message);
    res.status(400).send("Invalid webhook");
  }
};

export default clerkWebhooks;
