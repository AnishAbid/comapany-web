"use client";
import Link from "next/link";
import { useLocale } from "@/app/components/locale-provider";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
              <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold">D</span>
              DevFactors
            </Link>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              {[t("footer.services"), t("footer.about"), t("footer.contact")].map((item) => (
                <li key={item}>
                  <Link href={"#" + item.toLowerCase()} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-4">{t("footer.connect")}</h4>
            <ul className="space-y-3">
              {[
                { label: t("footer.github"), href: "https://github.com/AnishAbid" },
                { label: t("footer.linkedin"), href: "https://www.linkedin.com/in/anish-abid-a70a90154" },
                { label: t("footer.email"), href: "mailto:anish.91@hotmail.com" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">&copy; {new Date().getFullYear()} DevFactors. {t('footer.rights')}</p>
          <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <span>{t('footer.builtWith')} Next.js</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>Motion</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
