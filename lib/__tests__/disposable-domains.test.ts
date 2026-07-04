import { describe, it, expect } from "vitest";
import { isDisposableEmail, isFreeEmailDomain } from "@/lib/disposable-domains";

describe("disposable-domains", () => {
  it("flags mailinator.com as disposable", () => {
    expect(isDisposableEmail("someone@mailinator.com")).toBe(true);
  });

  it("does not flag gmail.com as disposable, but does flag it as free", () => {
    expect(isDisposableEmail("someone@gmail.com")).toBe(false);
    expect(isFreeEmailDomain("someone@gmail.com")).toBe(true);
  });

  it("treats powerdon.nl as neither disposable nor free", () => {
    expect(isDisposableEmail("info@powerdon.nl")).toBe(false);
    expect(isFreeEmailDomain("info@powerdon.nl")).toBe(false);
  });

  it("is case-insensitive on the domain", () => {
    expect(isDisposableEmail("Someone@MAILINATOR.COM")).toBe(true);
    expect(isFreeEmailDomain("Someone@GMAIL.com")).toBe(true);
  });
});
