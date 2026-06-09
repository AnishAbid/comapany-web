"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeftIcon, CheckIcon } from "@/app/components/icons";
import { useLocale } from "@/app/components/locale-provider";
import { slugToService, serviceColors, services, ServiceMeta } from "@/lib/services";
import { projectIllustrations } from "@/app/components/project-illustrations";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export const serviceIcons: Record<string, React.ReactNode> = {
  cloud: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  analytics: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  shield: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  code: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  support: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  ),
  automation: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
};

interface ServiceDetailLayoutProps {
  slug: string;
}

export default function ServiceDetailLayout({ slug }: ServiceDetailLayoutProps) {
  const { t, tData, locale } = useLocale();
  const service = slugToService[slug];
  const isRtl = locale === "ar";

  if (!service) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Service not found</h1>
            <Link href="/#services" className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline">
              <ArrowLeftIcon />
              Back to Services
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const colors = serviceColors[service.color];
  const data = tData("serviceDetail.items." + service.index) as unknown as {
    longDesc: string;
    features: string[];
    techs: string[];
    process: { title: string; desc: string }[];
    caseStudies: { title: string; client: string; result: string; image: string }[];
    statValues: string[];
  };
  const detail = t("serviceDetail") as unknown as {
    backToServices: string;
    overview: string;
    features: string;
    technologies: string;
    process: string;
    caseStudies: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaButton: string;
    stats: { projects: string; clients: string; years: string; experts: string };
    clientsTitle: string;
    engagementTitle: string;
    faqTitle: string;
    relatedTitle: string;
    testimonialsLabel: string;
  };

  const features: string[] = data?.features || [];
  const testimonials: { name: string; role: string; quote: string }[] = ((tData("serviceDetail.items." + service.index + ".testimonials") || []) as { name: string; role: string; quote: string }[]);
  const engagementModels: { title: string; desc: string; features: string[] }[] = ((tData("serviceDetail.engagementModels") || []) as { title: string; desc: string; features: string[] }[]);
  const faqItems: { q: string; a: string }[] = ((tData("serviceDetail.faq") || []) as { q: string; a: string }[]);
  const clientNames: string[] = ((tData("serviceDetail.clients") || []) as string[]);
  const techs: string[] = data?.techs || [];
  const processSteps: { title: string; desc: string }[] = data?.process || [];
  const caseStudies: { title: string; client: string; result: string; image: string }[] = data?.caseStudies || [];
  const statValues: string[] = data?.statValues || [];
  const statLabels: string[] = [
    t("serviceDetail.stats.projects"),
    t("serviceDetail.stats.clients"),
    t("serviceDetail.stats.years"),
    t("serviceDetail.stats.experts"),
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center pt-24 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] opacity-20 dark:opacity-10 rounded-full blur-[150px] ${colors.bg}`} />
          </div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/#services"
                className={`inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                <ArrowLeftIcon className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                {detail.backToServices}
              </Link>
            </motion.div>

            <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-start ${isRtl ? "lg:flex-row-reverse" : ""}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex-1"
              >
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border ${colors.border} ${colors.bg} ${colors.light} ${colors.dark} text-sm font-medium mb-6`}>
                  <span className={`w-2 h-2 rounded-full bg-${service.color}-500 animate-pulse`} />
                  {t("services.items." + service.index + ".title")}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                  {t("services.items." + service.index + ".title")}
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {data?.longDesc || t("services.items." + service.index + ".desc")}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300"
                  >
                    {detail.ctaButton}
                  </Link>
                  <Link
                    href="/#services"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    {detail.backToServices}
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="shrink-0"
              >
                <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-3xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                  <div className={colors.light + " " + colors.dark}>
                    {serviceIcons[service.icon]}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="min-h-[80vh] flex items-center bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {(statValues.length > 0 ? statValues : ["85+", "50+", "8+", "15+"]).map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                    {value}
                  </div>
                  <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {statLabels[idx] || ""}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Logos Strip */}
        <section className="min-h-[80vh] flex items-center bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500">
                {detail.clientsTitle}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`flex flex-wrap items-center justify-center gap-x-12 gap-y-6 ${isRtl ? "flex-row-reverse" : ""}`}
            >
              {(clientNames.length > 0 ? clientNames : []).map((name: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2.5 text-slate-400 dark:text-slate-500">
                  <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
                    <span className={`text-xs font-bold ${colors.light} ${colors.dark}`}>{name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium">{name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Overview & Features */}
        <section className="min-h-[80vh] flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
            <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 ${isRtl ? "lg:flex-row-reverse" : ""}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className={`text-sm font-semibold tracking-wide uppercase ${colors.light} ${colors.dark} mb-3`}>
                  {detail.overview}
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                  {t("services.items." + service.index + ".title")}
                </h2>
                <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {data?.longDesc || t("services.items." + service.index + ".desc")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className={`text-sm font-semibold tracking-wide uppercase ${colors.light} ${colors.dark} mb-3`}>
                  {detail.features}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  {detail.features}
                </h3>
                <ul className="space-y-4">
                  {features.map((feature: string, idx: number) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className={`flex items-start gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
                    >
                      <CheckIcon className="w-5 h-5 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Per-Service Testimonials */}
        {testimonials.length > 0 && (
        <section className="min-h-[80vh] flex items-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-10"
            >
              <p className={`text-sm font-semibold tracking-wide uppercase ${colors.light} ${colors.dark} mb-3`}>
                {detail.testimonialsLabel}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                {detail.testimonialsLabel}
              </h2>
            </motion.div>
            <div className={`grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto ${isRtl ? "lg:flex-row-reverse" : ""}`}>
              {testimonials.map((item: { name: string; role: string; quote: string }, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <svg className="w-8 h-8 mb-4 text-blue-200 dark:text-blue-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H9.98v10H0z" />
                  </svg>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
                      <span className={`text-sm font-bold ${colors.light} ${colors.dark}`}>{item.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Technologies */}
        <section className="min-h-[80vh] flex items-center bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-10"
            >
              <p className={`text-sm font-semibold tracking-wide uppercase ${colors.light} ${colors.dark} mb-3`}>
                {detail.technologies}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                {detail.technologies}
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`flex flex-wrap justify-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
            >
              {techs.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium border ${colors.border} ${colors.bg} ${colors.light} ${colors.dark} hover:scale-105 transition-transform duration-200 cursor-default`}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section className="min-h-[80vh] flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-10"
            >
              <p className={`text-sm font-semibold tracking-wide uppercase ${colors.light} ${colors.dark} mb-3`}>
                {detail.process}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                {detail.process}
              </h2>
            </motion.div>
            <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ${isRtl ? "lg:flex-row-reverse" : ""}`}>
              {(processSteps.length > 0 ? processSteps : []).map((step: { title: string; desc: string }, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-5`}>
                    <span className={`text-lg font-bold ${colors.light} ${colors.dark}`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                  {idx < (processSteps.length - 1) && (
                    <div className={`hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-300 dark:bg-slate-600 ${isRtl ? "rotate-180" : ""}`} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement Models */}
        <section className="min-h-[80vh] flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-10"
            >
              <p className={`text-sm font-semibold tracking-wide uppercase ${colors.light} ${colors.dark} mb-3`}>
                {detail.engagementTitle}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                {detail.engagementTitle}
              </h2>
            </motion.div>
            <div className={`grid sm:grid-cols-3 gap-6 ${isRtl ? "lg:flex-row-reverse" : ""}`}>
              {(engagementModels.length > 0 ? engagementModels : []).map((model: { title: string; desc: string; features: string[] }, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-5`}>
                    <span className={`text-lg font-bold ${colors.light} ${colors.dark}`}>
                      {idx === 0 ? "P" : idx === 1 ? "D" : "S"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">{model.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{model.desc}</p>
                  <ul className="space-y-2">
                    {model.features.map((feat: string, fidx: number) => (
                      <li key={fidx} className={`flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 ${isRtl ? "flex-row-reverse" : ""}`}>
                        <CheckIcon className="w-3.5 h-3.5 shrink-0 text-blue-500" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies / Recent Projects */}
        <section className="min-h-[80vh] flex items-center bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-10"
            >
              <p className={`text-sm font-semibold tracking-wide uppercase ${colors.light} ${colors.dark} mb-3`}>
                {detail.caseStudies}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                {detail.caseStudies}
              </h2>
            </motion.div>

            <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-8 ${isRtl ? "lg:flex-row-reverse" : ""}`}>
              {(caseStudies.length > 0 ? caseStudies : []).map((cs: { title: string; client: string; result: string; image: string }, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                >
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 dark:bg-slate-700">
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
                      {projectIllustrations[cs.image] || (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                          <svg className="w-16 h-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${colors.badge}`}>
                        {cs.client}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{cs.title}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{cs.result}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {faqItems.length > 0 && (
        <section className="min-h-[80vh] flex items-center bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-10"
            >
              <p className={`text-sm font-semibold tracking-wide uppercase ${colors.light} ${colors.dark} mb-3`}>
                {detail.faqTitle}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                {detail.faqTitle}
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {faqItems.map((item: { q: string; a: string }, idx: number) => (
                <details
                  key={idx}
                  className={`group rounded-xl border ${colors.border} ${colors.bg} overflow-hidden transition-all duration-200`}
                >
                  <summary className="list-none flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <span className="text-sm sm:text-base font-medium text-slate-900 dark:text-white pr-4">{item.q}</span>
                    <svg className={`w-4 h-4 shrink-0 text-slate-400 group-open:rotate-180 transition-transform duration-200 ${isRtl ? "rotate-180 group-open:rotate-0" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.a}</p>
                  </div>
                </details>
              ))}
            </motion.div>
          </div>
        </section>
        )}

        {/* Related Services */}
        <section className="min-h-[80vh] flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-10"
            >
              <p className={`text-sm font-semibold tracking-wide uppercase ${colors.light} ${colors.dark} mb-3`}>
                {detail.relatedTitle}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                {detail.relatedTitle}
              </h2>
            </motion.div>
            <div className={`grid sm:grid-cols-3 gap-6 ${isRtl ? "lg:flex-row-reverse" : ""}`}>
              {service.relatedSlugs.map((relatedSlug: string, idx: number) => {
                const relatedService = slugToService[relatedSlug];
                if (!relatedService) return null;
                const relColors = serviceColors[relatedService.color];
                return (
                  <motion.div
                    key={relatedSlug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Link
                      href={"/services/" + relatedSlug}
                      className={`group block p-6 rounded-2xl bg-white dark:bg-slate-800/50 border ${relColors.border} hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg transition-all duration-300`}
                    >
                      <div className={`w-12 h-12 rounded-xl ${relColors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <div className={relColors.light + " " + relColors.dark}>
                          {serviceIcons[relatedService.icon]}
                        </div>
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {t("services.items." + relatedService.index + ".title")}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {t("services.items." + relatedService.index + ".desc")}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="min-h-[80vh] flex items-center relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ${colors.bg} rounded-full blur-[120px]`} />
          </div>
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                {detail.ctaTitle}
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                {detail.ctaDesc}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 w-full sm:w-auto"
                >
                  {detail.ctaButton}
                </Link>
                <Link
                  href="/#services"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto"
                >
                  {detail.backToServices}
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
