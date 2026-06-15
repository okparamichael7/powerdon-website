// Edge-compatible HMAC session helper for the affiliate admin area.
//
// Session format: `${payloadBase64Url}.${signatureBase64Url}` where
// payload = JSON({ sub: string, exp: number }). Signed with HMAC-SHA256
// using AFFILIATE_SESSION_SECRET. Uses Web Crypto so it runs in both
// Node and the Edge runtime (Next.js middleware).

export const AFFILIATE_SESSION_COOKIE = "powerdon_affiliate_session";
export const AFFILIATE_SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

type SessionPayload = {
  sub: string;
  exp: number;
};

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const padLen = padded.length % 4;
  const normalized = padLen ? padded + "=".repeat(4 - padLen) : padded;
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function getSecret(): string {
  const secret = process.env.AFFILIATE_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "AFFILIATE_SESSION_SECRET is missing or too short (need >=32 chars).",
    );
  }
  return secret;
}

export async function createAffiliateSession(sub: string): Promise<string> {
  const payload: SessionPayload = {
    sub,
    exp: Math.floor(Date.now() / 1000) + AFFILIATE_SESSION_MAX_AGE,
  };
  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
  const payloadPart = base64UrlEncode(payloadBytes);

  const key = await importKey(getSecret());
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadPart),
  );
  const signaturePart = base64UrlEncode(new Uint8Array(signatureBuffer));

  return `${payloadPart}.${signaturePart}`;
}

export async function verifyAffiliateSession(
  token: string | undefined | null,
): Promise<SessionPayload | null> {
  if (!token) {
    return null;
  }
  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }
  const [payloadPart, signaturePart] = parts;

  let key: CryptoKey;
  try {
    key = await importKey(getSecret());
  } catch {
    return null;
  }

  const expectedSignature = base64UrlDecode(signaturePart);
  const signatureBuffer = expectedSignature.buffer.slice(
    expectedSignature.byteOffset,
    expectedSignature.byteOffset + expectedSignature.byteLength,
  ) as ArrayBuffer;
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    signatureBuffer,
    new TextEncoder().encode(payloadPart),
  );
  if (!valid) {
    return null;
  }

  try {
    const payloadJson = new TextDecoder().decode(base64UrlDecode(payloadPart));
    const payload = JSON.parse(payloadJson) as SessionPayload;
    if (
      typeof payload.sub !== "string" ||
      typeof payload.exp !== "number" ||
      payload.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function isAffiliateProtectedPath(pathname: string): boolean {
  // Strip locale prefix if present (matches /nl/affiliate, /en/affiliate, /affiliate)
  const stripped = pathname.replace(/^\/(en|nl)(?=\/|$)/, "");
  if (!stripped.startsWith("/affiliate")) {
    return false;
  }
  // Public pages within the affiliate area
  if (
    stripped === "/affiliate/signup" ||
    stripped === "/affiliate/login" ||
    stripped === "/affiliate/logout"
  ) {
    return false;
  }
  return true;
}
