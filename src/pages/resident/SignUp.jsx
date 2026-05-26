import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PageShell from '../../components/PageShell'
import BackLink from '../../components/BackLink'
import Btn from '../../components/Btn'
import { supabase } from '../../lib/supabase'

const MOCK_ROSTER = [
  { id: 1, name: 'Dorothy H.', apartment: '412' },
  { id: 2, name: 'Robert M.', apartment: '708' },
  { id: 3, name: 'Eleanor P.', apartment: '1105' },
]

const inputStyle = {
  width: '100%', padding: '15px 16px', border: '1.5px solid var(--border)', borderRadius: 7,
  fontSize: 18, background: 'var(--white)', color: 'var(--dark)', fontFamily: 'inherit', marginBottom: 18,
  outline: 'none',
}

const labelStyle = { fontSize: 11, letterSpacing: 1.5, color: 'var(--gold)', display: 'block', marginBottom: 7 }

export default function SignUp() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { id } = useParams()

  const event = state?.event ?? { id, title: 'Tech Talk Round Table', date: '2026-05-22', time: '1:00 pm', location: '17th Floor PDR' }

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [apt, setApt] = useState('')
  const [cancelTarget, setCancelTarget] = useState(null)
  const [roster, setRoster] = useState(MOCK_ROSTER)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !apt.trim()) return
    setSubmitting(true)
    const { error } = await supabase.from('signups').insert({ event_id: event.id, name, phone, apartment: apt })
    setSubmitting(false)
    if (!error) navigate(`/events/${event.id}/confirmed`, { state: { event } })
  }

  function handleCancel(person) {
    setCancelTarget(person)
    navigate(`/events/${event.id}/cancel`, { state: { event, person } })
  }

  const dateObj = new Date(event.date + 'T00:00:00')
  const dateLabel = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <PageShell>
      <div style={{ padding: '28px 36px' }}>
        <BackLink to={`/events/${event.id}`} label="Back to event" />
        <div style={{ background: 'var(--gold-bg)', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
          <div style={{ fontSize: 19, color: 'var(--dark)', fontWeight: 400 }}>{event.title}</div>
          <div style={{ fontSize: 14, color: 'var(--mid)', marginTop: 4 }}>{dateLabel} · {event.time} · {event.location}</div>
        </div>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>YOUR NAME</label>
          <input style={inputStyle} type="text" placeholder="e.g. Margaret Smith" value={name} onChange={e => setName(e.target.value)} required />
          <label style={labelStyle}>PHONE NUMBER</label>
          <input style={inputStyle} type="tel" placeholder="(312) 555-0100" value={phone} onChange={e => setPhone(e.target.value)} />
          <label style={labelStyle}>APARTMENT NUMBER (your PIN)</label>
          <input style={inputStyle} type="tel" placeholder="e.g. 802" maxLength={4} value={apt} onChange={e => setApt(e.target.value)} required />
          <Btn variant="gold" size="lg" full type="submit" style={{ opacity: submitting ? 0.7 : 1 }}>
            <i className="ti ti-check" aria-hidden="true" /> {submitting ? 'Submitting…' : 'Confirm sign-up'}
          </Btn>
        </form>

        <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--gold)', margin: '26px 0 12px' }}>CURRENT SIGN-UP LIST</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ fontSize: 12, letterSpacing: 1, color: 'var(--muted)', fontWeight: 400, padding: '10px 12px', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>Name</th>
              <th style={{ fontSize: 12, letterSpacing: 1, color: 'var(--muted)', fontWeight: 400, padding: '10px 12px', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>Apt</th>
              <th style={{ width: 110, borderBottom: '1px solid var(--border)' }} />
            </tr>
          </thead>
          <tbody>
            {roster.map(p => (
              <tr key={p.id}>
                <td style={{ fontSize: 16, padding: '14px 12px', borderBottom: '1px solid var(--border2)', color: 'var(--dark)', verticalAlign: 'middle' }}>{p.name}</td>
                <td style={{ fontSize: 16, padding: '14px 12px', borderBottom: '1px solid var(--border2)', color: 'var(--dark)', verticalAlign: 'middle' }}>{p.apartment}</td>
                <td style={{ textAlign: 'right', padding: '14px 12px', borderBottom: '1px solid var(--border2)', verticalAlign: 'middle' }}>
                  <Btn variant="red" size="sm" onClick={() => handleCancel(p)}>
                    <i className="ti ti-x" aria-hidden="true" /> Cancel
                  </Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  )
}
