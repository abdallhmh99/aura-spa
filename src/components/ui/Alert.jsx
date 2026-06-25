import './Alert.css'

export default function Alert({
  variant = 'info',
  title,
  children,
  onDismiss,
  className = '',
  ...props
}) {
  const classes = [
    'alert',
    `alert--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="alert" {...props}>
      <div className="alert__content">
        {title && <p className="alert__title">{title}</p>}
        {children && <p className="alert__body">{children}</p>}
      </div>
      {onDismiss && (
        <button
          type="button"
          className="alert__dismiss"
          onClick={onDismiss}
          aria-label="إغلاق التنبيه"
        >
          ✕
        </button>
      )}
    </div>
  )
}
