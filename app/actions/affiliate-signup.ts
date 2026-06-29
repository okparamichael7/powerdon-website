"use server";

import { z } from "zod";
import { sendAffiliateSignupEmail } from "@/lib/mail";

const affiliateSignupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(6, "Phone number is required"),
  notifications: z.boolean().default(false),
  agreement: z.literal(true),
});

export type AffiliateSignupData = z.infer<typeof affiliateSignupSchema>;

export type AffiliateSignupResult =
  | { success: true; requestId: string }
  | { error: string; details?: unknown; status: number };

export async function affiliateSignup(
  values: AffiliateSignupData,
): Promise<AffiliateSignupResult> {
  try {
    const validation = affiliateSignupSchema.safeParse(values);
    if (!validation.success) {
      return {
        error: "Invalid data",
        details: validation.error.format(),
        status: 400,
      };
    }

    const { password: _password, agreement: _agreement, ...rest } =
      validation.data;
    const { requestId } = await sendAffiliateSignupEmail(rest);
    return { success: true, requestId };
  } catch (error) {
    console.error("Affiliate signup failed", error);
    return { error: "Internal Server Error", status: 500 };
  }
}
