import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import ServicesSection from './components/ServicesSection'
import PortfolioSection from './components/PortfolioSection'
import PricingSection from './components/PricingSection'
import QueryInputSection from './components/QueryInputSection'
import ContactForm from './components/ContactForm'
import TrustSection from './components/TrustSection'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ServicesSection />
      <PortfolioSection />
      <PricingSection />
      <QueryInputSection />
      <ContactForm />
      <TrustSection />
      <FinalCTA />
      <Footer />
    </div>
  )
}

export default App
