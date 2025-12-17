import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
} from '@floating-ui/react-dom'
import { haptics } from '../utils/haptics'
import type { GestureState } from '../App'
import './PressHoldMenu.css'

interface PressHoldMenuProps {
  onGestureUpdate: (state: GestureState) => void
}

const MENU_ITEMS = [
  { id: 'copy', label: 'Copy', icon: '📋' },
  { id: 'share', label: 'Share', icon: '📤' },
  { id: 'edit', label: 'Edit', icon: '✏️' },
  { id: 'delete', label: 'Delete', icon: '🗑️', danger: true },
]

const HOLD_DURATION = 400

export function PressHoldMenu({ onGestureUpdate }: PressHoldMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [pressing, setPressing] = useState(false)
  const timerRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  const { refs, floatingStyles, middlewareData, placement } = useFloating({
    open: menuOpen,
    placement: 'top',
    middleware: [
      offset(16), // Gap between popover and target (includes arrow)
      flip({ fallbackPlacements: ['bottom', 'left', 'right'] }),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const openMenu = useCallback(() => {
    setMenuOpen(true)
    haptics.medium()
    onGestureUpdate({
      type: 'press-hold-menu',
      active: true,
      details: { menuOpen: true }
    })
  }, [onGestureUpdate])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    setSelectedItem(null)
    onGestureUpdate({
      type: 'press-hold-menu',
      active: false,
      details: { menuOpen: false }
    })
  }, [onGestureUpdate])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (menuOpen) return

    e.currentTarget.setPointerCapture(e.pointerId)
    setPressing(true)

    timerRef.current = window.setTimeout(() => {
      openMenu()
      setPressing(false)
    }, HOLD_DURATION)

    onGestureUpdate({
      type: 'press-hold-menu',
      active: true,
      details: { pressing: true }
    })
  }, [menuOpen, openMenu, onGestureUpdate])

  const handlePointerUp = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setPressing(false)
    if (!menuOpen) {
      onGestureUpdate({
        type: 'press-hold-menu',
        active: false,
        details: { cancelled: true }
      })
    }
  }, [menuOpen, onGestureUpdate])

  const handleMenuItemClick = (itemId: string) => {
    setSelectedItem(itemId)
    haptics.light()
    onGestureUpdate({
      type: 'press-hold-menu',
      active: false,
      details: { selected: itemId }
    })
    setTimeout(closeMenu, 150)
  }

  // Determine animation direction based on placement
  const isTop = placement.startsWith('top')
  const animationY = isTop ? 8 : -8

  return (
    <div className="press-hold-menu-container" ref={containerRef}>
      <motion.div
        ref={refs.setReference}
        className={`press-hold-menu-target no-select touch-none ${pressing ? 'pressing' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        animate={{ scale: pressing ? 0.97 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <div className="menu-target-content">
          <span className="menu-target-icon">📄</span>
          <div className="menu-target-text">
            <span className="menu-target-title">Document.pdf</span>
            <span className="menu-target-subtitle">Long press for options</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="press-hold-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              ref={refs.setFloating}
              className="press-hold-menu-popover"
              style={floatingStyles}
              initial={{ opacity: 0, scale: 0.85, y: animationY }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: animationY }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <div className="popover-content">
                {MENU_ITEMS.map((item) => (
                  <motion.button
                    key={item.id}
                    className={`menu-item ${item.danger ? 'danger' : ''} ${selectedItem === item.id ? 'selected' : ''}`}
                    onClick={() => handleMenuItemClick(item.id)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="menu-item-icon">{item.icon}</span>
                    <span className="menu-item-label">{item.label}</span>
                  </motion.button>
                ))}
              </div>
              <div
                ref={arrowRef}
                className="popover-arrow"
                style={{
                  left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
                  top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
                  [placement.startsWith('top') ? 'bottom' : 'top']: '-8px',
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {selectedItem && !menuOpen && (
        <p className="menu-selection-feedback">Selected: {selectedItem}</p>
      )}
    </div>
  )
}
