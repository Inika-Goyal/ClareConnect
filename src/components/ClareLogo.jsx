export default function ClareLogo() {
  return (
    <div style={{ textAlign: 'center', padding: '24px 32px 18px', borderBottom: '1px solid var(--border2)', background: 'var(--white)' }}>
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ display: 'block', margin: '0 auto' }}>
        <circle cx="26" cy="26" r="24" stroke="#B8861A" strokeWidth="1.3" fill="none" />
        <path d="M26 5C18 5 11 12 11 20C11 28 18 35 26 47C34 35 41 28 41 20C41 12 34 5 26 5Z" fill="none" stroke="#B8861A" strokeWidth="1.2" />
        <path d="M5 26C5 18 12 11 20 11C28 11 35 18 47 26C35 34 28 41 20 41C12 41 5 34 5 26Z" fill="none" stroke="#B8861A" strokeWidth="1.2" />
        <circle cx="26" cy="26" r="3.5" fill="#B8861A" />
      </svg>
      <div style={{ fontSize: 21, letterSpacing: 4, color: 'var(--dark)', fontWeight: 400, marginTop: 10 }}>THE CLARE</div>
      <div style={{ fontSize: 9, letterSpacing: 2, color: 'var(--muted)', marginTop: 3 }}>GOLD COAST RETIREMENT LIVING. YOUR WAY.</div>
    </div>
  )
}
