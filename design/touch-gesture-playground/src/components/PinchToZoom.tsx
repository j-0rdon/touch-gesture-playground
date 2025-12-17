import { useRef } from 'react'
import { useGesture } from '@use-gesture/react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { haptics } from '../utils/haptics'
import type { GestureState } from '../App'
import './PinchToZoom.css'

interface PinchToZoomProps {
  onGestureUpdate: (state: GestureState) => void
}

export function PinchToZoom({ onGestureUpdate }: PinchToZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scale = useMotionValue(1)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const borderColor = useTransform(
    scale,
    [1, 1.5, 3],
    ['#334155', '#6366f1', '#8b5cf6']
  )

  const bind = useGesture(
    {
      onPinch: ({ offset: [s], origin: [ox, oy], first, last }) => {
        if (first) {
          haptics.light()
        }

        const newScale = Math.max(0.5, Math.min(4, s))
        scale.set(newScale)

        if (!last) {
          onGestureUpdate({
            type: 'pinch-zoom',
            active: true,
            details: {
              scale: newScale.toFixed(2),
              originX: Math.round(ox),
              originY: Math.round(oy),
            }
          })
        } else {
          haptics.light()
          onGestureUpdate({
            type: 'pinch-zoom',
            active: false,
            details: { scale: newScale.toFixed(2) }
          })
        }
      },
      onDrag: ({ offset: [ox, oy], first, last }) => {
        if (first) {
          haptics.light()
        }

        const currentScale = scale.get()
        const maxOffset = 50 * currentScale
        const boundedX = Math.max(-maxOffset, Math.min(maxOffset, ox))
        const boundedY = Math.max(-maxOffset, Math.min(maxOffset, oy))

        x.set(boundedX)
        y.set(boundedY)

        if (!last) {
          onGestureUpdate({
            type: 'pan',
            active: true,
            details: {
              x: Math.round(boundedX),
              y: Math.round(boundedY),
              scale: currentScale.toFixed(2)
            }
          })
        } else {
          onGestureUpdate({
            type: 'pan',
            active: false,
            details: {}
          })
        }
      },
      onPinchEnd: () => {
        const currentScale = scale.get()
        if (currentScale < 1) {
          scale.set(1)
          x.set(0)
          y.set(0)
        }
      }
    },
    {
      drag: {
        from: () => [x.get(), y.get()],
        filterTaps: true,
      },
      pinch: {
        scaleBounds: { min: 0.5, max: 4 },
        from: () => [scale.get(), 0],
      },
    }
  )

  const resetZoom = () => {
    scale.set(1)
    x.set(0)
    y.set(0)
    haptics.light()
    onGestureUpdate({
      type: 'pinch-zoom',
      active: false,
      details: { scale: 1, reset: true }
    })
  }

  return (
    <div className="pinch-zoom-container" ref={containerRef}>
      <motion.div
        {...bind()}
        className="pinch-zoom-area touch-none no-select"
        style={{ borderColor }}
      >
        <motion.div
          className="pinch-zoom-content"
          style={{ scale, x, y }}
        >
          <div className="pinch-zoom-image">
            <svg viewBox="0 0 100 100" className="pinch-zoom-svg">
              <defs>
                <linearGradient id="grad-pinch" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1"/>
                  <stop offset="50%" stopColor="#8b5cf6"/>
                  <stop offset="100%" stopColor="#ec4899"/>
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="80" height="80" rx="10" fill="url(#grad-pinch)"/>
              <circle cx="35" cy="40" r="8" fill="white" opacity="0.8"/>
              <circle cx="65" cy="40" r="8" fill="white" opacity="0.8"/>
              <path d="M30 65 Q50 80 70 65" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8"/>
            </svg>
          </div>
        </motion.div>

        <div className="pinch-zoom-hint">
          Pinch to zoom • Drag to pan
        </div>
      </motion.div>

      <button className="pinch-zoom-reset" onClick={resetZoom}>
        Reset
      </button>
    </div>
  )
}
