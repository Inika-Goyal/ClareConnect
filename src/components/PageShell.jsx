import ClareLogo from './ClareLogo'

export default function PageShell({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px', minHeight: '100vh', background: '#f0ece6' }}>
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', width: '100%', maxWidth: 720, boxShadow: '0 4px 24px rgba(0,0,0,.08)' }}>
        <ClareLogo />
        {children}
      </div>
    </div>
  )
}
