import { useNavigate } from 'react-router-dom'
import PageShell from '../../components/PageShell'

function LandCard({ primary, icon, title, sub, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: primary ? '2px solid var(--gold)' : '2px solid var(--border)',
        borderRadius: 10,
        padding: '28px 20px',
        textAlign: 'center',
        cursor: 'pointer',
        background: primary ? 'var(--gold)' : 'var(--white)',
        transition: 'opacity .15s',
      }}
      onMouseOver={e => (e.currentTarget.style.opacity = '0.88')}
      onMouseOut={e => (e.currentTarget.style.opacity = '1')}
    >
      <div style={{ fontSize: 36, color: primary ? 'rgba(255,255,255,.85)' : 'var(--gold2)', marginBottom: 12 }}>
        <i className={`ti ${icon}`} aria-hidden="true" />
      </div>
      <div style={{ fontSize: 20, color: primary ? 'var(--white)' : 'var(--dark)', fontWeight: 400 }}>{title}</div>
      <div style={{ fontSize: 13, color: primary ? 'rgba(255,255,255,.8)' : 'var(--muted)', marginTop: 5, lineHeight: 1.5 }}>{sub}</div>
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  return (
    <PageShell>
      <div style={{ padding: '28px 36px', textAlign: 'center' }}>
        <div style={{ fontSize: 30, color: 'var(--dark)', fontWeight: 400, letterSpacing: 0.3, marginBottom: 4 }}>Welcome</div>
        <div style={{ width: 40, height: 2, background: 'var(--gold2)', margin: '12px auto 16px' }} />
        <div style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7 }}>
          Browse and sign up for upcoming events,<br />services, and activities at The Clare.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '28px 0' }}>
          <LandCard primary icon="ti-user" title="I'm a resident" sub="Browse and register for upcoming events" onClick={() => navigate('/events')} />
          <LandCard icon="ti-lock" title="Staff login" sub="Manage events, rosters, and analytics" onClick={() => navigate('/staff')} />
        </div>
        <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--muted)', paddingTop: 20, borderTop: '1px solid var(--border2)' }}>
          Need help? Ask a staff member at the front desk.
        </div>
      </div>
    </PageShell>
  )
}
