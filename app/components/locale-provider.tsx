"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import enMessages from "@/locales/en.json";

export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];
const storageKey = "company-locale";
const defaultLocale: Locale = "en";

export type LocaleContextType = {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
};

const fallbackT = (key: string): string => {
  const keys = key.split(".");
  let current: unknown = enMessages;
  for (const k of keys) {
    if (current === null || current === undefined) return key;
    current = (current as Record<string, unknown>)[k];
  }
  return typeof current === "string" ? current : key;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  dir: "ltr",
  setLocale: () => {},
  t: fallbackT,
});

const messagesCache = new Map<Locale, Record<string, unknown>>();

async function loadMessages(locale: Locale): Promise<Record<string, unknown>> {
  if (messagesCache.has(locale)) return messagesCache.get(locale)!;
  const messages = await import(`@/locales/${locale}.json`);
  messagesCache.set(locale, messages);
  return messages;
}

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : undefined;
}

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Record<string, unknown>>(enMessages as Record<string, unknown>);
  const dir = locale === "ar" ? "rtl" : "ltr";

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(storageKey, newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
  }, []);

  const t = useCallback((key: string): string => {
    let value = getNestedValue(messages, key);
    if (value === undefined) {
      value = getNestedValue(enMessages as unknown as Record<string, unknown>, key);
      if (value === undefined) return key;
    }
    return value;
  }, [messages]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Locale | null;
    const initial = stored && locales.includes(stored) ? stored : defaultLocale;
    setLocaleState(initial);
    loadMessages(initial).then((msgs) => {
      setMessages(msgs);
      document.documentElement.lang = initial;
      document.documentElement.dir = initial === "ar" ? "rtl" : "ltr";
    });
  }, []);

  useEffect(() => {
    loadMessages(locale).then((msgs) => setMessages(msgs));
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, dir, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
