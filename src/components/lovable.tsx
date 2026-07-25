import { useId } from 'react'
import './Lovable.css'

export type LovableProps = {
  recipient?: string
  title?: string
  message?: string
  signature?: string
}

const hearts = [
  ['7%', '14px', '-1s', '7s'],
  ['17%', '9px', '-4s', '8s'],
  ['31%', '12px', '-2s', '9s'],
  ['48%', '8px', '-6s', '7.5s'],
  ['64%', '15px', '-3s', '9.5s'],
  ['78%', '10px', '-5s', '8.5s'],
  ['91%', '13px', '-2.5s', '7.8s'],
]

function Lovable({
  recipient = 'Mi dobillo ',
  title = 'Se vendran dias mejores',
  message = 'Sé que hoy no estás pasando por tu mejor momento, y aunque no puedo quitarte el peso que sientes, quiero que recuerdes algo: eres mucho más fuerte de lo que a veces crees. Has superado momentos difíciles antes y también vas a superar este.',
  signature = 'todo pasa chiquis',
}: LovableProps) {
  const titleId = `love-title-${useId().replace(/:/g, '')}`

  return (
    <main className="love-page">
      <div className="love-glow love-glow--one" aria-hidden="true" />
      <div className="love-glow love-glow--two" aria-hidden="true" />

      <div className="floating-hearts" aria-hidden="true">
        {hearts.map(([left, size, delay, duration], index) => (
          <span
            key={index}
            style={{
              left,
              width: size,
              height: size,
              animationDelay: delay,
              animationDuration: duration,
            }}
          />
        ))}
      </div>

      <section className="love-card" aria-labelledby={titleId}>
        <span className="love-spark love-spark--one" aria-hidden="true">✦</span>
        <span className="love-spark love-spark--two" aria-hidden="true">✦</span>

        <p className="love-recipient">Para {recipient}</p>

        <div className="love-heart" aria-hidden="true">
          <span className="love-heart__ring" />
          <svg viewBox="0 0 120 108" role="presentation">
            <path d="M60 103 12 57C-17 27 25-13 55 17l5 5 5-5c30-30 72 10 43 40Z" />
            <path className="love-heart__shine" d="M28 20c-9 4-15 12-16 21" />
          </svg>
          <span className="love-heart__mini love-heart__mini--one">♥</span>
          <span className="love-heart__mini love-heart__mini--two">♥</span>
        </div>

        <p className="love-eyebrow">Una pequeña nota para recordarte que...</p>
        <h1 id={titleId}>{title}</h1>

        <div className="love-divider" aria-hidden="true">
          <span />
          <i>♥</i>
          <span />
        </div>

        <p className="love-message">{message}</p>
        <p className="love-signature">{signature}</p>

        <footer className="love-footer">
          <span>Siempre tú</span>
          <strong>∞</strong>
          <span>Siempre nosotros</span>
        </footer>
      </section>
    </main>
  )
}

export default Lovable
