import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema(
  {
    // Shown as a clickable button/chip in the chat widget
    label: { type: String, required: true },
    // Extra words the bot matches against free-typed messages
    keywords: { type: [String], default: [] },
    // The bot's reply when this FAQ is triggered
    answer: { type: String, required: true },
    // Order the quick-reply buttons appear in
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Faq || mongoose.model("Faq", FaqSchema);
