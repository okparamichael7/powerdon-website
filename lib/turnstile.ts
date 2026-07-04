const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileResult {
  success: boolean;
  errorCodes?: string[];
}

let warnedMissingConfig = false;

export async function verifyTurnstile(
  token: string,
  remoteIp?: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Unconfigured is not the same as "challenge attempted and failed": failing
  // closed here would reject every partnership application until Cloudflare
  // keys are provisioned. Fail open (like rate-limit does when Upstash isn't
  // configured) and rely on validation/rate-limiting/trust-scoring in the
  // meantime; a real verification failure below still fails closed.
  if (!secret) {
    if (!warnedMissingConfig) {
      console.warn(
        "[turnstile] TURNSTILE_SECRET_KEY is not set — bot challenge is disabled",
      );
      warnedMissingConfig = true;
    }
    return { success: true, errorCodes: ["turnstile-disabled-missing-secret"] };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!res.ok) {
      return { success: false, errorCodes: [`http-${res.status}`] };
    }

    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    return { success: data.success, errorCodes: data["error-codes"] };
  } catch (error) {
    console.error("[turnstile] verification request failed:", error);
    return { success: false, errorCodes: ["network-error"] };
  }
}
