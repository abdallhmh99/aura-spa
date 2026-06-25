import './Button.css'

export default function Button({
  variant = 'primary',
  size = 'base',
  disabled = false,
  fullWidth = false,
  icon,
  children,
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full',
    disabled && 'btn--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} disabled={disabled} {...props}>
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
    </button>
  )
}
