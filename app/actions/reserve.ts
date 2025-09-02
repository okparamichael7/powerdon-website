"use server";

import { z } from "zod";
import { reserveSchema } from "@/schema";
import { sendPartnershipEmail } from "@/lib/mail";

export type ReserveFormData = z.infer<typeof reserveSchema>;

export async function reserve(values: ReserveFormData) {
  try {
    const validation = reserveSchema.safeParse(values);

    if (!validation.success) {
      return {
        error: "Invalid data",
        details: validation.error.format(),
        status: 400,
      };
    }

    const { data } = validation;

    await sendPartnershipEmail(data);

    return { success: "Application submitted successfully", status: 200 };
  } catch (error) {
    console.error("Error processing reservation:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}
