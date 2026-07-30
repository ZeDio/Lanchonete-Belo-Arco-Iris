import { motion } from 'framer-motion'
import Carousel from '../Carousel/Carousel.jsx'
import fotosDoEstabelecimentoData from '../../data/fotosDoEstabelecimento.json'
import styles from './About.module.css'

export default function About() {
  return (
    <section className="section" id="sobre">
      <div className="container">
        <div className={styles.about}>
          <motion.div
            className={styles.visual}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Carousel photos={fotosDoEstabelecimentoData.photos} />
            <div className={styles.badge}>
              <span className={styles.badgeValue}>R$20–45</span>
              <span className={styles.badgeLabel}>ticket médio por refeição</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.text}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <span className="eyebrow">Nossa história</span>
            <h2 style={{ fontSize: 'var(--fs-h2)', fontWeight: 700, marginBottom: 16 }}>
              Sobre a Lanchonete
            </h2>
            <p>
              A Lanchonete Belo Arco-Íris é um tradicional restaurante localizado no Jardim da
              Glória, em São Paulo. Conhecida por seus deliciosos pratos feitos, cafés e
              refeições caseiras, oferece atendimento acolhedor e excelente custo-benefício para
              clientes que procuram comida saborosa todos os dias.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
