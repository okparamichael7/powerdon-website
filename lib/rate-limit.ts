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
    // Mobile carriers commonly put many unrelated customers behind one
    // shared (CGNAT) IP, and a legitimate applicant who hits a transient
    // failure (flaky mobile network, a momentarily-expired bot-challenge
    // token) has to retry the same long form more than once or twice.
    ipLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 h"),
      prefix: "powerdon:form:ip",
    });
    // A single lead (e.g. a festival organizer or agency) may legitimately
    // submit applications for several different events in the same day —
    // this is only a backstop against one address spamming the form, not a
    // one-request-per-day cap. Submissions are reviewed manually on
    // receipt, so this can stay generous.
    emailLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "24 h"),
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
