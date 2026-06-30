import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import Home from './pages/Home'
import FeaturesPage from './pages/Features'
import HowItWorksPage from './pages/HowItWorks'
import PricingPage from './pages/Pricing'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
)

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)

const AppRoutes: React.FC = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Layout>
              <PageTransition>
                <Home />
              </PageTransition>
            </Layout>
          }
        />
        <Route
          path="/features"
          element={
            <Layout>
              <PageTransition>
                <FeaturesPage />
              </PageTransition>
            </Layout>
          }
        />
        <Route
          path="/how-it-works"
          element={
            <Layout>
              <PageTransition>
                <HowItWorksPage />
              </PageTransition>
            </Layout>
          }
        />
        <Route
          path="/pricing"
          element={
            <Layout>
              <PageTransition>
                <PricingPage />
              </PageTransition>
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <PageTransition>
                <AboutPage />
              </PageTransition>
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <PageTransition>
                <ContactPage />
              </PageTransition>
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={
            <PageTransition>
              <SignIn />
            </PageTransition>
          }
        />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <SignUp />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
