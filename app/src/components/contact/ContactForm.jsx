import { useState } from 'react'
import { useContactSubmit } from '../../hooks/useContactSubmit'
import Button from '../ui/Button'
import Card from '../ui/Card'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  organisation: '',
  message: '',
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function Field({ label, error, children }) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
        {label}
      </span>
      {children}
      {error ? <span className="text-sm text-[var(--color-rose)]">{error}</span> : null}
    </label>
  )
}

const inputClass =
  'min-h-12 rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[var(--color-bg-soft)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-accent)]'

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const { submit, reset, status, error } = useContactSubmit()

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: null }))
    if (status === 'success') reset()
  }

  function validate() {
    const nextErrors = {}

    if (!form.name.trim()) nextErrors.name = 'Your name is required.'
    if (!form.email.trim()) {
      nextErrors.email = 'Your email is required.'
    } else if (!isValidEmail(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!form.message.trim()) nextErrors.message = 'Your message is required.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!validate()) return

    const result = await submit({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      organisation: form.organisation.trim(),
      message: form.message.trim(),
    })

    if (result.ok) {
      setForm(initialForm)
    }
  }

  return (
    <Card>
      <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Your name" error={errors.name}>
            <input
              className={inputClass}
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              autoComplete="name"
              required
            />
          </Field>
          <Field label="Your email" error={errors.email}>
            <input
              className={inputClass}
              type="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              autoComplete="email"
              required
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Phone number (optional)">
            <input
              className={inputClass}
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              autoComplete="tel"
            />
          </Field>
          <Field label="Organisation (optional)">
            <input
              className={inputClass}
              value={form.organisation}
              onChange={(event) => updateField('organisation', event.target.value)}
              autoComplete="organization"
            />
          </Field>
        </div>

        <Field label="Message" error={errors.message}>
          <textarea
            className={`${inputClass} min-h-40 resize-y py-3`}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            required
          />
        </Field>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending' : 'Submit'}
          </Button>
          {status === 'success' ? (
            <p className="text-sm text-[var(--color-accent-bright)]">Thank you. Your message has been sent.</p>
          ) : null}
          {status === 'error' ? (
            <p className="text-sm text-[var(--color-rose)]">
              {error?.message || 'Something went wrong. Please try again.'}
            </p>
          ) : null}
        </div>
      </form>
    </Card>
  )
}
