import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { FaCamera, FaTimes } from 'react-icons/fa'
import { db } from '../../lib/firebase.js'
import { fileToCompressedDataUrl } from '../../lib/imageToBase64.js'
import { StarDisplay, StarInput } from './StarRating.jsx'
import Lightbox from '../Lightbox/Lightbox.jsx'
import styles from './Reviews.module.css'

const COMMENT_MAX = 500
const NAME_MAX = 60

function formatDate(timestamp) {
  if (!timestamp?.toDate) return ''
  return timestamp.toDate().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loadingList, setLoadingList] = useState(true)

  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [photo, setPhoto] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [activePhoto, setActivePhoto] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(50))
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setReviews(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
        setLoadingList(false)
      },
      () => setLoadingList(false)
    )
    return unsubscribe
  }, [])

  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : null

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const dataUrl = await fileToCompressedDataUrl(file)
      setPhoto(dataUrl)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Digite seu nome.')
      return
    }
    if (rating < 1) {
      setError('Escolha uma nota de 1 a 5 estrelas.')
      return
    }
    if (!comment.trim()) {
      setError('Escreva um comentário.')
      return
    }

    setSubmitting(true)
    try {
      await addDoc(collection(db, 'reviews'), {
        name: name.trim().slice(0, NAME_MAX),
        rating,
        comment: comment.trim().slice(0, COMMENT_MAX),
        photo: photo || null,
        createdAt: serverTimestamp(),
      })
      setName('')
      setRating(0)
      setComment('')
      setPhoto(null)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError('Não foi possível enviar sua avaliação. Tente novamente em instantes.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section section--alt" id="avaliacoes">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">O que dizem sobre nós</span>
          <h2>Avaliações dos clientes</h2>
          <p>Deixe sua avaliação e ajude outros clientes a conhecer a lanchonete.</p>
        </div>

        <div className={styles.wrap}>
          <motion.form
            className={styles.formCard}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className={styles.formTitle}>Deixe sua avaliação</div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="review-name">
                Seu nome
              </label>
              <input
                id="review-name"
                className={styles.input}
                type="text"
                value={name}
                maxLength={NAME_MAX}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como quer aparecer"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Sua nota</label>
              <StarInput value={rating} onChange={setRating} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="review-comment">
                Comentário
              </label>
              <textarea
                id="review-comment"
                className={styles.textarea}
                value={comment}
                maxLength={COMMENT_MAX}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Conte como foi sua experiência"
              />
              <div className={styles.charCount}>
                {comment.length}/{COMMENT_MAX}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Foto (opcional)</label>
              <div className={styles.photoRow}>
                {photo && (
                  <>
                    <img src={photo} alt="Prévia da foto" className={styles.photoPreview} />
                    <button
                      type="button"
                      className={styles.removePhoto}
                      onClick={() => setPhoto(null)}
                    >
                      Remover
                    </button>
                  </>
                )}
                {!photo && (
                  <label className={styles.fileLabel}>
                    <FaCamera />
                    Escolher foto
                    <input
                      type="file"
                      accept="image/*"
                      className={styles.fileInput}
                      onChange={handlePhotoChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {error && <div className={styles.errorMsg}>{error}</div>}
            {success && (
              <div className={styles.successMsg}>
                Obrigado! Sua avaliação foi publicada.
              </div>
            )}

            <button type="submit" className={`btn btn--primary ${styles.submitBtn}`} disabled={submitting}>
              {submitting ? 'Enviando...' : 'Publicar avaliação'}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            <div className={styles.listHeader}>
              <div className={styles.avgWrap}>
                {average && (
                  <>
                    <span className={styles.avgValue}>{average}</span>
                    <StarDisplay rating={Math.round(Number(average))} />
                  </>
                )}
              </div>
              {reviews.length > 0 && (
                <span className={styles.avgCount}>{reviews.length} avaliação(ões)</span>
              )}
            </div>

            <div className={styles.list}>
              {loadingList && <div className={styles.empty}>Carregando avaliações...</div>}

              {!loadingList && reviews.length === 0 && (
                <div className={styles.empty}>
                  Ainda não há avaliações. Seja o primeiro a avaliar!
                </div>
              )}

              {reviews.map((r, i) => (
                <motion.div
                  key={r.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05, ease: 'easeOut' }}
                >
                  {r.photo && (
                    <img
                      src={r.photo}
                      alt={`Foto enviada por ${r.name}`}
                      className={styles.cardPhoto}
                      onClick={() => setActivePhoto({ src: r.photo, alt: `Foto enviada por ${r.name}` })}
                    />
                  )}
                  <div className={styles.cardBody}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardName}>{r.name}</span>
                      <span className={styles.cardDate}>{formatDate(r.createdAt)}</span>
                    </div>
                    <StarDisplay rating={r.rating} />
                    <p className={styles.cardComment} style={{ marginTop: 8 }}>
                      {r.comment}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {activePhoto && (
        <Lightbox src={activePhoto.src} alt={activePhoto.alt} onClose={() => setActivePhoto(null)} />
      )}
    </section>
  )
}
