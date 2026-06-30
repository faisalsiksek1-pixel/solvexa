export interface NavLink {
  label: string
  href: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface Step {
  number: string
  title: string
  description: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
}

export interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  highlighted: boolean
}

export interface FAQItem {
  question: string
  answer: string
}
