import { useEffect, useId, useState } from 'react'
import './FullDepoy.css'

export type FullDepoyProps = {
  title?: string
  highlightedText?: string
  message?: string
  statusText?: string
  footerText?: string
}

const confetti = [
  { left: '8%', delay: '0s', color: '#34d399', rotate: '18deg' },
  { left: '17%', delay: '.35s', color: '#fbbf24', rotate: '65deg' },
  { left: '28%', delay: '.1s', color: '#60a5fa', rotate: '115deg' },
  { left: '40%', delay: '.55s', color: '#f472b6', rotate: '35deg' },
  { left: '55%', delay: '.2s', color: '#a78bfa', rotate: '80deg' },
  { left: '68%', delay: '.7s', color: '#34d399', rotate: '140deg' },
  { left: '80%', delay: '.15s', color: '#fbbf24', rotate: '45deg' },
  { left: '91%', delay: '.45s', color: '#60a5fa', rotate: '100deg' },
]

function FullDepoy({
  title = 'Despliegue de tesis',
  highlightedText = 'exitoso',
  message = 'La aplicación fue publicada correctamente y ya se encuentra en línea.',
  statusText = 'Despliegue completado',
  footerText = 'Sistema operativo y funcionando',
}: FullDepoyProps) {
  const [now, setNow] = useState(() => new Date())
  const titleId = `full-deploy-title-${useId().replace(/:/g, '')}`

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const hours = now.getHours() % 12
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const hourAngle = hours * 30 + minutes * 0.5
  const minuteAngle = minutes * 6 + seconds * 0.1
  const secondAngle = seconds * 6

  const time = new Intl.DateTimeFormat('es-EC', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now)

  const date = new Intl.DateTimeFormat('es-EC', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(now)

  return (
    <main className="full-deploy">
      <div className="full-deploy__glow full-deploy__glow--one" aria-hidden="true" />
      <div className="full-deploy__glow full-deploy__glow--two" aria-hidden="true" />

      <section className="full-card" aria-labelledby={titleId}>
        <div className="full-confetti" aria-hidden="true">
          {confetti.map((piece, index) => (
            <span
              key={index}
              style={{
                left: piece.left,
                animationDelay: piece.delay,
                backgroundColor: piece.color,
                rotate: piece.rotate,
              }}
            />
          ))}
        </div>

        <div className="full-status">
          <span className="full-status__dot" />
          {statusText}
        </div>

        <div className="full-checkmark" aria-hidden="true">
          <svg viewBox="0 0 64 64">
            <circle className="full-checkmark__circle" cx="32" cy="32" r="29" />
            <path className="full-checkmark__tick" d="M18 33.5 27.5 43 47 22.5" />
          </svg>
        </div>

        <p className="full-overline">¡Todo está listo!</p>
        <h1 id={titleId}>
          {title}
          <span>{highlightedText}</span>
        </h1>
        <p className="full-message">{message}</p>

        <div className="full-divider" />

        <div className="full-time">
          <div className="full-clock" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <i
                key={index}
                className="full-clock__mark"
                style={{ transform: `rotate(${index * 30}deg)` }}
              />
            ))}
            <span
              className="full-clock__hand full-clock__hand--hour"
              style={{ transform: `translateX(-50%) rotate(${hourAngle}deg)` }}
            />
            <span
              className="full-clock__hand full-clock__hand--minute"
              style={{ transform: `translateX(-50%) rotate(${minuteAngle}deg)` }}
            />
            <span
              className="full-clock__hand full-clock__hand--second"
              style={{ transform: `translateX(-50%) rotate(${secondAngle}deg)` }}
            />
            <span className="full-clock__center" />
          </div>

          <div className="full-digital-time">
            <span className="full-digital-time__label">Hora del despliegue</span>
            <time dateTime={now.toISOString()}>{time}</time>
            <span className="full-digital-time__date">{date}</span>
          </div>
        </div>

        <footer className="full-footer">
          <span className="full-footer__check">✓</span>
          {footerText}
        </footer>
      </section>
    </main>
  )
}

export default FullDepoy
