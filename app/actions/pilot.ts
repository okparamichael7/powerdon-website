"use server";

import { z } from "zod";
import { pilotTestingSchema } from "@/schema";
import { sendPilotTestingEmail } from "@/lib/mail";

export type PilotTestingFormData = z.infer<typeof pilotTestingSchema>;

export async function pilotTesting(values: PilotTestingFormData) {
  try {
    const validation = pilotTestingSchema.safeParse(values);

    if (!validation.success) {
      return {
        error: "Invalid data",
        details: validation.error.format(),
        status: 400,
      };
    }

    const { data } = validation;

    await sendPilotTestingEmail(data);

    return {
      success: "Pilot testing request submitted successfully",
      status: 200,
    };
  } catch (error) {
    console.error("Error processing pilot testing request:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}
