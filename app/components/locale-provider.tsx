"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import enMessages from "@/locales/en.json";
import arMessages from "@/locales/ar.json";

export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];
const storageKey = "company-locale";
const defaultLocale: Locale = "en";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  try {
    const stored = localStorage.getItem(storageKey) as Locale | null;
    if (stored && locales.includes(stored)) return stored;
  } catch {}
  return defaultLocale;
}

const allMessages: Record<Locale, Record<string, unknown>> = {
  en: enMessages as Record<string, unknown>,
  ar: arMessages as Record<string, unknown>,
};

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

export type LocaleContextType = {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
  tData: (path: string) => unknown;
};

const fallbackT = (key: string): string => {
  const value = getNestedValue(enMessages as unknown as Record<string, unknown>, key);
  return typeof value === "string" ? value : key;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  dir: "ltr",
  setLocale: () => {},
  t: fallbackT,
  tData: (key: string): unknown => getNestedValue(enMessages as unknown as Record<string, unknown>, key),
});

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try { localStorage.setItem(storageKey, newLocale); } catch {}
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
  }, []);

  const t = useCallback((key: string): string => {
    const msgs = allMessages[locale];
    const value = getNestedValue(msgs, key);
    if (typeof value === "string") return value;
    const fallback = getNestedValue(allMessages.en, key);
    return typeof fallback === "string" ? fallback : key;
  }, [locale]);

  const tData = useCallback((key: string): unknown => {
    const msgs = allMessages[locale];
    const value = getNestedValue(msgs, key);
    if (value !== undefined) return value;
    return getNestedValue(allMessages.en, key);
  }, [locale]);

  // Sync document attributes on mount
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const value = useMemo(() => ({ locale, dir, setLocale, t, tData }), [locale, dir, setLocale, t, tData]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
