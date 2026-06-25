import './Badge.css'

export default function Badge({
  variant = 'brand',
  size = 'default',
  pill = false,
  children,
  className = '',
  ...props
}) {
  const classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    pill && 'badge--pill',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}
