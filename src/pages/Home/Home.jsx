import PageTransition from '../../components/PageTransition/PageTransition.jsx'
import Hero from '../../components/Hero/Hero.jsx'
import About from '../../components/About/About.jsx'
import Differentials from '../../components/Differentials/Differentials.jsx'
import Hours from '../../components/Hours/Hours.jsx'
import CTA from '../../components/CTA/CTA.jsx'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <About />
      <Differentials />
      <Hours />
      <CTA />
    </PageTransition>
  )
}
