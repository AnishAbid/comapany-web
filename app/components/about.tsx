"use client";

import { motion } from "motion/react";
import { CheckIcon } from "./icons";
import { useLocale } from "@/app/components/locale-provider";

export default function AboutSection() {
  const { t } = useLocale();
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wide uppercase mb-3">{t('about.badge')}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{t('about.heading')}</h2>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{t('about.p1')}</p>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{t('about.p2')}</p>
            <div className="mt-10 flex flex-col gap-4">
              {[
                t("about.checks.0"),
                t("about.checks.1"),
                t("about.checks.2"),
                t("about.checks.3"),
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "8+", label: t("about.stats.0"), color: "#2563eb" },
              { value: "50+", label: t("about.stats.1"), color: "#f59e0b" },
              { value: "15+", label: t("about.stats.2"), color: "#10b981" },
              { value: "100%", label: t("about.stats.3"), color: "#8b5cf6" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden p-6 rounded-2xl text-white"
                style={{ backgroundColor: stat.color }}
              >
                <div className="relative z-10">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="mt-1 text-sm opacity-90">{stat.label}</div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
