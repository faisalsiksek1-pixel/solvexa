import React from 'react'
import { Hero } from '../components/home/Hero'
import { Features } from '../components/home/Features'
import { HowItWorks } from '../components/home/HowItWorks'
import { Testimonials } from '../components/home/Testimonials'
import { PricingPreview } from '../components/home/PricingPreview'
import { FAQ } from '../components/home/FAQ'

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PricingPreview />
      <FAQ />
    </main>
  )
}

export default Home
