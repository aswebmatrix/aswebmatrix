// app/api/detect-city/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import City from "@/models/City";

export async function GET(request) {
  try {
    // ── Step 1: Get visitor IP ──────────────────────────────────────────────
    const forwarded = request.headers.get("x-forwarded-for");
    const ip =
      forwarded?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "8.8.8.8"; // fallback for local dev

    // ── Step 2: Reverse-geocode IP → city name (free, no API key needed) ──
    let detectedCity = null;
    let detectedRegion = null;

    try {
      // ip-api.com — 1000 req/min free, no key needed
      const geoRes = await fetch(
        `http://ip-api.com/json/${ip}?fields=status,city,regionName,countryCode`,
        { next: { revalidate: 3600 } } // cache 1 hr per IP
      );
      const geo = await geoRes.json();
      if (geo.status === "success") {
        detectedCity   = geo.city;        // e.g. "Delhi"
        detectedRegion = geo.regionName;  // e.g. "Delhi"
      }
    } catch {
      // geo lookup failed — will return null city
    }

    if (!detectedCity) {
      return NextResponse.json({ found: false, city: null });
    }

    // ── Step 3: Match against MongoDB City collection ──────────────────────
    await connectDB();

    // Try exact slug match first (e.g. "new-delhi" or "delhi")
    const slug = detectedCity.toLowerCase().replace(/\s+/g, "-");

    let cityDoc = await City.findOne(
      { slug, status: "active" },
      "name slug region heroHeading heroDesc services faqs aeoSummary nearbyAreas"
    ).lean();

    // Fallback: case-insensitive name match
    if (!cityDoc) {
      cityDoc = await City.findOne(
        { name: { $regex: new RegExp(`^${detectedCity}$`, "i") }, status: "active" },
        "name slug region heroHeading heroDesc services faqs aeoSummary nearbyAreas"
      ).lean();
    }

    if (!cityDoc) {
      return NextResponse.json({
        found: false,
        city: null,
        detectedName: detectedCity, // so frontend can still show city name as text
      });
    }

    return NextResponse.json({ found: true, city: cityDoc });
  } catch (err) {
    return NextResponse.json({ found: false, city: null, error: err.message });
  }
}