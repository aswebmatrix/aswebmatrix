import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Faq from "@/models/Faq";

export async function GET() {
  await connectDB();
  const faqs = await Faq.find({ active: true }).sort({ order: 1 }).lean();
  return NextResponse.json({ faqs });
}
