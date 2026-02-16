import { db } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to Firestore
    await db.collection("contact_submissions").add({
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    });

    // Send email notification
    await resend.emails.send({
      from: "onboarding@resend.dev", // Change this after verifying your domain
      to: process.env.CONTACT_EMAIL!,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true });  
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Invalid request" },
      { status: 500 }
    );
  }
}
