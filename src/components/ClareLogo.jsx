import clareLogo from '../assets/clare_logo.png'

export default function ClareLogo() {
  return (
    <div style={{ textAlign: 'center', padding: '24px 32px 18px', borderBottom: '1px solid var(--border2)', background: 'var(--white)' }}>
      <img src={clareLogo} alt="The Clare logo" width="52" height="52" style={{ display: 'block', margin: '0 auto' }} />
      <div style={{ fontSize: 21, letterSpacing: 4, color: 'var(--dark)', fontWeight: 400, marginTop: 10 }}>THE CLARE</div>
      <div style={{ fontSize: 9, letterSpacing: 2, color: 'var(--muted)', marginTop: 3 }}>GOLD COAST RETIREMENT LIVING. YOUR WAY.</div>
    </div>
  )
}
