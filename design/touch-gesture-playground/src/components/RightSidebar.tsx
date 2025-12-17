import { useEffect } from 'react'
import { useDrag } from '@use-gesture/react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { haptics } from '../utils/haptics'
import './RightSidebar.css'

interface RightSidebarProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const PANEL_WIDTH = 300
const EDGE_THRESHOLD = 30
const SWIPE_THRESHOLD = 100

export function RightSidebar({ isOpen, onOpenChange }: RightSidebarProps) {
  const x = useMotionValue(isOpen ? 0 : PANEL_WIDTH)
  const overlayOpacity = useTransform(x, [PANEL_WIDTH, 0], [0, 0.5])

  useEffect(() => {
    x.set(isOpen ? 0 : PANEL_WIDTH)
  }, [isOpen, x])

  const bind = useDrag(
    ({ movement: [mx], velocity: [vx], first, last, xy: [clientX] }) => {
      const windowWidth = window.innerWidth

      if (first && !isOpen && clientX < windowWidth - EDGE_THRESHOLD) {
        return
      }

      const newX = isOpen
        ? Math.max(0, Math.min(PANEL_WIDTH, -mx))
        : Math.max(0, Math.min(PANEL_WIDTH, PANEL_WIDTH + mx))

      x.set(newX)

      if (last) {
        const shouldOpen = isOpen
          ? -mx < SWIPE_THRESHOLD && vx > -0.5
          : -mx > SWIPE_THRESHOLD || vx < -0.5

        if (shouldOpen !== isOpen) {
          haptics.medium()
        }

        onOpenChange(shouldOpen)
      }
    },
    {
      from: () => [isOpen ? 0 : -PANEL_WIDTH, 0],
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
      <div {...bind()} className="right-edge-zone touch-pan-y" />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="right-panel-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
          />
        )}
      </AnimatePresence>

      <motion.div
        {...bind()}
        className="right-panel touch-pan-y no-select"
        style={{ x }}
      >
        <div className="right-panel-handle" />

        <div className="right-panel-content">
          <div className="right-panel-header">
            <button className="right-panel-close" onClick={closePanel}>
              ✕
            </button>
            <h2>Details Panel</h2>
          </div>

          <div className="right-panel-body">
            <p className="right-panel-description">
              This panel slides in from the right edge. Great for detail views, filters, or settings.
            </p>

            <div className="right-panel-section">
              <h4>Quick Actions</h4>
              <div className="quick-actions">
                <button className="quick-action">
                  <span>⭐</span>
                  <span>Favourite</span>
                </button>
                <button className="quick-action">
                  <span>📤</span>
                  <span>Share</span>
                </button>
                <button className="quick-action">
                  <span>📥</span>
                  <span>Download</span>
                </button>
                <button className="quick-action">
                  <span>🗑️</span>
                  <span>Delete</span>
                </button>
              </div>
            </div>

            <div className="right-panel-section">
              <h4>Info</h4>
              <div className="info-rows">
                <div className="info-row">
                  <span className="info-label">Created</span>
                  <span className="info-value">Today, 2:30 PM</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Modified</span>
                  <span className="info-value">Just now</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Size</span>
                  <span className="info-value">2.4 MB</span>
                </div>
              </div>
            </div>
          </div>

          <div className="right-panel-footer">
            <p>Swipe left to close</p>
          </div>
        </div>
      </motion.div>
    </>
  )
}
