import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { transporter } from "@/lib/nodemailer";

// POST - Contact form submit karna
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // MongoDB mein save karo
    const contact = await Contact.create(body);

    // Admin ko mail bhejo
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "aswebmatrix@gmail.com",
      subject: `New Contact Form: ${body.subject}`,
      html: `
        <h2>New Inquiry</h2>
        <p><b>Name:</b> ${body.name}</p>
        <p><b>Email:</b> ${body.email}</p>
        <p><b>Phone:</b> ${body.phone}</p>
        <p><b>Subject:</b> ${body.subject}</p>
        <p><b>Message:</b> ${body.message}</p>
      `,
    });

    // User ko auto reply
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: body.email,
      subject: "Thank you for contacting AS Web Matrix",
      html: `
        <h2>Hello ${body.name},</h2>
        <p>Thank you for contacting AS Web Matrix.</p>
        <p>We have received your message and our team will contact you shortly.</p>
        <br/>
        <p>Regards,</p>
        <p>AS Web Matrix</p>
        <p>+91 9718401731</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message Sent Successfully",
      data: contact,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET - Admin dashboard ke liye saare contacts lao
export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ contacts });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Contact ka status update karo (New/Read/Replied)
export async function PATCH(request) {
  try {
    await connectDB();
    const { id, status } = await request.json();
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return NextResponse.json({ contact });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}