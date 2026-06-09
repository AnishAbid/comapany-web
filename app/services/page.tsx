"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CloudIcon, AnalyticsIcon, ShieldIcon, CodeIcon, SupportIcon, AutomationIcon, ArrowLeftIcon } from "@/app/components/icons";
import { useLocale } from "@/app/components/locale-provider";
import { services, serviceColors } from "@/lib/services";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

const serviceIcons = [CloudIcon, AnalyticsIcon, ShieldIcon, CodeIcon, SupportIcon, AutomationIcon];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesPage() {
  const { t, locale } = useLocale();
  const isRtl = locale === "ar";

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-20 sm:pb-28 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] opacity-20 dark:opacity-10 bg-blue-500/20 rounded-full blur-[150px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className={`inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                <ArrowLeftIcon className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                {t("hero.heading1") ? "Home" : "الرئيسية"}
              </Link>
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wide uppercase mb-3">
                {t("services.badge")}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto leading-[1.1]">
                {t("services.heading")}
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                {t("services.description")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Service Grid */}
        <section className="pb-24 sm:pb-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service, idx) => {
                const Icon = serviceIcons[idx];
                const colors = serviceColors[service.color];
                return (
                  <motion.div
                    key={service.slug}
                    variants={cardVariants}
                  >
                    <Link
                      href={"/services/" + service.slug}
                      className={`group block p-8 rounded-2xl bg-white dark:bg-slate-800/50 border ${colors.border} hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl transition-all duration-300 h-full flex flex-col`}
                    >
                      <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                        <div className={colors.light + " " + colors.dark}>
                          <Icon />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {t("services.items." + idx + ".title")}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1">
                        {t("services.items." + idx + ".desc")}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform duration-200">
                        {isRtl ? "← المزيد" : "Learn more →"}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24 sm:pb-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 p-12 sm:p-16 text-center overflow-hidden"
            >
              <div className="absolute inset-0 -z-10 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-[80px]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white max-w-2xl mx-auto">
                {t("serviceDetail.ctaTitle")}
              </h2>
              <p className="mt-4 text-lg text-blue-100 max-w-xl mx-auto">
                {t("serviceDetail.ctaDesc")}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl bg-white text-blue-700 hover:bg-blue-50 transition-all duration-300 w-full sm:w-auto shadow-lg"
                >
                  {t("serviceDetail.ctaButton")}
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl border border-white/30 text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
                >
                  {isRtl ? "العودة إلى الرئيسية" : "Back to Home"}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
