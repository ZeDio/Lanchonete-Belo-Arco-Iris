import { motion } from 'framer-motion'
import { GiKnifeFork, GiMeal } from 'react-icons/gi'
import { FaCoffee, FaMoneyBillWave, FaMapMarkerAlt, FaClock, FaSmile, FaAward, } from 'react-icons/fa'
import styles from './Differentials.module.css'

const ITEMS = [
  {
    icon: <GiKnifeFork />,
    title: 'Pratos Feitos',
    text: 'Refeições completas preparadas diariamente.',
  },
  {
    icon: <GiMeal />,
    title: 'Fartura Garantida',
    text: 'Porções generosas, sempre com mais comida no prato.',
  },
  {
    icon: <FaCoffee />,
    title: 'Café',
    text: 'Café fresco durante todo o dia.',
  },
  {
    icon: <FaMoneyBillWave />,
    title: 'Preço',
    text: 'Média entre R$20 e R$45.',
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Localização',
    text: 'Jardim da Glória — São Paulo.',
  },
  {
    icon: <FaClock />,
    title: 'Atendimento Rápido',
    text: 'Ideal para quem está na correria do almoço.',
  },
  {
    icon: <FaSmile />,
    title: 'Atendimento Acolhedor',
    text: 'Ambiente familiar e atendimento simpático.',
  },
  {
    icon: <FaAward />,
    title: 'Tradição',
    text: 'Uma lanchonete tradicional que conquista clientes há anos.',
  }
]

export default function Differentials() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Por que nos escolher</span>
          <h2>Nossos diferenciais</h2>
        </div>

        <div className={styles.grid}>
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
            >
              <div className={styles.iconWrap}>{item.icon}</div>
              <div className={styles.cardTitle}>{item.title}</div>
              <p className={styles.cardText}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
