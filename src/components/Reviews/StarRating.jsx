import { FaStar } from 'react-icons/fa'
import styles from './StarRating.module.css'

/** Exibição estática (somente leitura) de uma nota de 1 a 5 estrelas. */
export function StarDisplay({ rating }) {
  return (
    <span className={styles.stars} aria-label={`${rating} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <FaStar key={n} className={`${styles.star} ${n <= rating ? styles.starFilled : ''}`} />
      ))}
    </span>
  )
}

/** Seletor de estrelas clicável, para o formulário de avaliação. */
export function StarInput({ value, onChange }) {
  return (
    <div className={styles.stars} role="radiogroup" aria-label="Sua nota">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} estrela${n > 1 ? 's' : ''}`}
          className={`${styles.starButton} ${n <= value ? styles.starButtonFilled : ''}`}
          onClick={() => onChange(n)}
        >
          <FaStar />
        </button>
      ))}
    </div>
  )
}
