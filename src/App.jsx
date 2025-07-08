import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import BusinessNameGenerator from './components/BusinessNameGenerator'
import LoanCalculator from './components/LoanCalculator'
import BMICalculator from './components/BMICalculator'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Home />
        <BusinessNameGenerator />
        <LoanCalculator />
        <BMICalculator />
      </main>
      <Footer />
    </div>
  )
}

export default App
