import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PageShell from '../../components/PageShell'
import BackLink from '../../components/BackLink'
import Btn from '../../components/Btn'
import { supabase } from '../../lib/supabase'

const inputStyle = {
  width: '100%', padding: '14px 16px', border: '1.5px solid var(--border)', borderRadius: 7,
  fontSize: 17, background: 'var(--white)', color: 'var(--dark)', fontFamily: 'inherit', marginBottom: 14, outline: 'none',
}
const labelStyle = { fontSize: 11, letterSpacing: 1.5, color: 'var(--gold)', display: 'block', marginBottom: 7 }

function Toggle({ on, onToggle }) {
  return (
    <div
      role="switch"
      aria-checked={on}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={e => e.key === 'Enter' && onToggle()}
      style={{ width: 52, height: 28, background: on ? 'var(--gold)' : '#ccc', borderRadius: 14, position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background .2s' }}
    >
      <div style={{ position: 'absolute', width: 22, height: 22, background: 'var(--white)', borderRadius: '50%', top: 3, left: on ? undefined : 4, right: on ? 4 : undefined, transition: 'left .2s, right .2s' }} />
    </div>
  )
}

export default function EditEvent() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { id } = useParams()
  const isNew = id === 'new'

  const ev = state?.event ?? {}

  const [form, setForm] = useState({
    title: ev.title ?? '',
    date: ev.date ?? '',
    time: ev.time ?? '',
    location: ev.location ?? '',
    capacity: ev.capacity ?? 10,
    subtitle: ev.subtitle ?? '',
    description: ev.description ?? '',
    note: ev.note ?? '',
    waitlist_enabled: ev.waitlist_enabled ?? true,
    visible: ev.visible ?? true,
  })
  const [saving, setSaving] = useState(false)

  function set(key) { return e => setForm(f => ({ ...f, [key]: e.target.value })) }
  function toggle(key) { return () => setForm(f => ({ ...f, [key]: !f[key] })) }

  async function handleSave() {
    setSaving(true)
    if (isNew) {
      await supabase.from('events').insert(form)
    } else {
      await supabase.from('events').update(form).eq('id', id)
    }
    setSaving(false)
    navigate('/staff')
  }

  return (
    <PageShell>
      <div style={{ padding: '28px 36px' }}>
        <BackLink to="/staff" label="Back to dashboard" />
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ fontSize: 26, color: 'var(--dark)', fontWeight: 400 }}>{isNew ? 'New Event' : 'Edit Event'}</h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 5 }}>Changes update immediately for residents</p>
        </div>

        <Section title="EVENT DETAILS">
          <label style={labelStyle}>EVENT TITLE</label>
          <input style={inputStyle} type="text" value={form.title} onChange={set('title')} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div><label style={labelStyle}>DATE</label><input style={inputStyle} type="date" value={form.date} onChange={set('date')} /></div>
            <div><label style={labelStyle}>TIME</label><input style={inputStyle} type="time" value={form.time} onChange={set('time')} /></div>
          </div>
          <label style={labelStyle}>LOCATION</label>
          <input style={inputStyle} type="text" value={form.location} onChange={set('location')} />
          <label style={labelStyle}>CAPACITY (max sign-ups)</label>
          <input style={{ ...inputStyle, maxWidth: 120 }} type="number" value={form.capacity} onChange={set('capacity')} />
        </Section>

        <Section title="EVENT BLURB (what residents see)">
          <label style={labelStyle}>SUBTITLE</label>
          <input style={inputStyle} type="text" value={form.subtitle} onChange={set('subtitle')} />
          <label style={labelStyle}>DESCRIPTION</label>
          <textarea
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical', lineHeight: 1.6 }}
            value={form.description}
            onChange={set('description')}
          />
          <label style={labelStyle}>SPECIAL NOTE (optional)</label>
          <input style={inputStyle} type="text" placeholder="e.g. Please only sign up for one session" value={form.note} onChange={set('note')} />
        </Section>

        <Section title="SETTINGS">
          <ToggleRow label="Allow waitlist when full" on={form.waitlist_enabled} onToggle={toggle('waitlist_enabled')} />
          <ToggleRow label="Event is visible to residents" on={form.visible} onToggle={toggle('visible')} />
        </Section>

        <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
          <Btn variant="green" size="lg" style={{ flex: 2, opacity: saving ? 0.7 : 1 }} onClick={handleSave}>
            <i className="ti ti-device-floppy" aria-hidden="true" /> {saving ? 'Saving…' : 'Save changes'}
          </Btn>
          <Btn variant="slate" size="lg" style={{ flex: 1 }} onClick={() => navigate('/staff')}>
            <i className="ti ti-x" aria-hidden="true" /> Discard
          </Btn>
        </div>
      </div>
    </PageShell>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--gold)', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--border2)' }}>{title}</div>
      {children}
    </div>
  )
}

function ToggleRow({ label, on, onToggle }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', border: '1.5px solid var(--border)', borderRadius: 7, marginBottom: 14 }}>
      <span style={{ fontSize: 16, color: 'var(--dark)' }}>{label}</span>
      <Toggle on={on} onToggle={onToggle} />
    </div>
  )
}
