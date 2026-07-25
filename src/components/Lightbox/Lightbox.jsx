import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import styles from './Lightbox.module.css'

export default function Lightbox({ src, alt, onClose }) {
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={alt}
      >
        <motion.div
          className={styles.imageWrap}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={src}
            alt={alt}
            className={`${styles.image} ${zoomed ? styles.zoomed : ''}`}
            onClick={() => setZoomed((z) => !z)}
          />
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar imagem ampliada">
            <HiX />
          </button>
          <span className={styles.hint}>Clique na imagem para ampliar · Esc para fechar</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
