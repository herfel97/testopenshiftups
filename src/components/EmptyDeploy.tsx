import { useId } from 'react'
import '../App.css'

export type EmptyDeployProps = {
  title?: string
  highlightedText?: string
  message?: string
  statusText?: string
  waitingText?: string
}

function EmptyDeploy({
  title = 'Aún no hay nada',
  highlightedText = 'desplegado',
  message = 'Este espacio está listo, pero todavía no se ha publicado ninguna aplicación. Vuelve pronto para descubrir lo que viene.',
  statusText = 'Sin despliegues activos',
  waitingText = 'Esperando el primer despliegue',
}: EmptyDeployProps) {
  const instanceId = useId().replace(/:/g, '')
  const titleId = `empty-deploy-title-${instanceId}`
  const gradientId = `face-fill-${instanceId}`
  const glowId = `face-glow-${instanceId}`

  return (
    <main className="empty-state">
      <div className="ambient ambient--left" aria-hidden="true" />
      <div className="ambient ambient--right" aria-hidden="true" />

      <div className="stars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <section className="empty-card" aria-labelledby={titleId}>
        <div className="status">
          <span className="status__dot" />
          {statusText}
        </div>

        <div className="illustration" aria-hidden="true">
          <div className="orbit orbit--outer" />
          <div className="orbit orbit--inner" />

          <svg
            className="sad-face"
            viewBox="0 0 220 220"
            role="presentation"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fb7185" stopOpacity=".2" />
                <stop offset="100%" stopColor="#7f1d1d" stopOpacity=".08" />
              </linearGradient>
              <filter
                id={glowId}
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle
              className="face__circle"
              cx="110"
              cy="110"
              r="72"
              fill={`url(#${gradientId})`}
            />
            <path className="face__eye" d="M77 97c6-6 13-6 19 0" />
            <path className="face__eye" d="M124 97c6-6 13-6 19 0" />
            <path className="face__mouth" d="M82 143c15-20 41-20 56 0" />
            <path
              className="face__tear"
              d="M143 107c0 0-9 11-9 18a9 9 0 0 0 18 0c0-7-9-18-9-18Z"
              filter={`url(#${glowId})`}
            />
          </svg>

          <span className="signal signal--one">?</span>
          <span className="signal signal--two">·</span>
          <span className="signal signal--three">·</span>
        </div>

        <p className="overline">Parece que llegaste muy temprano</p>
        <h1 id={titleId}>
          {title}
          <span>{highlightedText}</span>
        </h1>
        <p className="message">{message}</p>

        <div className="waiting">
          <span className="waiting__icon" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {waitingText}
        </div>

        <footer className="empty-footer">
          <span>Estado del entorno</span>
          <strong>
            <i />
            Disponible
          </strong>
        </footer>
      </section>
    </main>
  )
}

export default EmptyDeploy
