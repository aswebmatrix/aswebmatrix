import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export const runtime = "nodejs";

function createSlug(value = "") {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function calculateReadingTime(content = "") {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function normalizeStringArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeFaqs(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((faq) => ({
      question: String(faq?.question || "").trim(),
      answer: String(faq?.answer || "").trim(),
    }))
    .filter((faq) => faq.question && faq.answer);
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

function buildBlogPayload(body) {
  const title = String(body?.title || "").trim();
  const content = String(body?.content || "").trim();
  const slug = createSlug(body?.slug || title);

  return {
    title,
    slug,
    excerpt: String(body?.excerpt || "").trim(),
    content,
    coverImage: String(body?.coverImage || "").trim(),
    category: String(body?.category || "General").trim() || "General",
    tags: normalizeStringArray(body?.tags),
    author: String(body?.author || "A.S Web Matrix").trim() || "A.S Web Matrix",
    status: body?.status === "published" ? "published" : "draft",
    metaTitle: String(body?.metaTitle || "").trim(),
    metaDescription: String(body?.metaDescription || "").trim(),
    metaKeywords: String(body?.metaKeywords || "").trim(),
    canonicalUrl: String(body?.canonicalUrl || "").trim(),
    geoTargetCity: String(body?.geoTargetCity || "").trim(),
    geoTargetRegion: String(body?.geoTargetRegion || "").trim(),
    aeoSummary: String(body?.aeoSummary || "").trim(),
    faqs: normalizeFaqs(body?.faqs),
    ogTitle: String(body?.ogTitle || "").trim(),
    ogDescription: String(body?.ogDescription || "").trim(),
    ogImage: String(body?.ogImage || "").trim(),
    readingTime: calculateReadingTime(content),
  };
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const adminMode = searchParams.get("admin") === "true";
    const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(
      50,
      Math.max(1, Number.parseInt(searchParams.get("limit") || "10", 10))
    );
    const filter = adminMode ? {} : { status: "published" };
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-content")
        .lean(),
      Blog.countDocuments(filter),
    ]);

    return NextResponse.json({
      blogs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    await connectDB();
    
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
    }
    
    console.log("CREATING BLOG:", body.title, body.slug);
    
    const blog = await Blog.create({
      title:   body.title,
      slug:    body.slug,
      content: body.content || "test",
      status:  body.status || "draft",
    });
    
    console.log("BLOG CREATED:", blog._id);
    return NextResponse.json({ blog }, { status: 201 });
    
  } catch (err) {
    console.log("ERROR:", err.message, err.stack);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}