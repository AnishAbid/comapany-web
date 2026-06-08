"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale } from "@/app/components/locale-provider";
import { motion, AnimatePresence } from "motion/react";

type Props = { className?: string };

export default function LocaleSwitch({ className = "" }: Props) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isEn = locale === "en";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const options = [
    { code: "en" as const, label: "English", flag: "🇺🇸", short: "EN" },
    { code: "ar" as const, label: "العربية", flag: "🇸🇦", short: "AR" },
  ];

  const current = isEn ? options[0] : options[1];

  return (
    <div ref={ref} className={`relative ${className}`}
      onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
        aria-label="Select language"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline text-xs">{current.short}</span>
        <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-1.5 w-36 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden z-50"
          >
            {options.map((opt) => (
              <button
                key={opt.code}
                onClick={() => { setLocale(opt.code); setOpen(false); }}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 text-sm transition-colors duration-150 ${
                  locale === opt.code
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                <span className="text-base leading-none">{opt.flag}</span>
                <span>{opt.label}</span>
                {locale === opt.code && (
                  <svg className="w-3.5 h-3.5 ml-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
