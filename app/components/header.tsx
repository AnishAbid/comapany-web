"use client";
import Link from "next/link";
import { MenuIcon, CloseIcon } from "./icons";
import ThemeToggle from "./theme-toggle";
import { useLocale } from "@/app/components/locale-provider";
import LocaleSwitch from "./locale-switch";

const navLinks = ["Home", "Services", "About", "Contact"];
function NavLink({ item }: { item: string }) {
  const { t } = useLocale();
  return (
    <Link
      href={item === "Home" ? "/" : "#" + item.toLowerCase()}
      className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    >
      {t("nav." + item.toLowerCase())}
    </Link>
  );
}

export default function Header() {
  const { t } = useLocale();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
          <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold">D</span>
          DevFactors
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <NavLink key={item} item={item} />
          ))}
          <ThemeToggle />
          <LocaleSwitch />
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {t("getStarted")}
          </Link>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <details className="group">
            <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <div className="group-open:hidden"><MenuIcon /></div>
              <div className="hidden group-open:block"><CloseIcon /></div>
            </summary>
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg p-6 flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : "#" + item.toLowerCase()}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item}
                </Link>
              ))}
              <LocaleSwitch className="mb-2" />
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {t("getStarted")}
              </Link>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
