"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocale } from "@/app/components/locale-provider";

const testimonialKeys = [
  { nameKey: "testimonials.items.0.name", roleKey: "testimonials.items.0.role", quoteKey: "testimonials.items.0.quote", initialsKey: "testimonials.items.0.initials" },
  { nameKey: "testimonials.items.1.name", roleKey: "testimonials.items.1.role", quoteKey: "testimonials.items.1.quote", initialsKey: "testimonials.items.1.initials" },
  { nameKey: "testimonials.items.2.name", roleKey: "testimonials.items.2.role", quoteKey: "testimonials.items.2.quote", initialsKey: "testimonials.items.2.initials" },
  { nameKey: "testimonials.items.3.name", roleKey: "testimonials.items.3.role", quoteKey: "testimonials.items.3.quote", initialsKey: "testimonials.items.3.initials" },
  { nameKey: "testimonials.items.4.name", roleKey: "testimonials.items.4.role", quoteKey: "testimonials.items.4.quote", initialsKey: "testimonials.items.4.initials" },
  { nameKey: "testimonials.items.5.name", roleKey: "testimonials.items.5.role", quoteKey: "testimonials.items.5.quote", initialsKey: "testimonials.items.5.initials" },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function TestimonialsSection() {
  const { t: locale } = useLocale();
  const [[index, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonialKeys.length;

  const goTo = useCallback((newIndex: number) => {
    const dir = newIndex > index ? 1 : -1;
    setPage([newIndex, dir]);
  }, [index]);

  const next = useCallback(() => {
    setPage(([c]) => [(c + 1) % total, 1]);
  }, [total]);

  const prev = useCallback(() => {
    setPage(([c]) => [(c - 1 + total) % total, -1]);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [isPaused, next]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  const item = testimonialKeys[index];

  return (
    <motion.section id="testimonials" className="py-24 sm:py-32 bg-white dark:bg-slate-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wide uppercase mb-3">{locale('testimonials.badge')}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{locale('testimonials.heading')}</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{locale('testimonials.description')}</p>
        </div>

        <div className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label={locale("testimonials.heading")}
          aria-roledescription="carousel"
        >
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragElastic={0.6}
                onDragStart={() => setIsPaused(true)}
                onDragEnd={(_, info) => {
                  setIsPaused(false);
                  if (info.offset.x < -80) next();
                  else if (info.offset.x > 80) prev();
                }}
                whileDrag={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.12)", cursor: "grabbing", transition: { duration: 0.15 } }}
                className="p-8 sm:p-10 lg:p-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl"
                role="group"
                aria-roledescription="slide"
                aria-label={"Testimonial " + (index + 1) + " " + locale("testimonials.ofLabel") + " " + total}
              >
                <svg className="w-10 h-10 text-blue-200 dark:text-blue-800 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179z" />
                </svg>

                <blockquote className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-8 font-medium">
                  &ldquo;{locale(item.quoteKey)}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold shrink-0">
                    {locale(item.initialsKey)}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-900 dark:text-white">{locale(item.nameKey)}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{locale(item.roleKey)}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 transition-all duration-300 z-10 hidden sm:flex"
            aria-label={locale("testimonials.prevLabel")}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 transition-all duration-300 z-10 hidden sm:flex"
            aria-label={locale("testimonials.nextLabel")}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center items-center gap-2 mt-8" role="tablist" aria-label={locale("testimonials.heading")}>
            {testimonialKeys.map((_, i) => (
              <button key={i}
            
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === index}
                className={("h-2 rounded-full transition-all duration-500 " + (i === index ? "w-8 bg-blue-600 dark:bg-blue-400" : "w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"))}
              />
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-3">
            {index + 1} / {total}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
