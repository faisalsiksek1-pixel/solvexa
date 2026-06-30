import type { Topic } from "@/types";

export const TOPICS: Topic[] = [
  {
    id: "algebra-1",
    slug: "algebra",
    name: "Algebra",
    category: "algebra",
    description:
      "Master equations, inequalities, polynomials, and algebraic structures fundamental to all of mathematics.",
    problemCount: 248,
    difficulty: "standard",
    curriculum: ["uae", "brazil"],
    icon: "∑",
    color: "indigo",
    subtopics: [
      { id: "linear-equations", name: "Linear Equations", description: "Solve one and two-variable equations", problemCount: 48 },
      { id: "quadratic-equations", name: "Quadratic Equations", description: "Factoring, completing the square, and the quadratic formula", problemCount: 62 },
      { id: "polynomials", name: "Polynomials", description: "Operations, factoring, and the remainder theorem", problemCount: 44 },
      { id: "inequalities", name: "Inequalities", description: "Linear, quadratic, and absolute value inequalities", problemCount: 38 },
      { id: "systems", name: "Systems of Equations", description: "Substitution, elimination, and matrix methods", problemCount: 56 },
    ],
  },
  {
    id: "geometry-1",
    slug: "geometry",
    name: "Geometry",
    category: "geometry",
    description:
      "Explore shapes, proofs, coordinate geometry, and the spatial reasoning skills used across science and engineering.",
    problemCount: 196,
    difficulty: "standard",
    curriculum: ["uae", "brazil"],
    icon: "△",
    color: "emerald",
    subtopics: [
      { id: "triangles", name: "Triangles & Congruence", description: "Properties, congruence, and similarity", problemCount: 52 },
      { id: "circles", name: "Circles", description: "Arc length, sectors, and circle theorems", problemCount: 44 },
      { id: "coordinate-geometry", name: "Coordinate Geometry", description: "Lines, distance, and midpoint in the plane", problemCount: 48 },
      { id: "3d-geometry", name: "3D Geometry", description: "Volumes, surface areas, and spatial reasoning", problemCount: 32 },
      { id: "transformations", name: "Transformations", description: "Translations, rotations, reflections, and dilations", problemCount: 20 },
    ],
  },
  {
    id: "calculus-1",
    slug: "calculus",
    name: "Calculus",
    category: "calculus",
    description:
      "Understand limits, derivatives, integrals, and the fundamental theorem — the language of change and motion.",
    problemCount: 214,
    difficulty: "advanced",
    curriculum: ["uae", "brazil"],
    icon: "∫",
    color: "violet",
    subtopics: [
      { id: "limits", name: "Limits & Continuity", description: "Formal definition and limit laws", problemCount: 36 },
      { id: "derivatives", name: "Derivatives", description: "Rules of differentiation and applications", problemCount: 68 },
      { id: "applications-derivatives", name: "Applications of Derivatives", description: "Optimization, related rates, and curve sketching", problemCount: 52 },
      { id: "integrals", name: "Integration", description: "Antiderivatives, definite integrals, and techniques", problemCount: 58 },
    ],
  },
  {
    id: "trigonometry-1",
    slug: "trigonometry",
    name: "Trigonometry",
    category: "trigonometry",
    description:
      "Navigate angles, trigonometric functions, identities, and their applications in physics and engineering.",
    problemCount: 168,
    difficulty: "standard",
    curriculum: ["uae", "brazil"],
    icon: "θ",
    color: "amber",
    subtopics: [
      { id: "trig-ratios", name: "Trigonometric Ratios", description: "Sin, cos, tan and their reciprocals", problemCount: 36 },
      { id: "unit-circle", name: "Unit Circle", description: "Radian measure and exact values", problemCount: 28 },
      { id: "trig-identities", name: "Trigonometric Identities", description: "Pythagorean, sum/difference, and double angle", problemCount: 48 },
      { id: "trig-equations", name: "Trigonometric Equations", description: "Solving equations and general solutions", problemCount: 32 },
      { id: "sine-cosine-rule", name: "Sine & Cosine Rule", description: "Non-right triangles and applications", problemCount: 24 },
    ],
  },
  {
    id: "statistics-1",
    slug: "statistics",
    name: "Statistics",
    category: "statistics",
    description:
      "Collect, organize, and interpret data with confidence — essential skills for an evidence-driven world.",
    problemCount: 142,
    difficulty: "foundation",
    curriculum: ["uae", "brazil"],
    icon: "σ",
    color: "rose",
    subtopics: [
      { id: "descriptive-stats", name: "Descriptive Statistics", description: "Mean, median, mode, and spread", problemCount: 42 },
      { id: "distributions", name: "Distributions", description: "Normal, binomial, and Poisson distributions", problemCount: 38 },
      { id: "regression", name: "Regression & Correlation", description: "Linear regression and correlation coefficients", problemCount: 32 },
      { id: "hypothesis-testing", name: "Hypothesis Testing", description: "Null hypothesis, p-values, and confidence intervals", problemCount: 30 },
    ],
  },
  {
    id: "probability-1",
    slug: "probability",
    name: "Probability",
    category: "probability",
    description:
      "Quantify uncertainty, model random events, and reason about likelihood in everyday and scientific contexts.",
    problemCount: 124,
    difficulty: "standard",
    curriculum: ["uae", "brazil"],
    icon: "P",
    color: "cyan",
    subtopics: [
      { id: "basic-probability", name: "Basic Probability", description: "Sample spaces, events, and axioms", problemCount: 36 },
      { id: "conditional-probability", name: "Conditional Probability", description: "Bayes' theorem and independence", problemCount: 32 },
      { id: "combinatorics", name: "Combinatorics", description: "Permutations, combinations, and counting principles", problemCount: 28 },
      { id: "random-variables", name: "Random Variables", description: "Expected value, variance, and distributions", problemCount: 28 },
    ],
  },
  {
    id: "vectors-1",
    slug: "vectors",
    name: "Vectors",
    category: "vectors",
    description:
      "Work with magnitude and direction in 2D and 3D space — the backbone of physics and computer graphics.",
    problemCount: 98,
    difficulty: "advanced",
    curriculum: ["uae"],
    icon: "→",
    color: "teal",
    subtopics: [
      { id: "vector-basics", name: "Vector Basics", description: "Addition, subtraction, and scalar multiplication", problemCount: 28 },
      { id: "dot-product", name: "Dot & Cross Product", description: "Products and geometric interpretations", problemCount: 32 },
      { id: "vector-equations", name: "Vector Equations", description: "Lines and planes in 3D", problemCount: 38 },
    ],
  },
  {
    id: "number-theory-1",
    slug: "number-theory",
    name: "Number Theory",
    category: "number-theory",
    description:
      "Discover the deep properties of integers — prime numbers, divisibility, modular arithmetic, and beyond.",
    problemCount: 86,
    difficulty: "extension",
    curriculum: ["uae", "brazil"],
    icon: "ℕ",
    color: "fuchsia",
    subtopics: [
      { id: "prime-numbers", name: "Prime Numbers", description: "Primality, sieve of Eratosthenes, and prime factorization", problemCount: 24 },
      { id: "modular-arithmetic", name: "Modular Arithmetic", description: "Congruences, Fermat's little theorem", problemCount: 28 },
      { id: "gcd-lcm", name: "GCD & LCM", description: "Euclidean algorithm and applications", problemCount: 22 },
      { id: "diophantine", name: "Diophantine Equations", description: "Integer solutions and linear Diophantine equations", problemCount: 12 },
    ],
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export function getTopicsByCategory(category: string): Topic[] {
  return TOPICS.filter((t) => t.category === category);
}
