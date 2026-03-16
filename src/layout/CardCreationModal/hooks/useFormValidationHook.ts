import { useState } from 'react'

export default function useFormValidation<T extends Record<string, any>>(initial: T) {
  const [values, setValues] = useState<T>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const validate = (fieldName: keyof T, value: any) => {
    let error = ''
    if (fieldName === 'name') {
      if (!value || String(value).trim().length === 0) {
        error = 'Card name is required'
      }
    }
    setErrors((prev) => ({ ...prev, [fieldName]: error }))
    return error
  }

  const handleChange = (fieldName: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setValues((prev) => ({ ...prev, [fieldName]: value }))
    if (errors[fieldName]) {
      validate(fieldName, value)
    }
  }

  return { values, errors, validate, handleChange, setValues, setErrors }
}
