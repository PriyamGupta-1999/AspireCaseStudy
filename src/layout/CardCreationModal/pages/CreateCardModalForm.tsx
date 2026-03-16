import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useAppContext } from '../../../app/providers/AppProvider'
import useFormValidationHook from '../hooks/useFormValidationHook'
import '../styles/CreateCardModalForm.css'

function randomNumberString(length: number) {
  return Array.from({ length })
    .map(() => Math.floor(Math.random() * 10))
    .join('')
}

function randomExpiry() {
  const now = new Date()
  const addYears = Math.floor(Math.random() * 10) + 1
  const yr = now.getFullYear() + addYears
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
  return `${month}/${String(yr).slice(-2)}`
}

export default function CreateCardModalForm({ onClose }: { onClose: () => void }) {
  const { addCard } = useAppContext()
  const { values, errors, validate, handleChange, setErrors } = useFormValidationHook({ name: '' })

  const canSubmit = useMemo(() => {
    return values.name.trim().length > 0 && !errors.name
  }, [values.name, errors.name])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const error = validate('name', values.name)
    if (error) return

    const cardNumber = randomNumberString(16)
    const cvv = randomNumberString(3)
    const expiryDate = randomExpiry()

    const newCard = {
      id: `c_${Date.now()}`,
      c_name: values.name.trim(),
      cardNumber,
      expiryDate,
      cvv,
      isCardFreezed: false,
      transactions: [],
    }

    await addCard(newCard)
    onClose()
    setErrors({})
  }

  const modalContent = (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-body">
        <header className="modal-header">
          <h2>Create new card</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>
        <form onSubmit={handleSubmit} className="modal-form">
          <label className="modal-field">
            <span>Enter Consumer Name</span>
            <input
              value={values.name}
              onChange={handleChange('name')}
              onBlur={() => validate('name', values.name)}
              placeholder="Enter Name here"
              autoFocus
            />
            {errors.name ? <span className="modal-error">{errors.name}</span> : null}
          </label>
          <div className="modal-actions">
            <button type="button" className="modal-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-primary" disabled={!canSubmit}>
              Create card
            </button>
          </div>
        </form>
        <p className="modal-note">
          A random card number, CVV and expiry date will be generated.
        </p>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
