"use server";

import { z } from "zod";
import { campaignSchema } from "@/schema";
import {
  sendAdvertisingConfirmationEmail,
  sendAdvertisingEmail,
} from "@/lib/mail";

export type CampaignFormData = z.infer<typeof campaignSchema>;

export async function campaign(values: CampaignFormData) {
  try {
    const validation = campaignSchema.safeParse(values);

    if (!validation.success) {
      return {
        error: "Invalid data",
        details: validation.error.format(),
        status: 400,
      };
    }

    const { data } = validation;

    await sendAdvertisingEmail(data);

    await sendAdvertisingConfirmationEmail(data);

    return { success: "Campaign request submitted successfully", status: 200 };
  } catch (error) {
    console.error("Error processing campaign request:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}
