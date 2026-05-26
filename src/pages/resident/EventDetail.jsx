import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PageShell from '../../components/PageShell'
import BackLink from '../../components/BackLink'
import DateBox from '../../components/DateBox'
import Btn from '../../components/Btn'

export default function EventDetail() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { id } = useParams()

  const event = state?.event ?? {
    id,
    title: 'Tech Talk Round Table',
    date: '2026-05-22',
    time: '1:00 pm',
    location: '17th Floor PDR',
    capacity: 10,
    signed_up: 7,
    description: 'Session 3 of 4 — "Your Password, Your Shield" with Aarna, UIC Computer Science Intern. A friendly, jargon-free session on passwords and online security. No tech experience needed — just bring your questions.',
  }

  const pct = Math.round((event.signed_up / event.capacity) * 100)

  return (
    <PageShell>
      <div style={{ padding: '28px 36px' }}>
        <BackLink to="/events" label="Back to events" />
        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 20, marginBottom: 22 }}>
          <div>
            <DateBox dateStr={event.date} large />
            <div style={{ background: 'var(--gold-bg)', borderRadius: '0 0 8px 8px', padding: '0 18px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 15, color: 'var(--mid)', marginBottom: 9, lineHeight: 1.4 }}>
                <i className="ti ti-clock" style={{ color: 'var(--gold)', fontSize: 16, marginTop: 1, flexShrink: 0 }} aria-hidden="true" />
                {event.time}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 15, color: 'var(--mid)', marginBottom: 9, lineHeight: 1.4 }}>
                <i className="ti ti-map-pin" style={{ color: 'var(--gold)', fontSize: 16, marginTop: 1, flexShrink: 0 }} aria-hidden="true" />
                {event.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 15, color: 'var(--mid)', lineHeight: 1.4 }}>
                <i className="ti ti-users" style={{ color: 'var(--gold)', fontSize: 16, marginTop: 1, flexShrink: 0 }} aria-hidden="true" />
                {event.signed_up} of {event.capacity} signed up
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 22, color: 'var(--dark)', fontWeight: 400, marginBottom: 12 }}>{event.title}</h2>
            <p style={{ fontSize: 15, color: 'var(--mid)', lineHeight: 1.75, marginBottom: 18 }}>{event.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>
              <span>Spots filled</span>
              <span style={{ color: 'var(--gold)' }}>{event.signed_up} / {event.capacity}</span>
            </div>
            <div style={{ height: 6, background: 'var(--border2)', borderRadius: 3, marginBottom: 22 }}>
              <div style={{ height: 6, background: 'var(--gold2)', borderRadius: 3, width: `${pct}%` }} />
            </div>
            <div style={{ fontSize: 13, letterSpacing: 1.5, color: 'var(--gold)', marginBottom: 14 }}>WOULD YOU LIKE TO REGISTER?</div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Btn variant="gold" size="lg" style={{ flex: 1 }} onClick={() => navigate(`/events/${event.id}/signup`, { state: { event } })}>
                <i className="ti ti-check" aria-hidden="true" /> Yes, sign me up
              </Btn>
              <Btn variant="slate" size="lg" style={{ flex: 1 }} onClick={() => navigate('/events')}>
                <i className="ti ti-arrow-left" aria-hidden="true" /> No, go back
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
