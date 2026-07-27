import { FaPhoneAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <span className={styles.brandTitle}>Lanchonete Belo Arco-Íris</span>
            <p className={styles.brandText}>
              Tradição, sabor e qualidade no Jardim da Glória, São Paulo. Pratos feitos, cafés e
              refeições caseiras todos os dias.
            </p>
          </div>

          <div>
            <div className={styles.colTitle}>Contato</div>
            <div className={styles.row}>
              <FaPhoneAlt />
              <span>(11) 3539-4944</span>
            </div>
            <div className={styles.row}>
              <FaMapMarkerAlt />
              <span>
                Rua Inglês de Sousa, 305 — Jardim da Glória, São Paulo - SP, CEP 01546-010
              </span>
            </div>
          </div>

          <div>
            <div className={styles.colTitle}>Horário de funcionamento</div>
            <div className={styles.row}>
              <FaClock />
              <span>Segunda à Sexta — 07:00 às 20:00</span>
            </div>
            <div className={styles.row}>
              <FaClock />
              <span>Sábado e Domingo — 07:30 às 15:00</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} Lanchonete Belo Arco-Íris. Todos os direitos reservados.</span>
          <span>Jardim da Glória, São Paulo - SP</span>
        </div>
      </div>
    </footer>
  )
}
