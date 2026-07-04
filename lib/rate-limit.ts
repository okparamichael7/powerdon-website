import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
}

let ipLimiter: Ratelimit | null = null;
let emailLimiter: Ratelimit | null = null;
let warnedMissingConfig = false;

function getLimiters(): { ip: Ratelimit; email: Ratelimit } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (!warnedMissingConfig) {
      console.warn(
        "[rate-limit] UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN not set — rate limiting is disabled",
      );
      warnedMissingConfig = true;
    }
    return null;
  }

  if (!ipLimiter || !emailLimiter) {
    const redis = new Redis({ url, token });
    ipLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      prefix: "powerdon:form:ip",
    });
    emailLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(2, "24 h"),
      prefix: "powerdon:form:email",
    });
  }

  return { ip: ipLimiter, email: emailLimiter };
}

export async function checkRateLimits(
  ip: string,
  email: string,
): Promise<RateLimitResult> {
  const limiters = getLimiters();

  if (!limiters) {
    return { allowed: true };
  }

  const [ipResult, emailResult] = await Promise.all([
    limiters.ip.limit(ip),
    limiters.email.limit(email.trim().toLowerCase()),
  ]);

  if (!ipResult.success) {
    return { allowed: false, reason: "ip-rate-limit-exceeded" };
  }

  if (!emailResult.success) {
    return { allowed: false, reason: "email-rate-limit-exceeded" };
  }

  return { allowed: true };
}
