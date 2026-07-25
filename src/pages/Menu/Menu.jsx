import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearchPlus, FaFilePdf } from 'react-icons/fa'
import PageTransition from '../../components/PageTransition/PageTransition.jsx'
import Lightbox from '../../components/Lightbox/Lightbox.jsx'
import styles from './Menu.module.css'

const PAGES = [
  { src: '/assets/cardapio-frente.svg', alt: 'Cardápio Belo Arco-Íris — página 1' },
  { src: '/assets/cardapio-verso.svg', alt: 'Cardápio Belo Arco-Íris — página 2' },
]

export default function Menu() {
  const [active, setActive] = useState(null)

  return (
    <PageTransition>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Nosso Cardápio</h1>
          <p className={styles.subtitle}>Confira todas as opções disponíveis.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {PAGES.map((page, i) => (
              <motion.div
                key={page.src}
                className={styles.card}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <button
                  className={styles.imgButton}
                  onClick={() => setActive(page)}
                  aria-label={`Ampliar ${page.alt}`}
                >
                  <img src={page.src} alt={page.alt} loading="lazy" />
                </button>
                <div className={styles.imgLabel}>
                  <FaSearchPlus style={{ marginRight: 6, verticalAlign: -2 }} />
                  {page.alt}
                </div>
                <div className={styles.zoomHint}>Clique para ampliar</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.downloadSection}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className={styles.downloadCard}>
              <div className={styles.downloadText}>
                <h3>
                  <FaFilePdf style={{ marginRight: 8, verticalAlign: -2, color: 'var(--color-blue-600)' }} />
                  Baixe o cardápio em PDF
                </h3>
                <p>
                  Prefere guardar no celular? Baixe o cardápio completo em PDF e consulte
                  offline sempre que quiser.
                </p>
                <a
                  href="/assets/cardapio-belo-arco-iris.pdf"
                  download="cardapio-belo-arco-iris.pdf"
                  className="btn btn--primary"
                >
                  <FaFilePdf />
                  Baixar PDF
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {active && (
        <Lightbox src={active.src} alt={active.alt} onClose={() => setActive(null)} />
      )}
    </PageTransition>
  )
}
