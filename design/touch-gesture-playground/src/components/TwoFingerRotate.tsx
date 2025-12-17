import { useRef } from 'react'
import { useGesture } from '@use-gesture/react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { haptics } from '../utils/haptics'
import type { GestureState } from '../App'
import './TwoFingerRotate.css'

interface TwoFingerRotateProps {
  onGestureUpdate: (state: GestureState) => void
}

export function TwoFingerRotate({ onGestureUpdate }: TwoFingerRotateProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rotation = useMotionValue(0)
  const scale = useMotionValue(1)

  const borderColor = useTransform(
    rotation,
    [-180, -90, 0, 90, 180],
    ['#ef4444', '#f59e0b', '#6366f1', '#10b981', '#ef4444']
  )

  const bind = useGesture(
    {
      onPinch: ({ offset: [s, r], first, last }) => {
        if (first) {
          haptics.light()
        }

        const newRotation = r
        const newScale = Math.max(0.5, Math.min(2, s))

        rotation.set(newRotation)
        scale.set(newScale)

        if (!last) {
          onGestureUpdate({
            type: 'rotate',
            active: true,
            details: {
              rotation: Math.round(newRotation),
              scale: newScale.toFixed(2)
            }
          })
        } else {
          haptics.light()
          onGestureUpdate({
            type: 'rotate',
            active: false,
            details: {
              rotation: Math.round(newRotation),
              scale: newScale.toFixed(2)
            }
          })
        }
      },
    },
    {
      pinch: {
        scaleBounds: { min: 0.5, max: 2 },
        from: () => [scale.get(), rotation.get()],
      },
    }
  )

  const resetRotation = () => {
    rotation.set(0)
    scale.set(1)
    haptics.light()
    onGestureUpdate({
      type: 'rotate',
      active: false,
      details: { rotation: 0, scale: 1, reset: true }
    })
  }

  const displayRotation = useTransform(rotation, r => `${Math.round(r)}°`)

  return (
    <div className="rotate-container" ref={containerRef}>
      <motion.div
        {...bind()}
        className="rotate-area touch-none no-select"
        style={{ borderColor }}
      >
        <motion.div
          className="rotate-element"
          style={{ rotate: rotation, scale }}
        >
          <div className="rotate-compass">
            <div className="compass-n">N</div>
            <div className="compass-e">E</div>
            <div className="compass-s">S</div>
            <div className="compass-w">W</div>
            <div className="compass-needle" />
          </div>
        </motion.div>

        <motion.div className="rotate-value">
          {displayRotation}
        </motion.div>

        <div className="rotate-hint">
          Use two fingers to rotate
        </div>
      </motion.div>

      <button className="rotate-reset" onClick={resetRotation}>
        Reset
      </button>
    </div>
  )
}
