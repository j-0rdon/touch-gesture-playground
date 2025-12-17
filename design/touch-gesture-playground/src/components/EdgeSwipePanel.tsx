import { useEffect } from 'react'
import { useDrag } from '@use-gesture/react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { haptics } from '../utils/haptics'
import './EdgeSwipePanel.css'

interface EdgeSwipePanelProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const PANEL_WIDTH = 280
const EDGE_THRESHOLD = 30
const SWIPE_THRESHOLD = 100

export function EdgeSwipePanel({ isOpen, onOpenChange }: EdgeSwipePanelProps) {
  const x = useMotionValue(isOpen ? 0 : -PANEL_WIDTH)
  const overlayOpacity = useTransform(x, [-PANEL_WIDTH, 0], [0, 0.5])

  useEffect(() => {
    x.set(isOpen ? 0 : -PANEL_WIDTH)
  }, [isOpen, x])

  const bind = useDrag(
    ({ movement: [mx], velocity: [vx], first, last, xy: [clientX] }) => {
      if (first && !isOpen && clientX > EDGE_THRESHOLD) {
        return
      }

      const newX = isOpen
        ? Math.min(0, Math.max(-PANEL_WIDTH, mx))
        : Math.min(0, Math.max(-PANEL_WIDTH, -PANEL_WIDTH + mx))

      x.set(newX)

      if (last) {
        const shouldOpen = isOpen
          ? mx > -SWIPE_THRESHOLD && vx > -0.5
          : mx > SWIPE_THRESHOLD || vx > 0.5

        if (shouldOpen !== isOpen) {
          haptics.medium()
        }

        onOpenChange(shouldOpen)
      }
    },
    {
      from: () => [x.get(), 0],
      filterTaps: true,
      axis: 'x',
    }
  )

  const closePanel = () => {
    haptics.light()
    onOpenChange(false)
  }

  return (
    <>
      {/* Edge detection zone */}
      <div {...bind()} className="edge-swipe-zone touch-pan-y" />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="edge-panel-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
          />
        )}
      </AnimatePresence>

      <motion.div
        {...bind()}
        className="edge-panel touch-pan-y no-select"
        style={{ x }}
      >
        <div className="edge-panel-content">
          <div className="edge-panel-header">
            <h2>Side Panel</h2>
            <button className="edge-panel-close" onClick={closePanel}>
              ✕
            </button>
          </div>

          <div className="edge-panel-body">
            <p className="edge-panel-description">
              This panel was revealed by swiping from the left edge of the screen.
            </p>

            <nav className="edge-panel-nav">
              <a href="#" className="edge-panel-nav-item active">
                <span className="nav-icon">🏠</span>
                <span>Home</span>
              </a>
              <a href="#" className="edge-panel-nav-item">
                <span className="nav-icon">⚙️</span>
                <span>Settings</span>
              </a>
              <a href="#" className="edge-panel-nav-item">
                <span className="nav-icon">📊</span>
                <span>Analytics</span>
              </a>
              <a href="#" className="edge-panel-nav-item">
                <span className="nav-icon">👤</span>
                <span>Profile</span>
              </a>
            </nav>
          </div>

          <div className="edge-panel-footer">
            <p>Swipe right to close</p>
          </div>
        </div>

        <div className="edge-panel-handle" />
      </motion.div>
    </>
  )
}
