"use server";

import { sendContactConfirmationEmail, sendContactEmail } from "@/lib/mail";
import { contactSchema } from "@/schema";
import { z } from "zod";

// import { sendConfirmationEmail, sendNotificationEmail } from "@/lib/mail";

export type ContactFormData = z.infer<typeof contactSchema>;

export async function contact(values: ContactFormData) {
  try {
    const validation = contactSchema.safeParse(values);

    if (!validation.success) {
      return {
        error: "Invalid data",
        details: validation.error.format(),
        status: 400,
      };
    }

    const { data } = validation;

    await sendContactEmail(data);

    await sendContactConfirmationEmail(data);

    return { success: "Message sent successfully", status: 200 };
  } catch (error) {
    console.error("Error processing contact form:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}
