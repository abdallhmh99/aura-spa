import React, { useEffect } from 'react'

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
  backdrop: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(44, 63, 167, 0.18)',
    backdropFilter: 'blur(4px)',
  },
  dialog: {
    position: 'relative',
    width: '100%',
    maxWidth: '680px',
    maxHeight: '90vh',
    overflowY: 'auto',
    backgroundColor: 'var(--neutral-secondary, #FBF6EC)',
    border: '1px solid var(--border-default, #E4E0D9)',
    borderRadius: '4px',
    boxShadow: '8px 8px 0 0 #2C3FA7',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    borderBottom: '1px solid var(--border-default, #E4E0D9)',
    backgroundColor: 'var(--neutral-secondary, #FBF6EC)',
  },
  title: {
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--heading, #2C3FA7)',
    margin: 0,
  },
  closeBtn: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    border: 'none',
    background: 'transparent',
    color: 'var(--body, #637EC2)',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 150ms, color 150ms',
  },
  content: {
    padding: '24px',
  },
}

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div style={styles.overlay}>
      <div style={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" style={styles.dialog}>
        <div style={styles.header}>
          <h2 id="modal-title" style={styles.title}>{title}</h2>
          <button
            onClick={onClose}
            style={styles.closeBtn}
            aria-label="إغلاق"
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--neutral-tertiary, #F4ECDA)'; e.currentTarget.style.color = 'var(--heading, #2C3FA7)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--body, #637EC2)' }}
          >
            ✕
          </button>
        </div>
        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}
