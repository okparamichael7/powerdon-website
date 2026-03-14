"use server";

import { sendContactConfirmationEmail, sendContactEmail } from "@/lib/mail";
import { createContactSchema, contactSchema } from "@/schema";
import { getTranslations } from "@/lib/i18n/getTranslations";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { z } from "zod";

// import { sendConfirmationEmail, sendNotificationEmail } from "@/lib/mail";

export type ContactFormData = z.infer<typeof contactSchema>;

export async function contact(
  values: ContactFormData,
  locale: Locale = defaultLocale,
) {
  try {
    const messages = await getTranslations(locale);
    const validation = createContactSchema(messages.forms.validation).safeParse(
      values,
    );

    if (!validation.success) {
      return {
        error: messages.forms.feedback.invalid,
        details: validation.error.format(),
        status: 400,
      };
    }

    const { data } = validation;

    await sendContactEmail(data);

    await sendContactConfirmationEmail(data, locale);

    return { success: messages.forms.contact.successResponse, status: 200 };
  } catch (error) {
    console.error("Error processing contact form:", error);
    const messages = await getTranslations(locale);
    return { error: messages.forms.feedback.internalError, status: 500 };
  }
}
