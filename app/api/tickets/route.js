import { NextResponse } from "next/server";
import  connectDB  from "../../../lib/mongodb";
import Ticket from "../../../models/Ticket";

export async function POST(req) {
  const { sessionId, name, email, message } = await req.json();

  if (!sessionId || !name || !email || !message) {
    return NextResponse.json(
      { error: "sessionId, name, email, and message are all required" },
      { status: 400 }
    );
  }

  await connectDB();
  const ticket = await Ticket.create({ sessionId, name, email, message });

  return NextResponse.json({
    ticketId: ticket._id,
    reply: `Got it, ${name}. Your ticket #${ticket._id.toString().slice(-6)} is open — our team will email you at ${email} shortly.`,
  });
}

export async function GET() {
  await connectDB();
  const tickets = await Ticket.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ tickets });
}
