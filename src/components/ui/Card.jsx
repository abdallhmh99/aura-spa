import './Card.css'

export default function Card({
  variant = 'default',
  children,
  className = '',
  ...props
}) {
  const classes = [
    'card',
    `card--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
