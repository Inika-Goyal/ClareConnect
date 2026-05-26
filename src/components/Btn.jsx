const variants = {
  gold:  { background: 'var(--gold)',  color: '#fff' },
  navy:  { background: 'var(--navy)',  color: '#fff' },
  slate: { background: 'var(--slate)', color: '#fff' },
  red:   { background: 'var(--red)',   color: '#fff' },
  green: { background: 'var(--green)', color: '#fff' },
}

const sizes = {
  lg: { fontSize: 19, padding: '17px 26px' },
  md: { fontSize: 16, padding: '13px 20px' },
  sm: { fontSize: 14, padding: '10px 16px' },
}

export default function Btn({ variant = 'gold', size = 'md', full = false, style = {}, children, ...props }) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontWeight: 400,
        letterSpacing: 0.3,
        transition: 'opacity .15s',
        width: full ? '100%' : undefined,
        ...variants[variant],
        ...sizes[size],
        ...style,
      }}
      onMouseOver={e => (e.currentTarget.style.opacity = '0.88')}
      onMouseOut={e => (e.currentTarget.style.opacity = '1')}
      {...props}
    >
      {children}
    </button>
  )
}
