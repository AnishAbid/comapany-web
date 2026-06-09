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
              <div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">WhatsApp</div>
                <a href="https://wa.me/923008880161" target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-2 text-slate-900 dark:text-white font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  0300-8880161
                </a>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{t("contact.email")}</div>
                <a href="mailto:aasoftwareengineer@gmail.com" className="mt-1 text-slate-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  aasoftwareengineer@gmail.com
                </a>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{t("contact.location")}</div>
                <div className="mt-1 text-slate-900 dark:text-white font-medium">{t("contact.locationValue")}</div>
              </div>
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
