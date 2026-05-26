import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../../components/PageShell'
import DateBox from '../../components/DateBox'
import Btn from '../../components/Btn'
import { supabase } from '../../lib/supabase'

const MOCK_EVENTS = [
  { id: 1, title: 'Tech Talk Round Table', date: '2026-05-22', time: '1:00 pm', location: '17th Fl.', capacity: 10, signed_up: 7, waitlisted: 0 },
  { id: 2, title: 'Pet Perks A-La-Carte', date: '2026-06-02', time: '10:00 am', location: 'Your Apt.', capacity: 7, signed_up: 7, waitlisted: 3 },
  { id: 3, title: 'Wine & Cheese Dining', date: '2026-05-24', time: '6:00 pm', location: 'Dining Room', capacity: 10, signed_up: 2, waitlisted: 0 },
]

function StatCard({ num, label }) {
  return (
    <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 8, padding: 20, textAlign: 'center' }}>
      <div style={{ fontSize: 34, color: 'var(--gold)', fontWeight: 400 }}>{num}</div>
      <div style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--muted)', marginTop: 5 }}>{label}</div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [events, setEvents] = useState(MOCK_EVENTS)

  useEffect(() => {
    supabase.from('events').select('*').order('date')
      .then(({ data }) => { if (data && data.length) setEvents(data) })
  }, [])

  const totalSignups = events.reduce((s, e) => s + (e.signed_up ?? 0), 0)
  const totalWaiting = events.reduce((s, e) => s + (e.waitlisted ?? 0), 0)

  return (
    <PageShell>
      <div style={{ padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div>
            <h1 style={{ fontSize: 26, color: 'var(--dark)', fontWeight: 400 }}>Staff Dashboard</h1>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 5 }}>Manage events, view rosters, and export data</p>
          </div>
          <Btn variant="slate" size="sm" onClick={() => navigate('/')}>
            <i className="ti ti-arrow-left" aria-hidden="true" /> Exit
          </Btn>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
          <StatCard num={events.length} label="ACTIVE EVENTS" />
          <StatCard num={totalSignups} label="TOTAL SIGNUPS" />
          <StatCard num={totalWaiting} label="WAITLISTED" />
        </div>

        <Btn variant="gold" size="lg" full style={{ marginBottom: 24 }} onClick={() => navigate('/staff/events/new')}>
          <i className="ti ti-plus" aria-hidden="true" /> Add new event
        </Btn>

        <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--gold)', marginBottom: 14 }}>ALL EVENTS — tap a row to view full roster</div>

        {events.map(ev => (
          <div
            key={ev.id}
            onClick={() => navigate(`/staff/events/${ev.id}`, { state: { event: ev } })}
            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 18, background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 8, marginBottom: 12, cursor: 'pointer', transition: 'border-color .15s' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = 'var(--gold2)')}
            onMouseOut={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <div style={{ background: 'var(--gold-bg)', borderRadius: 6, padding: '8px 10px', textAlign: 'center', minWidth: 50, flexShrink: 0 }}>
              <DateBox dateStr={ev.date} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, color: 'var(--dark)', fontWeight: 400 }}>{ev.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>
                {ev.time} · {ev.location} · {ev.signed_up}/{ev.capacity} signed up
                {ev.waitlisted > 0 && ` · ${ev.waitlisted} waitlisted`}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <Btn variant="navy" size="sm" onClick={e => { e.stopPropagation(); navigate(`/staff/events/${ev.id}/edit`, { state: { event: ev } }) }}>
                <i className="ti ti-edit" aria-hidden="true" /> Edit
              </Btn>
              <Btn variant="slate" size="sm" onClick={e => e.stopPropagation()}>
                <i className="ti ti-download" aria-hidden="true" /> Export
              </Btn>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
