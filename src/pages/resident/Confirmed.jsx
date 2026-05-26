import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageShell from '../../components/PageShell'

export default function Confirmed() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const event = state?.event ?? { title: 'Tech Talk Round Table', date: '2026-05-22', time: '1:00 pm', location: '17th Floor PDR' }
  const [count, setCount] = useState(5)

  const dateObj = new Date(event.date + 'T00:00:00')
  const dateLabel = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => {
        if (c <= 1) { clearInterval(timer); navigate('/events'); return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [navigate])

  return (
    <PageShell>
      <div style={{ minHeight: 440, background: 'rgba(28,28,28,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'var(--white)', borderRadius: 12, padding: '40px 32px', textAlign: 'center', maxWidth: 320, width: '90%' }}>
          <i className="ti ti-circle-check" style={{ fontSize: 60, color: 'var(--green)', display: 'block', marginBottom: 14 }} aria-hidden="true" />
          <div style={{ fontSize: 24, color: 'var(--dark)', fontWeight: 400, marginBottom: 10 }}>You're signed up!</div>
          <div style={{ fontSize: 15, color: 'var(--mid)', lineHeight: 1.7 }}>
            You've been added to<br />
            <strong>{event.title}</strong><br />
            {dateLabel} · {event.time}<br />
            {event.location}
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 16 }}>
            Returning to events in <span style={{ fontWeight: 600 }}>{count}s</span>…
          </div>
        </div>
      </div>
    </PageShell>
  )
}
