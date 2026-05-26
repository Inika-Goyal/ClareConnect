import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PageShell from '../../components/PageShell'
import BackLink from '../../components/BackLink'
import Btn from '../../components/Btn'
import { supabase } from '../../lib/supabase'

const MOCK_ROSTER = [
  { id: 1, name: 'Dorothy Harrison', phone: '(312) 555-0142', apartment: '412' },
  { id: 2, name: 'Robert Mendez', phone: '(312) 555-0187', apartment: '708' },
  { id: 3, name: 'Eleanor Paxton', phone: '(312) 555-0193', apartment: '1105' },
  { id: 4, name: 'James Whitfield', phone: '(312) 555-0201', apartment: '309' },
  { id: 5, name: 'Helen Ostrowski', phone: '(312) 555-0214', apartment: '822' },
  { id: 6, name: 'Arthur Chen', phone: '(312) 555-0228', apartment: '1504' },
  { id: 7, name: 'Ruth Kaplan', phone: '(312) 555-0235', apartment: '601' },
]

export default function Roster() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { id } = useParams()
  const event = state?.event ?? { id, title: 'Tech Talk Round Table', date: '2026-05-22', time: '1:00 pm', location: '17th Floor PDR', capacity: 10, signed_up: 7, waitlisted: 0 }

  const [roster, setRoster] = useState(MOCK_ROSTER)

  useEffect(() => {
    supabase.from('signups').select('*').eq('event_id', id)
      .then(({ data }) => { if (data && data.length) setRoster(data) })
  }, [id])

  const spotsLeft = (event.capacity ?? 10) - roster.length

  return (
    <PageShell>
      <div style={{ padding: '28px 36px' }}>
        <BackLink to="/staff" label="Back to dashboard" />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 14, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: 24, color: 'var(--dark)', fontWeight: 400 }}>{event.title}</h1>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>
              {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} · {event.time} · {event.location}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <Btn variant="navy" size="md" onClick={() => navigate(`/staff/events/${id}/edit`, { state: { event } })}>
              <i className="ti ti-edit" aria-hidden="true" /> Edit event
            </Btn>
            <Btn variant="gold" size="md">
              <i className="ti ti-download" aria-hidden="true" /> Export
            </Btn>
          </div>
        </div>

        <div style={{ background: 'var(--gold-bg)', borderRadius: 8, padding: '18px 20px', marginBottom: 22, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {[['SIGNED UP', roster.length], ['SPOTS LEFT', Math.max(0, spotsLeft)], ['WAITLISTED', event.waitlisted ?? 0]].map(([lbl, num]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, color: 'var(--gold)', fontWeight: 400 }}>{num}</div>
              <div style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--muted)', marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--gold)', marginBottom: 14 }}>SIGN-UP LIST</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--cream)' }}>
              {['#', 'Name', 'Phone', 'Apt'].map(h => (
                <th key={h} style={{ fontSize: 12, letterSpacing: 1, color: 'var(--muted)', fontWeight: 400, padding: '10px 14px', borderBottom: '2px solid var(--border)', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roster.map((p, i) => (
              <tr key={p.id}>
                <td style={{ fontSize: 16, padding: '15px 14px', borderBottom: '1px solid var(--border2)', color: 'var(--muted)' }}>{i + 1}</td>
                <td style={{ fontSize: 16, padding: '15px 14px', borderBottom: '1px solid var(--border2)', color: 'var(--dark)' }}>{p.name}</td>
                <td style={{ fontSize: 16, padding: '15px 14px', borderBottom: '1px solid var(--border2)', color: 'var(--dark)' }}>{p.phone}</td>
                <td style={{ fontSize: 16, padding: '15px 14px', borderBottom: '1px solid var(--border2)', color: 'var(--dark)' }}>{p.apartment}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ background: 'var(--amber-bg)', borderRadius: 8, padding: '12px 16px', marginTop: 20, fontSize: 14, color: '#7A5C10' }}>
          <i className="ti ti-clock" style={{ marginRight: 6 }} aria-hidden="true" />
          {event.waitlisted > 0
            ? `${event.waitlisted} resident${event.waitlisted > 1 ? 's' : ''} on the waitlist.`
            : 'No one on the waitlist yet. Waitlisted residents appear here automatically when the event is full.'}
        </div>
      </div>
    </PageShell>
  )
}
