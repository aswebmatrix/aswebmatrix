// app/api/cities/[id]/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import City from "@/models/City";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

// GET single city by slug or id
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    let city = await City.findOne({ slug: id });
    if (!city) city = await City.findById(id).catch(() => null);
    if (!city) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await City.findByIdAndUpdate(city._id, { $inc: { views: 1 } });
    return NextResponse.json({ city });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update city (admin only)
export async function PUT(request, { params }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const city = await City.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!city) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ city });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE city (admin only)
export async function DELETE(request, { params }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const { id } = await params;
    await City.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}