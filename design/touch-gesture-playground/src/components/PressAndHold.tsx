import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { haptics } from '../utils/haptics'
import type { GestureState } from '../App'
import './PressAndHold.css'

interface PressAndHoldProps {
  onGestureUpdate: (state: GestureState) => void
}

export function PressAndHold({ onGestureUpdate }: PressAndHoldProps) {
  const [pressing, setPressing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [triggered, setTriggered] = useState(false)
  const [triggerCount, setTriggerCount] = useState(0)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const triggeredRef = useRef(false)
  const HOLD_DURATION = 500

  const stopProgress = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    setProgress(0)
    setPressing(false)
    triggeredRef.current = false
  }, [])

  const startProgress = useCallback(() => {
    startTimeRef.current = Date.now()
    triggeredRef.current = false

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current
      const newProgress = Math.min(elapsed / HOLD_DURATION, 1)
      setProgress(newProgress)

      if (newProgress >= 1 && !triggeredRef.current) {
        triggeredRef.current = true
        setTriggered(true)
        setTriggerCount(prev => prev + 1)
        haptics.success()
        onGestureUpdate({
          type: 'press-hold',
          active: false,
          details: { triggered: true, duration: HOLD_DURATION }
        })
        setTimeout(() => setTriggered(false), 600)
        stopProgress()
        return
      }

      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [onGestureUpdate, stopProgress])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (pressing) {
      onGestureUpdate({
        type: 'press-hold',
        active: true,
        details: { progress: Math.round(progress * 100) }
      })
    }
  }, [progress, pressing, onGestureUpdate])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setPressing(true)
    startProgress()
    haptics.light()
    onGestureUpdate({
      type: 'press-hold',
      active: true,
      details: { progress: 0 }
    })
  }, [startProgress, onGestureUpdate])

  const handlePointerUp = useCallback(() => {
    if (!triggeredRef.current) {
      onGestureUpdate({
        type: 'press-hold',
        active: false,
        details: { cancelled: true }
      })
    }
    stopProgress()
  }, [stopProgress, onGestureUpdate])

  const handlePointerCancel = useCallback(() => {
    onGestureUpdate({
      type: 'press-hold',
      active: false,
      details: { cancelled: true }
    })
    stopProgress()
  }, [stopProgress, onGestureUpdate])

  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div className="press-hold-container">
      <motion.div
        className={`press-hold-target no-select touch-none ${pressing ? 'pressing' : ''} ${triggered ? 'triggered' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerUp}
        animate={{
          scale: pressing ? 0.95 : triggered ? 1.1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <svg className="progress-ring" viewBox="0 0 100 100">
          <circle
            className="progress-ring-bg"
            cx="50"
            cy="50"
            r="40"
          />
          <circle
            className="progress-ring-progress"
            cx="50"
            cy="50"
            r="40"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        <div className="press-hold-content">
          <AnimatePresence mode="wait">
            {triggered ? (
              <motion.span
                key="check"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                className="press-hold-icon"
              >
                ✓
              </motion.span>
            ) : (
              <motion.span
                key="hold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="press-hold-text"
              >
                {pressing ? 'Hold...' : 'Press & Hold'}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {triggerCount > 0 && (
        <p className="press-hold-count">Triggered {triggerCount} time{triggerCount !== 1 ? 's' : ''}</p>
      )}
    </div>
  )
}
