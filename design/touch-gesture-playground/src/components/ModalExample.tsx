import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { haptics } from '../utils/haptics'
import type { GestureState } from '../App'
import './ModalExample.css'

interface ModalExampleProps {
  onGestureUpdate: (state: GestureState) => void
}

export function ModalExample({ onGestureUpdate }: ModalExampleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startYRef = useRef(0)
  const sheetRef = useRef<HTMLDivElement>(null)

  const openModal = () => {
    setDragY(0)
    setIsOpen(true)
    haptics.light()
    onGestureUpdate({
      type: 'modal',
      active: true,
      details: { open: true }
    })
  }

  const closeModal = useCallback(() => {
    haptics.light()
    setIsOpen(false)
    setDragY(0)
    onGestureUpdate({
      type: 'modal',
      active: false,
      details: { open: false }
    })
  }, [onGestureUpdate])

  const handleAction = (action: string) => {
    haptics.medium()
    onGestureUpdate({
      type: 'modal',
      active: false,
      details: { action }
    })
    setIsOpen(false)
    setDragY(0)
  }

  // Touch handlers for the drag handle
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    startYRef.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentY = e.touches[0].clientY
    const delta = currentY - startYRef.current
    // Allow dragging down freely, resist dragging up
    const newY = delta < 0 ? delta * 0.2 : delta
    setDragY(newY)

    onGestureUpdate({
      type: 'modal-drag',
      active: true,
      details: { y: Math.round(newY) }
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (dragY > 100) {
      closeModal()
    } else {
      setDragY(0)
    }
    onGestureUpdate({
      type: 'modal-drag',
      active: false,
      details: { y: 0 }
    })
  }

  return (
    <div className="modal-example-container">
      <button className="modal-trigger" onClick={openModal}>
        Open Modal
      </button>

      <p className="modal-hint">Drag handle to dismiss</p>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
            />
            <motion.div
              ref={sheetRef}
              className="modal-sheet"
              initial={{ y: '100%' }}
              animate={{
                y: dragY,
                scale: 1 - (dragY / 1000)
              }}
              exit={{ y: '100%' }}
              transition={isDragging ? { type: 'tween', duration: 0 } : { type: 'spring', stiffness: 400, damping: 35 }}
            >
              <div
                className="modal-drag-area"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="modal-handle" />
              </div>

              <div className="modal-header">
                <h3>Sheet Modal</h3>
                <button className="modal-close" onClick={closeModal}>
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <p>This is a bottom sheet modal that can be dismissed by:</p>
                <ul>
                  <li>Dragging the handle down</li>
                  <li>Tapping the backdrop</li>
                  <li>Tapping the close button</li>
                </ul>

                <div className="modal-actions">
                  <button
                    className="modal-btn secondary"
                    onClick={() => handleAction('cancel')}
                  >
                    Cancel
                  </button>
                  <button
                    className="modal-btn primary"
                    onClick={() => handleAction('confirm')}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
