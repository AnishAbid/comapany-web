"use server";

import { resend } from "@/lib/resend";

export async function sendContact(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Name, email, and message are required." };
  }

  try {
    await resend.emails.send({
      from: "DevFactors Contact <onboarding@resend.dev>",
      to: ["anish.91@hotmail.com"],
      subject: `New Contact: ${subject || "General Inquiry"} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\nMessage: ${message}`,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { error: "Failed to send message. Please try again later." };
  }
}
