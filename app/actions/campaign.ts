"use server";

import { z } from "zod";
import { createCampaignSchema, campaignSchema } from "@/schema";
import { sendAdvertisingEmail } from "@/lib/mail";
import { getTranslations } from "@/lib/i18n/getTranslations";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

export type CampaignFormData = z.infer<typeof campaignSchema>;

export async function campaign(
  values: CampaignFormData,
  locale: Locale = defaultLocale,
) {
  try {
    const messages = await getTranslations(locale);
    const validation = createCampaignSchema(
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

    await sendAdvertisingEmail(data, locale);

    return { success: messages.forms.campaign.successResponse, status: 200 };
  } catch (error) {
    console.error("Error processing campaign request:", error);
    const messages = await getTranslations(locale);
    return { error: messages.forms.feedback.internalError, status: 500 };
  }
}
