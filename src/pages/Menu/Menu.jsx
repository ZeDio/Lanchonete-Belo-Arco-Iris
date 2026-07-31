import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearchPlus, FaFilePdf, FaImage } from 'react-icons/fa'
import PageTransition from '../../components/PageTransition/PageTransition.jsx'
import Lightbox from '../../components/Lightbox/Lightbox.jsx'
import menuData from '../../data/menu.json'
import styles from './Menu.module.css'

const PAGES = [
  { src: '/assets/cardapio-frente.svg', alt: 'Cardápio Belo Arco-Íris — página 1' },
  { src: '/assets/cardapio-verso.svg', alt: 'Cardápio Belo Arco-Íris — página 2' },
]

function formatPrice(price) {
  if (price === null || price === undefined) return '—'
  return `R$ ${Number(price).toFixed(2).replace('.', ',')}`
}

function ItemRow({ item, showPhotos, onImageClick }) {
  const isPending = item.price === null || item.price === undefined

  if (showPhotos && item.image) {
    return (
      <div className={styles.itemRowPhoto}>
        <button
          type="button"
          className={styles.itemPhotoButton}
          onClick={() => onImageClick(item)}
          aria-label={`Ampliar foto de ${item.name}`}
        >
          <img src={item.image} alt={item.name} className={styles.itemPhoto} loading="lazy" />
          <span className={styles.itemPhotoZoomIcon} aria-hidden="true">
            <FaSearchPlus />
          </span>
        </button>
        <div className={styles.itemPhotoText}>
          <span className={styles.itemName}>{item.name}</span>
          <span className={`${styles.itemPrice} ${isPending ? styles.pending : ''}`}>
            {formatPrice(item.price)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.itemRow}>
      <span className={styles.itemName}>{item.name}</span>
      <span className={styles.itemDots} aria-hidden="true" />
      <span className={`${styles.itemPrice} ${isPending ? styles.pending : ''}`}>
        {formatPrice(item.price)}
      </span>
    </div>
  )
}

export default function Menu() {
  const [active, setActive] = useState(null)
  const [showPhotos, setShowPhotos] = useState(false)
  const openItemPhoto = (item) => setActive({ src: item.image, alt: item.name })

  return (
    <>
      <PageTransition>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Nosso Cardápio</h1>
          <p className={styles.subtitle}>Confira todas as opções disponíveis.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <nav className={styles.quickNav} aria-label="Categorias do cardápio">
            {menuData.categories.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className={styles.navChip}>
                {cat.title}
              </a>
            ))}
          </nav>

          {menuData.categories.map((cat, ci) => (
            <motion.div
              key={cat.id}
              id={cat.id}
              className={styles.categorySection}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (ci % 3) * 0.06, ease: 'easeOut' }}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryTitle}>{cat.title}</span>
              </div>

              {cat.items && (
                <div className={styles.itemsGrid}>
                  {cat.items.map((item) => (
                    <ItemRow key={item.name} item={item} showPhotos={showPhotos} onImageClick={openItemPhoto} />
                  ))}
                </div>
              )}

              {cat.subcategories &&
                cat.subcategories.map((sub) => (
                  <div key={sub.title}>
                    <div className={styles.subcategoryTitle}>{sub.title}</div>
                    <div className={styles.itemsGrid}>
                      {sub.items.map((item) => (
                        <ItemRow key={item.name} item={item} showPhotos={showPhotos} onImageClick={openItemPhoto} />
                      ))}
                    </div>
                  </div>
                ))}

              {cat.days && (
                <div className={styles.dayGrid}>
                  {cat.days.map((d) => (
                    <div key={d.day} className={styles.dayCard}>
                      <div className={styles.dayTitle}>{d.day}</div>
                      {d.items.map((item) => (
                        <ItemRow key={item.name} item={item} showPhotos={showPhotos} onImageClick={openItemPhoto} />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          <div className={styles.originalSection}>
            <div className={styles.originalHeading}>
              <span className="eyebrow">Cardápio original</span>
              <h2>Prefere ver a arte completa?</h2>
              <p>Veja as páginas originais do cardápio impresso ou baixe em PDF.</p>
            </div>

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
        </div>
      </section>
      </PageTransition>

      <button
        type="button"
        role="switch"
        aria-checked={showPhotos}
        aria-label="Ver cardápio com fotos"
        className={`${styles.floatingToggle} ${showPhotos ? styles.floatingToggleOn : ''}`}
        onClick={() => setShowPhotos((v) => !v)}
      >
        <FaImage />
        <span className={styles.floatingToggleLabel}>Ver com fotos</span>
        <span className={styles.switchTrack}>
          <span className={styles.switchThumb} />
        </span>
      </button>

      {active && (
        <Lightbox src={active.src} alt={active.alt} onClose={() => setActive(null)} />
      )}
    </>
  )
}
