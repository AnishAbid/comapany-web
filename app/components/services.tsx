"use client";

import { motion } from "motion/react";
import { CloudIcon, AnalyticsIcon, ShieldIcon, CodeIcon, SupportIcon, AutomationIcon } from "./icons";
import { useLocale } from "@/app/components/locale-provider";

const serviceKeys = ["0", "1", "2", "3", "4", "5"];
const serviceIcons = [CloudIcon, AnalyticsIcon, ShieldIcon, CodeIcon, SupportIcon, AutomationIcon];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ServicesSection() {
  const { t } = useLocale();
  return (
    <section id="services" className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wide uppercase mb-3">{t('services.badge')}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{t('services.heading')}</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('services.description')}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {serviceKeys.map((key, idx) => {
            const Icon = serviceIcons[idx];
            return (
              <motion.div
                key={serviceKeys[idx]}
                variants={cardVariants}
                className="group relative p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">{t('services.items.' + key + '.title')}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t('services.items.' + key + '.desc')}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
