import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaUtensils } from 'react-icons/fa'
import styles from './CTA.module.css'

export default function CTA() {
  return (
    <section className="section section--alt">
      <div className="container">
        <motion.div
          className={styles.wrap}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className={styles.title}>Conheça nosso cardápio completo</h2>
          <p className={styles.text}>
            Pratos feitos, cafés e refeições caseiras para todos os gostos, todos os dias.
          </p>
          <Link to="/cardapio" className="btn btn--primary">
            <FaUtensils />
            Ver Cardápio
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
