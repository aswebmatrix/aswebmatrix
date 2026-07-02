// app/api/consultation/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import Consultation from "@/models/Consultation";

// ── Hardcode karo apni values yahan ───────────────────────────────────────────
// .env.local kaam nahi kar raha toh temporarily yahan set karo, test ke baad
// wapas env pe shift kar lena
const SMTP_EMAIL    = process.env.SMTP_EMAIL    || "anmolsharma18022005@gmail.com";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "gecp gtda ebud viox";
const ADMIN_EMAIL   = process.env.ADMIN_EMAIL   || "anmolsharma18022005@gmail.com";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, projectType, budget, message } = body;

    // ── Validation ─────────────────────────────────────────────────────────
    if (!name || !phone || !email || !service || !message) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    // ── 1. Save to MongoDB ─────────────────────────────────────────────────
    await connectDB();
    const consultation = await Consultation.create({
      name, phone, email, service, projectType, budget, message,
    });

    // ── 2. Nodemailer transporter ──────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    // ── Debug: env values log karo (remove after fix) ──────────────────────
    console.log("SMTP_EMAIL:", SMTP_EMAIL);
    console.log("ADMIN_EMAIL:", ADMIN_EMAIL);
    console.log("SMTP_PASSWORD set:", !!SMTP_PASSWORD);

    // ── Admin notification ─────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"A.S Web Matrix" <${SMTP_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `🆕 New Consultation Request from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:30px;border-radius:10px;">
          <div style="background:linear-gradient(135deg,#0B1628,#007259);padding:25px;border-radius:10px;text-align:center;margin-bottom:25px;">
            <h1 style="color:#00c49a;margin:0;font-size:24px;">New Consultation Request</h1>
            <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">A.S Web Matrix</p>
          </div>
          <div style="background:white;padding:25px;border-radius:10px;margin-bottom:15px;">
            <h2 style="color:#0B1628;font-size:16px;margin:0 0 20px;border-bottom:2px solid #00c49a;padding-bottom:10px;">Client Details</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#6B7A99;font-size:14px;width:140px;">Name</td><td style="padding:8px 0;color:#0B1628;font-weight:600;font-size:14px;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7A99;font-size:14px;">Phone</td><td style="padding:8px 0;color:#0B1628;font-weight:600;font-size:14px;">${phone}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7A99;font-size:14px;">Email</td><td style="padding:8px 0;color:#0B1628;font-weight:600;font-size:14px;">${email}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7A99;font-size:14px;">Service</td><td style="padding:8px 0;color:#00c49a;font-weight:700;font-size:14px;">${service}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7A99;font-size:14px;">Project Type</td><td style="padding:8px 0;color:#0B1628;font-weight:600;font-size:14px;">${projectType || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7A99;font-size:14px;">Budget</td><td style="padding:8px 0;color:#0B1628;font-weight:600;font-size:14px;">${budget || "—"}</td></tr>
            </table>
          </div>
          <div style="background:white;padding:25px;border-radius:10px;">
            <h2 style="color:#0B1628;font-size:16px;margin:0 0 12px;border-bottom:2px solid #00c49a;padding-bottom:10px;">Message</h2>
            <p style="color:#374151;font-size:14px;line-height:1.7;margin:0;">${message}</p>
          </div>
          <p style="text-align:center;color:#9CA3AF;font-size:12px;margin-top:20px;">
            Submitted on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST · ID: ${consultation._id}
          </p>
        </div>
      `,
    });

    // ── Client confirmation ────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"A.S Web Matrix" <${SMTP_EMAIL}>`,
      to: email,
      subject: `✅ We received your consultation request — A.S Web Matrix`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:30px;border-radius:10px;">
          <div style="background:linear-gradient(135deg,#0B1628,#007259);padding:25px;border-radius:10px;text-align:center;margin-bottom:25px;">
            <h1 style="color:#00c49a;margin:0;font-size:24px;">Thank You, ${name}!</h1>
            <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">We've received your consultation request</p>
          </div>
          <div style="background:white;padding:25px;border-radius:10px;">
            <p style="color:#374151;font-size:15px;line-height:1.7;">Hi <strong>${name}</strong>,</p>
            <p style="color:#374151;font-size:15px;line-height:1.7;">
              Thank you for reaching out to <strong>A.S Web Matrix</strong>. Our team will review your request
              and get back to you within <strong style="color:#00c49a;">24 hours</strong>.
            </p>
            <div style="background:#F0FDF4;border:1.5px solid #86EFAC;border-radius:10px;padding:16px;margin:20px 0;">
              <p style="color:#166534;font-size:14px;margin:0;"><strong>Service requested:</strong> ${service}</p>
              ${budget ? `<p style="color:#166534;font-size:14px;margin:8px 0 0;"><strong>Budget range:</strong> ${budget}</p>` : ""}
            </div>
            <p style="color:#374151;font-size:15px;line-height:1.7;">
              In the meantime, feel free to call us:<br/>
              📞 <a href="tel:+919718401731" style="color:#00c49a;font-weight:700;">+91-9718401731</a>
            </p>
          </div>
          <p style="text-align:center;color:#9CA3AF;font-size:12px;margin-top:20px;">
            A.S Web Matrix · 2578, Sec-23 A, Faridabad, Haryana 121005
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, id: consultation._id }, { status: 201 });

  } catch (err) {
    console.error("Consultation API error:", err.message);
    console.error("Full error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET — admin list
export async function GET() {
  try {
    await connectDB();
    const consultations = await Consultation.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ consultations });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}