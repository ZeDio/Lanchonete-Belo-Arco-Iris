import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { FaTrash } from 'react-icons/fa'
import PageTransition from '../../components/PageTransition/PageTransition.jsx'
import { StarDisplay } from '../../components/Reviews/StarRating.jsx'
import { auth, db } from '../../lib/firebase.js'
import styles from './AdminReviews.module.css'

function formatDate(timestamp) {
  if (!timestamp?.toDate) return ''
  return timestamp.toDate().toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminReviews() {
  const [authReady, setAuthReady] = useState(false)
  const [authError, setAuthError] = useState('')
  const [reviews, setReviews] = useState([])
  const [loadingList, setLoadingList] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  // Entra de forma anônima e silenciosa — não existe tela de login,
  // isso só libera a permissão de excluir nas regras do Firestore.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthReady(true)
      } else {
        signInAnonymously(auth).catch((err) => setAuthError(err.message))
      }
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'))
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

  async function handleDelete(id) {
    if (!window.confirm('Excluir esta avaliação? Essa ação não pode ser desfeita.')) return
    setDeletingId(id)
    try {
      await deleteDoc(doc(db, 'reviews', id))
    } catch (err) {
      window.alert('Não foi possível excluir: ' + err.message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <PageTransition>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Gerenciar avaliações</h1>
          <p className={styles.subtitle}>Página interna — não é divulgada no site.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {authError && (
            <div className={`${styles.statusBar} ${styles.statusError}`}>
              Não foi possível conectar: {authError}. Verifique se o método "Anônimo" está
              ativado em Firebase Console → Authentication → Sign-in method.
            </div>
          )}

          {!authError && !authReady && (
            <div className={`${styles.statusBar} ${styles.statusOk}`}>Conectando...</div>
          )}

          <div className={styles.list}>
            {loadingList && <div className={styles.empty}>Carregando avaliações...</div>}

            {!loadingList && reviews.length === 0 && (
              <div className={styles.empty}>Nenhuma avaliação cadastrada.</div>
            )}

            {reviews.map((r) => (
              <div key={r.id} className={styles.card}>
                {r.photo && (
                  <img src={r.photo} alt={`Foto de ${r.name}`} className={styles.cardPhoto} />
                )}
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardName}>{r.name}</span>
                    <span className={styles.cardDate}>{formatDate(r.createdAt)}</span>
                  </div>
                  <StarDisplay rating={r.rating} />
                  <p className={styles.cardComment} style={{ marginTop: 6 }}>
                    {r.comment}
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  disabled={!authReady || deletingId === r.id}
                  onClick={() => handleDelete(r.id)}
                >
                  <FaTrash />
                  {deletingId === r.id ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
