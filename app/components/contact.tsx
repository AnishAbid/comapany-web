"use client";

import { motion } from "motion/react";
import { useFormStatus } from "react-dom";
import { sendContact } from "@/actions/sendContact";
import { useRef, useState } from "react";
import { useLocale } from "@/app/components/locale-provider";

function SubmitButton() {
  const { t } = useLocale();
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? t('contact.sendingButton') : t('contact.sendButton')}
    </button>
  );
}

export default function ContactSection() {
  const { t } = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  return (
    <section id="contact" className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wide uppercase mb-3">Get in Touch</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{t('contact.heading')}</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('contact.description')}
            </p>
            <div className="mt-10 space-y-6">
              {[
                { label: t("contact.email"), value: "anish.91@hotmail.com" },
                { label: t("contact.location"), value: t("contact.locationValue") },
                { label: t("contact.availability"), value: t("contact.availabilityValue") },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</div>
                  <div className="mt-1 text-slate-900 dark:text-white font-medium">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {status.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-xl text-sm font-medium ${
                  status.type === "success"
                    ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                    : "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
                }`}
              >
                {status.message}
              </motion.div>
            )}

            <form
              ref={formRef}
              action={async (formData) => {
                setStatus({ type: null, message: "" });
                const result = await sendContact(formData);
                if (result.success) {
                  setStatus({
                    type: "success",
                    message: "{t('contact.successMessage')}",
                  });
                  formRef.current?.reset();
                } else {
                  setStatus({
                    type: "error",
                    message: result.error || "{t('contact.errorMessage')}",
                  });
                }
              }}
              className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.fullName')}</label>
                  <input id="name" name="name" type="text" placeholder={t('contact.namePlaceholder')} required className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.emailLabel')}</label>
                  <input id="email" name="email" type="email" placeholder={t('contact.emailPlaceholder')} required className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.subject')}</label>
                <input id="subject" name="subject" type="text" placeholder={t('contact.subjectPlaceholder')} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('contact.message')}</label>
                <textarea id="message" name="message" rows={5} placeholder={t('contact.messagePlaceholder')} required className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none" />
              </div>
              <SubmitButton />
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
