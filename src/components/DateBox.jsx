const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

export default function DateBox({ dateStr, large = false }) {
  const d = new Date(dateStr + 'T00:00:00')
  const mo = MONTHS[d.getMonth()]
  const dy = d.getDate()
  const yr = d.getFullYear()

  if (large) {
    return (
      <div style={{ background: 'var(--gold-bg)', borderRadius: 8, padding: '22px 18px' }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--gold)' }}>{mo}</div>
        <div style={{ fontSize: 44, color: 'var(--dark)', fontWeight: 400, lineHeight: 1 }}>{dy}</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>{yr}</div>
      </div>
    )
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: 'var(--gold-bg)', borderRadius: 4, padding: '5px 10px', marginBottom: 10 }}>
      <div style={{ fontSize: 9, letterSpacing: 2, color: 'var(--gold)' }}>{mo}</div>
      <div style={{ fontSize: 22, color: 'var(--dark)', fontWeight: 400, lineHeight: 1.1 }}>{dy}</div>
    </div>
  )
}
