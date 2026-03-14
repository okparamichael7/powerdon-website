"use client";

import { localizePath, type Locale } from "@/lib/i18n/config";
import { useI18nContext } from "@/lib/i18n/provider";
import type { Messages } from "@/lib/i18n/messages/en";

type Primitive = string | number | boolean | null | undefined;

type DotNestedKeys<T> = T extends Primitive
  ? never
  : T extends Array<unknown>
    ? never
    : {
        [K in keyof T & string]: T[K] extends Primitive
          ? K
          : T[K] extends Array<unknown>
            ? K
            : `${K}` | `${K}.${DotNestedKeys<T[K]>}`;
      }[keyof T & string];

export type TranslationKey = DotNestedKeys<Messages>;
export type TranslationNamespace = keyof Messages;

function getValueByPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((currentValue, segment) => {
    if (!currentValue || typeof currentValue !== "object") {
      return undefined;
    }

    return (currentValue as Record<string, unknown>)[segment];
  }, source);
}

function interpolate(
  template: string,
  values?: Record<string, string | number>,
) {
  if (!values) {
    return template;
  }

  return Object.entries(values).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, String(value));
  }, template);
}

export function useTranslation() {
  const { locale, messages } = useI18nContext();

  function t(key: TranslationKey, values?: Record<string, string | number>) {
    const resolved = getValueByPath(messages, key);

    if (typeof resolved !== "string") {
      return key;
    }

    return interpolate(resolved, values);
  }

  function namespace<N extends TranslationNamespace>(key: N): Messages[N] {
    return messages[key];
  }

  function href(path: string, nextLocale: Locale = locale) {
    return localizePath(path, nextLocale);
  }

  return {
    locale,
    messages,
    t,
    namespace,
    href,
  };
}

export function useLocale() {
  return useI18nContext().locale;
}
