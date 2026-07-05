import { NextResponse } from "next/server";
import  connectDB  from "../../../lib/mongodb";
import ChatMessage from "../../../models/ChatMessage";
import Faq from "../../../models/Faq";

const FALLBACK_REPLY =
  "I didn't quite catch that. Try one of the quick options below, or ask to talk to a human and I'll open a support ticket for you.";

function matchFaq(faqs, text) {
  const lower = text.toLowerCase();
  return faqs.find((f) => f.keywords.some((k) => lower.includes(k.toLowerCase())));
}

export async function POST(req) {
  const { sessionId, text, faqId } = await req.json();

  if (!sessionId || !text) {
    return NextResponse.json(
      { error: "sessionId and text are required" },
      { status: 400 }
    );
  }

  await connectDB();

  // 1. Save the user's message
  await ChatMessage.create({ sessionId, sender: "user", text, faqId: faqId || null });

  // 2. Work out the bot's reply — either the clicked FAQ, or a keyword match
  let matched = null;
  if (faqId) {
    matched = await Faq.findById(faqId).lean();
  } else {
    const faqs = await Faq.find({ active: true }).lean();
    matched = matchFaq(faqs, text);
  }

  const escalate = matched?.answer === "__ESCALATE__";
  const replyText = escalate
    ? "Sure — share your name, email, and a quick description of the issue and I'll open a support ticket for our team."
    : matched?.answer || FALLBACK_REPLY;

  // 3. Save the bot's reply
  const botMessage = await ChatMessage.create({
    sessionId,
    sender: "bot",
    text: replyText,
    faqId: matched?._id || null,
  });

  return NextResponse.json({
    reply: replyText,
    escalate,
    messageId: botMessage._id,
  });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
  }
  await connectDB();
  const messages = await ChatMessage.find({ sessionId }).sort({ createdAt: 1 }).lean();
  return NextResponse.json({ messages });
}
