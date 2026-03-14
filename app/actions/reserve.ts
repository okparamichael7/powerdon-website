"use server";

import { z } from "zod";
import { createReserveSchema, reserveSchema } from "@/schema";
import { sendPartnershipEmail } from "@/lib/mail";
import { getTranslations } from "@/lib/i18n/getTranslations";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

export type ReserveFormData = z.infer<typeof reserveSchema>;

export async function reserve(
  values: ReserveFormData,
  locale: Locale = defaultLocale,
) {
  try {
    const messages = await getTranslations(locale);
    const validation = createReserveSchema(messages.forms.validation).safeParse(
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

    await sendPartnershipEmail(data, locale);

    return { success: messages.forms.reserve.successResponse, status: 200 };
  } catch (error) {
    console.error("Error processing reservation:", error);
    const messages = await getTranslations(locale);
    return { error: messages.forms.feedback.internalError, status: 500 };
  }
}
