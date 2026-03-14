"use server";

import { z } from "zod";
import { createPilotTestingSchema, pilotTestingSchema } from "@/schema";
import { sendPilotTestingEmail } from "@/lib/mail";
import { getTranslations } from "@/lib/i18n/getTranslations";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

export type PilotTestingFormData = z.infer<typeof pilotTestingSchema>;

export async function pilotTesting(
  values: PilotTestingFormData,
  locale: Locale = defaultLocale,
) {
  try {
    const messages = await getTranslations(locale);
    const validation = createPilotTestingSchema(
      messages.forms.validation,
    ).safeParse(values);

    if (!validation.success) {
      return {
        error: messages.forms.feedback.invalid,
        details: validation.error.format(),
        status: 400,
      };
    }

    const { data } = validation;

    await sendPilotTestingEmail(data, locale);

    return {
      success: messages.forms.campaign.successResponse,
      status: 200,
    };
  } catch (error) {
    console.error("Error processing pilot testing request:", error);
    const messages = await getTranslations(locale);
    return { error: messages.forms.feedback.internalError, status: 500 };
  }
}
