// Run with: npm run seed
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema(
  {
    label: String,
    keywords: [String],
    answer: String,
    order: Number,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const Faq = mongoose.models.Faq || mongoose.model("Faq", FaqSchema);

const STARTER_FAQS = [
  {
    label: "Track my order",
    keywords: ["order", "track", "shipping", "delivery"],
    answer:
      "You can track your order from Account > Orders. Paste your order ID here and I'll pull up the status.",
    order: 1,
  },
  {
    label: "Refund & returns",
    keywords: ["refund", "return", "money back", "cancel order"],
    answer:
      "Refunds are processed within 5-7 business days once the returned item is received. Want me to start a return for you?",
    order: 2,
  },
  {
    label: "Reset my password",
    keywords: ["password", "login", "reset", "forgot"],
    answer:
      "Go to Login > Forgot Password and enter your registered email. The reset link expires in 15 minutes.",
    order: 3,
  },
  {
    label: "Talk to a human",
    keywords: ["human", "agent", "support person", "help me talk"],
    answer: "__ESCALATE__",
    order: 4,
  },
];

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Faq.deleteMany({});
  await Faq.insertMany(STARTER_FAQS);
  console.log(`Seeded ${STARTER_FAQS.length} FAQs.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
