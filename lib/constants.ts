export const APP_NAME = "Solvexa";
export const APP_TAGLINE = "Master Mathematics. Powered by AI.";
export const APP_DESCRIPTION =
  "Step-by-step AI solutions, curriculum-aligned practice, and progress tracking — built for high school students in the UAE and Brazil.";

export const DIFFICULTY_LABELS: Record<string, string> = {
  foundation: "Foundation",
  standard: "Standard",
  advanced: "Advanced",
  extension: "Extension",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  foundation: "emerald",
  standard: "blue",
  advanced: "violet",
  extension: "amber",
};

export const CATEGORY_LABELS: Record<string, string> = {
  algebra: "Algebra",
  geometry: "Geometry",
  calculus: "Calculus",
  trigonometry: "Trigonometry",
  statistics: "Statistics",
  "number-theory": "Number Theory",
  vectors: "Vectors",
  probability: "Probability",
};

export const XP_PER_LEVEL = 500;

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Solve", href: "/solve", icon: "Sparkles" },
  { label: "Topics", href: "/topics", icon: "BookOpen" },
  { label: "Profile", href: "/profile", icon: "User" },
];
