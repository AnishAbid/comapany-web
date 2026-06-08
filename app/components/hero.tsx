"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronDownIcon } from "./icons";
import { useLocale } from "@/app/components/locale-provider";

export default function HeroSection() {
  const { t } = useLocale();
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          {t('hero.badge')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]"
        >
          {t("hero.heading1")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
            {t('hero.heading2')}
          </span>
          {" "}{t('hero.heading3')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 w-full sm:w-auto"
          >
            {t("hero.startProject")}
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto"
          >
            {t("hero.exploreServices")}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "50+", label: t("hero.stats.0") },
            { value: "99%", label: t("hero.stats.1") },
            { value: "8+", label: t("hero.stats.2") },
            { value: "15+", label: t("hero.stats.3") },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
              <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#services"
            className="animate-bounce p-2 rounded-full text-slate-400 hover:text-blue-500 transition-colors"
            aria-label={t('hero.scrollLabel')}
          >
            <ChevronDownIcon />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
