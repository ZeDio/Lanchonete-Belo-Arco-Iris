import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GiMeal } from 'react-icons/gi'
import menuData from '../../data/menu.json'
import styles from './DailySpecial.module.css'

const WEEKDAYS = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
]

function formatPrice(price) {
  if (price === null || price === undefined) return null
  return `R$ ${Number(price).toFixed(2).replace('.', ',')}`
}

export default function DailySpecial() {
  const todayName = WEEKDAYS[new Date().getDay()]
  const category = menuData.categories.find((cat) => cat.id === 'pratos-do-dia')
  const today = category?.days?.find((d) => d.day === todayName)

  // Sem prato do dia cadastrado para hoje (ex.: domingo) — não exibe o aviso.
  if (!today || !today.items?.length) return null

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.wrap}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className={styles.ring} aria-hidden="true" />

          <div className={styles.iconWrap}>
            <GiMeal />
          </div>

          <div className={styles.content}>
            <span className={styles.eyebrow}>Prato do dia · {todayName}</span>
            <div className={styles.dishList}>
              {today.items.map((item) => (
                <span key={item.name} className={styles.dishItem}>
                  {item.name}
                  {formatPrice(item.price) && (
                    <span className={styles.dishPrice}>{formatPrice(item.price)}</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.action}>
            <Link to="/cardapio#pratos-do-dia" className="btn btn--light">
              Ver Cardápio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
