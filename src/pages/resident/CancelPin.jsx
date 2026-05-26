import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PageShell from '../../components/PageShell'
import Btn from '../../components/Btn'
import { supabase } from '../../lib/supabase'

export default function CancelPin() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { id } = useParams()
  const event = state?.event ?? { id }
  const person = state?.person ?? { name: 'Dorothy H.', id: 1 }

  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    if (pin.length < 3) { setError('Please enter your apartment number.'); return }
    setLoading(true)
    setError('')
    const { data } = await supabase
      .from('signups')
      .select('id')
      .eq('id', person.id)
      .eq('apartment', pin)
      .single()

    if (data) {
      await supabase.from('signups').delete().eq('id', person.id)
      navigate('/events')
    } else {
      setError('Apartment number doesn\'t match. Please try again.')
    }
    setLoading(false)
  }

  const dots = [0, 1, 2, 3].map(i => i < pin.length)

  return (
    <PageShell>
      <div style={{ minHeight: 440, background: 'rgba(28,28,28,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'var(--white)', borderRadius: 12, padding: '40px 32px', textAlign: 'center', maxWidth: 340, width: '90%' }}>
          <i className="ti ti-circle-x" style={{ fontSize: 60, color: 'var(--red)', display: 'block', marginBottom: 14 }} aria-hidden="true" />
          <div style={{ fontSize: 24, color: 'var(--dark)', fontWeight: 400, marginBottom: 10 }}>Cancel your spot?</div>
          <div style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 18, lineHeight: 1.6 }}>
            Enter your apartment number to confirm removal of <strong>{person.name}</strong> from this event.
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 16 }}>
            {dots.map((filled, i) => (
              <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid', borderColor: filled ? 'var(--dark)' : 'var(--border)', background: filled ? 'var(--dark)' : 'var(--white)' }} />
            ))}
          </div>
          <input
            type="tel"
            maxLength={4}
            placeholder="_ _ _ _"
            value={pin}
            onChange={e => { setPin(e.target.value); setError('') }}
            style={{ width: '100%', fontSize: 28, textAlign: 'center', letterSpacing: 12, padding: 13, border: '2px solid var(--gold2)', borderRadius: 7, color: 'var(--dark)', fontFamily: 'inherit', marginBottom: 16, outline: 'none' }}
          />
          {error && <div style={{ color: 'var(--red)', fontSize: 13, marginBottom: 12 }}>{error}</div>}
          <Btn variant="red" size="lg" full style={{ marginBottom: 10, opacity: loading ? 0.7 : 1 }} onClick={handleConfirm}>
            <i className="ti ti-check" aria-hidden="true" /> Yes, cancel my spot
          </Btn>
          <Btn variant="slate" size="lg" full onClick={() => navigate(-1)}>
            <i className="ti ti-arrow-left" aria-hidden="true" /> Never mind, go back
          </Btn>
        </div>
      </div>
    </PageShell>
  )
}
