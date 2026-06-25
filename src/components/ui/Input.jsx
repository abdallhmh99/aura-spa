import './Input.css'

export default function Input({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  hint = '',
  required = false,
  disabled = false,
  textarea = false,
  className = '',
  ...props
}) {
  const inputClasses = [
    'input__field',
    error && 'input__field--error',
    disabled && 'input__field--disabled',
  ]
    .filter(Boolean)
    .join(' ')

  const InputTag = textarea ? 'textarea' : 'input'

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={id} className="input__label">
          {label}
          {required && <span className="input__required">*</span>}
        </label>
      )}
      <InputTag
        id={id}
        type={textarea ? undefined : type}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={textarea ? 4 : undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="input__error" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="input__hint">
          {hint}
        </p>
      )}
    </div>
  )
}
