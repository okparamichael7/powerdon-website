"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import {
  localizePath,
  localeCookieName,
  stripLocalePrefix,
  type Locale,
} from "@/lib/i18n/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { cn } from "@/lib/utils";

const cookieLifetime = 60 * 60 * 24 * 365;

interface LanguageSwitcherProps {
  variant?: "default" | "footer";
}

export function LanguageSwitcher({
  variant = "default",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { locale, namespace } = useTranslation();
  const copy = namespace("common").languageSwitcher;

  const basePath = stripLocalePrefix(pathname || "/");
  const localeLabels: Record<Locale, string> = {
    en: copy.english,
    nl: copy.dutch,
  };

  const handleChange = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      return;
    }

    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=${cookieLifetime}; SameSite=Lax`;
    window.localStorage.setItem(localeCookieName, nextLocale);

    startTransition(() => {
      router.replace(localizePath(basePath, nextLocale));
      router.refresh();
    });
  };

  if (variant === "footer") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={copy.label}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/78 transition-colors hover:text-white"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span>{localeLabels[locale]}</span>
            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="top"
          className="min-w-[180px] border-white/10 bg-neutral-950 text-white"
        >
          {(["en", "nl"] as const).map((option) => {
            const isActive = option === locale;

            return (
              <DropdownMenuItem
                key={option}
                onClick={() => handleChange(option)}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm focus:bg-white/10 focus:text-white"
              >
                <span>{localeLabels[option]}</span>
                {isActive ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : null}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div
      aria-label={copy.label}
      className={cn(
        "inline-flex items-center gap-1 rounded-full p-1",
        "h-10 min-w-[96px] border border-slate-200 bg-white shadow-sm",
      )}
      role="group"
    >
      {(["en", "nl"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => handleChange(option)}
          className={cn(
            "flex h-8 min-w-[42px] items-center justify-center rounded-full px-3 text-xs font-semibold tracking-[0.16em] transition-colors",
            option === locale
              ? "bg-black text-white"
              : "text-slate-500 hover:text-slate-900",
            isPending && "cursor-wait",
          )}
          aria-pressed={option === locale}
          title={option === "en" ? copy.english : copy.dutch}
        >
          {option === "en" ? copy.en : copy.nl}
        </button>
      ))}
    </div>
  );
}
