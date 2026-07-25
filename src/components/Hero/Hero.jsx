import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaUtensils, FaDirections } from 'react-icons/fa'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} role="img" aria-label="Mesa com pratos caseiros da lanchonete" />
      <div className={styles.overlay} />
      <div className={styles.arc} aria-hidden="true" />
      <div className={styles.arc2} aria-hidden="true" />

      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className={styles.eyebrow}>Jardim da Glória · São Paulo</span>
          <h1 className={styles.title}>Lanchonete Belo Arco-Íris</h1>
          <p className={styles.subtitle}>Tradição, sabor e qualidade no Jardim da Glória.</p>

          <div className={styles.actions}>
            <Link to="/cardapio" className="btn btn--primary">
              <FaUtensils />
              Ver Cardápio
            </Link>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Rua+Ingl%C3%AAs+de+Sousa%2C+305+-+Jardim+da+Gl%C3%B3ria%2C+S%C3%A3o+Paulo+-+SP%2C+01546-010"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--light"
            >
              <FaDirections />
              Como Chegar
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
