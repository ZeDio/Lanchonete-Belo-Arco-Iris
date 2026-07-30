import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './Carousel.module.css'

/**
 * Carrossel simples e genérico de imagens.
 * Uso: <Carousel photos={[{ src, alt }, ...]} interval={4500} />
 * Avança sozinho, mas também dá pra navegar pelas setas ou pelos pontinhos.
 * Basta adicionar mais objetos { src, alt } no array pra incluir novas fotos.
 */
export default function Carousel({ photos = [], interval = 4500 }) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  const goTo = useCallback(
    (i) => {
      if (!photos.length) return
      setIndex(((i % photos.length) + photos.length) % photos.length)
    },
    [photos.length]
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (photos.length <= 1) return
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length)
    }, interval)
    return () => clearInterval(timerRef.current)
  }, [photos.length, interval])

  if (!photos.length) return null

  const restartTimer = () => {
    clearInterval(timerRef.current)
    if (photos.length > 1) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % photos.length)
      }, interval)
    }
  }

  return (
    <div className={styles.carousel}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={styles.slide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <img
            src={photos[index].src}
            alt={photos[index].alt}
            className={styles.slideImg}
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={() => {
              prev()
              restartTimer()
            }}
            aria-label="Foto anterior"
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={() => {
              next()
              restartTimer()
            }}
            aria-label="Próxima foto"
          >
            <FaChevronRight />
          </button>

          <div className={styles.dots}>
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                onClick={() => {
                  goTo(i)
                  restartTimer()
                }}
                aria-label={`Ir para foto ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
