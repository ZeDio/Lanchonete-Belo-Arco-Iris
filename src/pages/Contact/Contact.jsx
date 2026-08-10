import { motion } from 'framer-motion'
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaDirections } from 'react-icons/fa'
import PageTransition from '../../components/PageTransition/PageTransition.jsx'
import styles from './Contact.module.css'

const MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Rua+Ingl%C3%AAs+de+Sousa%2C+305+-+Jardim+da+Gl%C3%B3ria%2C+S%C3%A3o+Paulo+-+SP%2C+01546-010'

const MAPS_EMBED_URL =
  'https://www.google.com/maps?q=Rua+Ingl%C3%AAs+de+Sousa%2C+305+-+Jardim+da+Gl%C3%B3ria%2C+S%C3%A3o+Paulo+-+SP%2C+01546-010&output=embed'

export default function Contact() {
  return (
    <PageTransition>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Contato</h1>
          <p className={styles.subtitle}>Estamos à sua espera no Jardim da Glória.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <motion.div
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className={styles.cardTitle}>Informações</div>

              <div className={styles.infoRow}>
                <div className={styles.iconWrap}>
                  <FaPhoneAlt />
                </div>
                <div>
                  <div className={styles.infoLabel}>Telefone</div>
                  <div className={styles.infoValue}>
                    <a href="tel:+551135394944">(11) 3539-4944</a>
                  </div>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.iconWrap}>
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <div className={styles.infoLabel}>Endereço</div>
                  <div className={styles.infoValue}>
                    Rua Inglês de Sousa, 305
                    <br />
                    Jardim da Glória
                    <br />
                    São Paulo - SP
                    <br />
                    CEP 01546-010
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
              <div className={styles.cardTitle}>Horário</div>

              <div className={styles.infoRow}>
                <div className={styles.iconWrap}>
                  <FaClock />
                </div>
                <div>
                  <div className={styles.infoLabel}>Segunda a Sexta</div>
                  <div className={styles.infoValue}>07:00 às 20:00</div>
                </div>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.iconWrap}>
                  <FaClock />
                </div>
                <div>
                  <div className={styles.infoLabel}>Sábado</div>
                  <div className={styles.infoValue}>07:30 às 15:00</div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className={styles.mapSection}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="section-heading">
              <span className="eyebrow">Localização</span>
              <h2>Como chegar</h2>
            </div>

            <div className={styles.mapFrameWrap}>
              <iframe
                src={MAPS_EMBED_URL}
                title="Mapa — Lanchonete Belo Arco-Íris"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className={styles.mapActions}>
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                <FaDirections />
                Como Chegar
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
