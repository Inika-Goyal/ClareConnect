import { useNavigate } from 'react-router-dom'

export default function BackLink({ to, label = 'Back' }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(to)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 22, fontFamily: 'inherit' }}
    >
      <i className="ti ti-arrow-left" aria-hidden="true" /> {label}
    </button>
  )
}
