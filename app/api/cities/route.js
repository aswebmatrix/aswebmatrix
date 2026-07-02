// app/api/cities/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import City from "@/models/City";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const adminMode = searchParams.get("admin") === "true";
    const filter = adminMode ? {} : { status: "active" };
    const cities = await City.find(filter).sort({ createdAt: -1 }).select("-introContent -services -faqs");
    return NextResponse.json({ cities });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const body = await request.json();
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").trim();
    }
    if (!body.metaTitle) body.metaTitle = `Best SEO & Web Development Company in ${body.name} | A.S Web Matrix`;
    if (!body.metaDescription) body.metaDescription = `A.S Web Matrix offers expert SEO, website development, and digital marketing in ${body.name}. Get a free consultation today.`;
    const city = await City.create(body);
    return NextResponse.json({ city }, { status: 201 });
  } catch (err) {
    if (err.code === 11000) return NextResponse.json({ error: "City slug already exists." }, { status: 400 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}