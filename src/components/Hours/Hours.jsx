import { motion } from 'framer-motion'
import { FaClock } from 'react-icons/fa'
import styles from './Hours.module.css'

export default function Hours() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          className={styles.wrap}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className={styles.ring} aria-hidden="true" />
          <div className={styles.iconCol}>
            <FaClock />
          </div>

          <div className={styles.block}>
            <div className={styles.blockLabel}>Segunda à Sexta</div>
            <div className={styles.blockValue}>07:00 às 20:00</div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockLabel}>Sábado</div>
            <div className={styles.blockValue}>07:30 às 15:00</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
