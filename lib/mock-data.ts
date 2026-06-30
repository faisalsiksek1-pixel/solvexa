import type {
  UserStats,
  ActivityEntry,
  TopicProgress,
  PricingPlan,
  Testimonial,
  Solution,
} from "@/types";

export const MOCK_USER = {
  id: "user-1",
  name: "Layla Al-Rashid",
  email: "layla@example.com",
  avatar: null,
  country: "uae" as const,
  grade: "Grade 11",
  school: "Dubai International Academy",
  joinedAt: new Date("2024-09-01"),
};

export const MOCK_STATS: UserStats = {
  problemsSolved: 347,
  currentStreak: 12,
  longestStreak: 24,
  accuracy: 84,
  topicsMastered: 5,
  totalMinutes: 1840,
  level: 8,
  xp: 3920,
  xpToNextLevel: 4000,
};

export const MOCK_ACTIVITY: ActivityEntry[] = [
  {
    id: "a1",
    type: "solved",
    description: "Solved a quadratic equation using the discriminant method",
    topic: "Algebra",
    difficulty: "standard",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    xpEarned: 20,
  },
  {
    id: "a2",
    type: "streak",
    description: "12-day streak! Keep it up 🔥",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    xpEarned: 50,
  },
  {
    id: "a3",
    type: "solved",
    description: "Worked through integration by substitution",
    topic: "Calculus",
    difficulty: "advanced",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    xpEarned: 35,
  },
  {
    id: "a4",
    type: "topic_complete",
    description: "Completed all Foundation problems in Trigonometric Identities",
    topic: "Trigonometry",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    xpEarned: 100,
  },
  {
    id: "a5",
    type: "solved",
    description: "Proved the congruence of two triangles using SAS",
    topic: "Geometry",
    difficulty: "standard",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26),
    xpEarned: 20,
  },
  {
    id: "a6",
    type: "milestone",
    description: "Reached 300 problems solved — Milestone unlocked!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    xpEarned: 200,
  },
];

export const MOCK_TOPIC_PROGRESS: TopicProgress[] = [
  {
    topicId: "algebra-1",
    topicName: "Algebra",
    category: "algebra",
    color: "indigo",
    solved: 112,
    total: 248,
    accuracy: 88,
    lastPracticed: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    topicId: "calculus-1",
    topicName: "Calculus",
    category: "calculus",
    color: "violet",
    solved: 68,
    total: 214,
    accuracy: 76,
    lastPracticed: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    topicId: "trigonometry-1",
    topicName: "Trigonometry",
    category: "trigonometry",
    color: "amber",
    solved: 94,
    total: 168,
    accuracy: 91,
    lastPracticed: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    topicId: "geometry-1",
    topicName: "Geometry",
    category: "geometry",
    color: "emerald",
    solved: 73,
    total: 196,
    accuracy: 82,
    lastPracticed: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

export const MOCK_SOLUTIONS: Record<string, Solution> = {
  quadratic: {
    statement: "Solve: 2x² - 7x + 3 = 0",
    topic: "Algebra",
    difficulty: "standard",
    finalAnswer: "x = 3 or x = \\frac{1}{2}",
    solvedAt: new Date(),
    steps: [
      {
        id: "s1",
        title: "Identify the coefficients",
        explanation: "Write the equation in standard form ax² + bx + c = 0 and identify a, b, and c.",
        math: "2x^2 - 7x + 3 = 0 \\implies a = 2,\\; b = -7,\\; c = 3",
      },
      {
        id: "s2",
        title: "Calculate the discriminant",
        explanation: "The discriminant Δ = b² − 4ac tells us how many solutions exist. If Δ > 0, there are two distinct real roots.",
        math: "\\Delta = b^2 - 4ac = (-7)^2 - 4(2)(3) = 49 - 24 = 25",
      },
      {
        id: "s3",
        title: "Apply the quadratic formula",
        explanation: "Since Δ = 25 > 0, substitute into the quadratic formula to find both roots.",
        math: "x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} = \\frac{7 \\pm \\sqrt{25}}{4} = \\frac{7 \\pm 5}{4}",
      },
      {
        id: "s4",
        title: "Solve for each root",
        explanation: "Split the ± into two separate calculations to get both solutions.",
        math: "x_1 = \\frac{7 + 5}{4} = \\frac{12}{4} = 3 \\qquad x_2 = \\frac{7 - 5}{4} = \\frac{2}{4} = \\frac{1}{2}",
      },
      {
        id: "s5",
        title: "Verify by substitution",
        explanation: "Always check your answers by substituting them back into the original equation.",
        math: "2(3)^2 - 7(3) + 3 = 18 - 21 + 3 = 0 \\checkmark \\qquad 2\\left(\\tfrac{1}{2}\\right)^2 - 7\\left(\\tfrac{1}{2}\\right) + 3 = \\tfrac{1}{2} - \\tfrac{7}{2} + 3 = 0 \\checkmark",
      },
    ],
  },
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Explorer",
    price: { uae: 0, brazil: 0 },
    currency: { uae: "AED", brazil: "BRL" },
    period: "forever",
    description: "Start learning with core features, no credit card needed.",
    features: [
      "10 AI solutions per month",
      "Access to Foundation problems",
      "Basic progress tracking",
      "Community forum access",
    ],
    highlighted: false,
    cta: "Get Started Free",
  },
  {
    id: "pro",
    name: "Scholar",
    price: { uae: 59, brazil: 49 },
    currency: { uae: "AED", brazil: "BRL" },
    period: "month",
    description: "Everything a serious student needs to excel.",
    features: [
      "Unlimited AI solutions",
      "All topics & difficulty levels",
      "Detailed progress analytics",
      "Step-by-step hints system",
      "Exam-mode practice",
      "Offline problem sets",
      "Priority support",
    ],
    highlighted: true,
    cta: "Start 7-Day Free Trial",
  },
  {
    id: "family",
    name: "Family",
    price: { uae: 99, brazil: 89 },
    currency: { uae: "AED", brazil: "BRL" },
    period: "month",
    description: "One plan for up to 4 students in your household.",
    features: [
      "Everything in Scholar",
      "Up to 4 student profiles",
      "Parent progress dashboard",
      "Family weekly reports",
      "Dedicated account manager",
    ],
    highlighted: false,
    cta: "Start Family Trial",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Fatima Al-Mansoori",
    role: "Grade 12 Student, Abu Dhabi",
    country: "uae",
    avatar: "F",
    quote:
      "My calculus grade went from a C to an A in one semester. The step-by-step explanations don't just give me the answer — they help me actually understand what I'm doing.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Lucas Ferreira",
    role: "Grade 11 Student, São Paulo",
    country: "brazil",
    avatar: "L",
    quote:
      "Solvexa feels like having a private tutor available 24/7. I use it every night before bed and my ENEM preparation is going so much better than my classmates'.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Omar Khalid",
    role: "Parent of two, Dubai",
    country: "uae",
    avatar: "O",
    quote:
      "Both my children use Solvexa. The parent dashboard lets me see their progress without hovering. It's become a natural part of our homework routine.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Ana Beatriz Costa",
    role: "High School Math Teacher, Rio de Janeiro",
    country: "brazil",
    avatar: "A",
    quote:
      "I recommend Solvexa to all my students. The explanations are pedagogically sound — they teach intuition, not just procedures. That's rare in EdTech.",
    rating: 5,
  },
];

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}
