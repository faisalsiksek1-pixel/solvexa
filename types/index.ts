export type Locale = "en" | "ar" | "pt";

export type Difficulty = "foundation" | "standard" | "advanced" | "extension";

export type TopicCategory =
  | "algebra"
  | "geometry"
  | "calculus"
  | "trigonometry"
  | "statistics"
  | "number-theory"
  | "vectors"
  | "probability";

export interface Topic {
  id: string;
  slug: string;
  name: string;
  category: TopicCategory;
  description: string;
  problemCount: number;
  difficulty: Difficulty;
  curriculum: ("uae" | "brazil")[];
  icon: string;
  color: string;
  subtopics: Subtopic[];
}

export interface Subtopic {
  id: string;
  name: string;
  description: string;
  problemCount: number;
}

export interface Problem {
  id: string;
  topicId: string;
  subtopicId?: string;
  statement: string;
  difficulty: Difficulty;
  tags: string[];
  curriculum: ("uae" | "brazil")[];
}

export interface SolutionStep {
  id: string;
  title: string;
  explanation: string;
  math?: string;
  hint?: string;
}

export interface Solution {
  problemId?: string;
  statement: string;
  steps: SolutionStep[];
  finalAnswer: string;
  finalAnswerLatex?: string;
  topic: string;
  difficulty: Difficulty;
  graphFunction?: string | null;
  graphXMin?: number;
  graphXMax?: number;
  solvedAt: Date;
}

export interface UserStats {
  problemsSolved: number;
  currentStreak: number;
  longestStreak: number;
  accuracy: number;
  topicsMastered: number;
  totalMinutes: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
}

export interface ActivityEntry {
  id: string;
  type: "solved" | "practiced" | "streak" | "milestone" | "topic_complete";
  description: string;
  topic?: string;
  difficulty?: Difficulty;
  timestamp: Date;
  xpEarned?: number;
}

export interface TopicProgress {
  topicId: string;
  topicName: string;
  category: TopicCategory;
  color: string;
  solved: number;
  total: number;
  accuracy: number;
  lastPracticed?: Date;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: { uae: number; brazil: number };
  currency: { uae: string; brazil: string };
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  country: "uae" | "brazil";
  avatar: string;
  quote: string;
  rating: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
}
