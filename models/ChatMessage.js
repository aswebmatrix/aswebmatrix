import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    sender: { type: String, enum: ["user", "bot"], required: true },
    text: { type: String, required: true },
    // Which FAQ button (if any) produced this message
    faqId: { type: mongoose.Schema.Types.ObjectId, ref: "Faq", default: null },
  },
  { timestamps: true }
);

export default mongoose.models.ChatMessage ||
  mongoose.model("ChatMessage", ChatMessageSchema);
