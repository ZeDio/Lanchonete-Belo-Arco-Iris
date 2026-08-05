import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home/Home.jsx'
import Menu from './pages/Menu/Menu.jsx'
import Contact from './pages/Contact/Contact.jsx'
import AdminReviews from './pages/AdminReviews/AdminReviews.jsx'

export default function App() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/cardapio" element={<Menu />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/gerenciar-avaliacoes" element={<AdminReviews />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
