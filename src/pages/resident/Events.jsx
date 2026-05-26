import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../../components/PageShell'
import DateBox from '../../components/DateBox'
import { supabase } from '../../lib/supabase'

const MOCK_EVENTS = [
  { id: 1, title: 'Tech Talk Round Table', date: '2026-05-22', time: '1:00 pm', location: '17th Floor PDR', capacity: 10, signed_up: 7, waitlisted: 0, waitlist_enabled: false, description: 'Session 3 of 4 — "Your Password, Your Shield" with Aarna, UIC Computer Science Intern. A friendly, jargon-free session on passwords and online security. No tech experience needed — just bring your questions. Please sign up for only one of the four sessions.' },
  { id: 2, title: 'Wine & Cheese Dining', date: '2026-05-24', time: '6:00 pm', location: 'Dining Room', capacity: 10, signed_up: 2, waitlisted: 0, waitlist_enabled: false, description: 'Join us in the Dining Room for an elegant evening of curated wines and artisanal cheeses. Our chef has selected a wonderful variety of local and imported options for your enjoyment.' },
  { id: 3, title: 'Pet Perks A-La-Carte', date: '2026-06-02', time: '10:00 am', location: 'Your Apt.', capacity: 7, signed_up: 7, waitlisted: 3, waitlist_enabled: true, description: 'Pamper your furry companion with our in-apartment pet services! Choose from grooming, nail trimming, and more. Our certified pet care specialist will visit your apartment at your scheduled time.' },
  { id: 4, title: 'Chair Yoga', date: '2026-05-26', time: '9:00 am', location: 'Fitness Center', capacity: 15, signed_up: 10, waitlisted: 0, waitlist_enabled: false, description: 'Start your day with a gentle, seated yoga session designed for all ability levels. Our certified instructor guides you through breathing exercises and stretches that improve flexibility and reduce stress.' },
  { id: 5, title: 'Book Club', date: '2026-06-05', time: '2:00 pm', location: 'Library', capacity: 8, signed_up: 8, waitlisted: 0, waitlist_enabled: false, description: 'This month we are reading "The Covenant of Water" by Abraham Verghese. Light refreshments will be provided. Please read at least the first three chapters before attending.' },
  { id: 6, title: 'Art Workshop', date: '2026-06-10', time: '11:00 am', location: 'Arts Room', capacity: 20, signed_up: 10, waitlisted: 0, waitlist_enabled: false, description: 'Explore watercolor painting in this beginner-friendly workshop led by local artist Susan Morrow. All materials are provided. No prior experience needed — just bring your creativity!' },
]

function pillStyle(event) {
  const isFull = event.signed_up >= event.capacity
  if (!isFull) return { label: `${event.capacity - event.signed_up} spots left`, bg: 'var(--green-bg)', color: 'var(--green)' }
  if (event.waitlist_enabled) return { label: 'Waitlist only', bg: 'var(--amber-bg)', color: '#7A5C10' }
  return { label: 'Full', bg: 'var(--red-bg)', color: 'var(--red)' }
}

function EventCard({ event, onClick }) {
  const pill = pillStyle(event)
  return (
    <div
      onClick={onClick}
      style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 8, padding: '18px 16px', cursor: 'pointer', transition: 'border-color .15s' }}
      onMouseOver={e => (e.currentTarget.style.borderColor = 'var(--gold2)')}
      onMouseOut={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <DateBox dateStr={event.date} />
      <div style={{ fontSize: 15, color: 'var(--dark)', marginBottom: 5, lineHeight: 1.4, fontWeight: 400 }}>{event.title}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>{event.time} · {event.location}</div>
      <span style={{ display: 'inline-block', fontSize: 11, padding: '4px 10px', borderRadius: 20, background: pill.bg, color: pill.color }}>{pill.label}</span>
    </div>
  )
}

export default function Events() {
  const navigate = useNavigate()
  const [events, setEvents] = useState(MOCK_EVENTS)

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .eq('visible', true)
      .order('date')
      .then(({ data }) => { if (data && data.length) setEvents(data) })
  }, [])

  return (
    <PageShell>
      <div style={{ padding: '28px 36px' }}>
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ fontSize: 26, color: 'var(--dark)', fontWeight: 400, letterSpacing: 0.3 }}>Upcoming Events</h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 5 }}>Tap any event to view details and sign up</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {events.map(ev => (
            <EventCard key={ev.id} event={ev} onClick={() => navigate(`/events/${ev.id}`, { state: { event: ev } })} />
          ))}
        </div>
      </div>
    </PageShell>
  )
}
