export interface ServiceMeta {
  slug: string;
  index: number;
  icon: string;
  color: string;
  gradient: string;
  relatedSlugs: string[];
}

export const services: ServiceMeta[] = [
  {
    slug: "web-mobile-apps",
    index: 0,
    icon: "cloud",
    color: "blue",
    gradient: "from-blue-600 to-cyan-500",
    relatedSlugs: ["api-development", "frontend-engineering", "cloud-architecture"],
  },
  {
    slug: "cloud-architecture",
    index: 1,
    icon: "analytics",
    color: "purple",
    gradient: "from-purple-600 to-pink-500",
    relatedSlugs: ["tech-consulting", "web-mobile-apps", "api-development"],
  },
  {
    slug: "api-development",
    index: 2,
    icon: "shield",
    color: "emerald",
    gradient: "from-emerald-600 to-teal-500",
    relatedSlugs: ["web-mobile-apps", "frontend-engineering", "cloud-architecture"],
  },
  {
    slug: "frontend-engineering",
    index: 3,
    icon: "code",
    color: "orange",
    gradient: "from-orange-600 to-amber-500",
    relatedSlugs: ["web-mobile-apps", "api-development", "tech-consulting"],
  },
  {
    slug: "team-leadership",
    index: 4,
    icon: "support",
    color: "rose",
    gradient: "from-rose-600 to-red-500",
    relatedSlugs: ["tech-consulting", "web-mobile-apps", "frontend-engineering"],
  },
  {
    slug: "tech-consulting",
    index: 5,
    icon: "automation",
    color: "indigo",
    gradient: "from-indigo-600 to-violet-500",
    relatedSlugs: ["cloud-architecture", "team-leadership", "api-development"],
  },
];

export const slugToService = Object.fromEntries(
  services.map((s) => [s.slug, s])
);

export const serviceColors: Record<string, { light: string; dark: string; border: string; bg: string; badge: string }> = {
  blue: {
    light: "bg-blue-50 text-blue-700",
    dark: "dark:bg-blue-950 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
    bg: "bg-blue-500/10 dark:bg-blue-500/5",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  purple: {
    light: "bg-purple-50 text-purple-700",
    dark: "dark:bg-purple-950 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
    bg: "bg-purple-500/10 dark:bg-purple-500/5",
    badge: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  emerald: {
    light: "bg-emerald-50 text-emerald-700",
    dark: "dark:bg-emerald-950 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/5",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  },
  orange: {
    light: "bg-orange-50 text-orange-700",
    dark: "dark:bg-orange-950 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-800",
    bg: "bg-orange-500/10 dark:bg-orange-500/5",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
  rose: {
    light: "bg-rose-50 text-rose-700",
    dark: "dark:bg-rose-950 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800",
    bg: "bg-rose-500/10 dark:bg-rose-500/5",
    badge: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  },
  indigo: {
    light: "bg-indigo-50 text-indigo-700",
    dark: "dark:bg-indigo-950 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-800",
    bg: "bg-indigo-500/10 dark:bg-indigo-500/5",
    badge: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  },
};
