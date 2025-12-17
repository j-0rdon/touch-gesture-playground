import { useState, useRef } from 'react'
import { useDrag } from '@use-gesture/react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { haptics } from '../utils/haptics'
import type { GestureState } from '../App'
import './PullToRefresh.css'

interface PullToRefreshProps {
  onGestureUpdate: (state: GestureState) => void
}

const PULL_THRESHOLD = 80
const MAX_PULL = 120

export function PullToRefresh({ onGestureUpdate }: PullToRefreshProps) {
  const [refreshing, setRefreshing] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const pullY = useMotionValue(0)

  const spinnerRotate = useTransform(pullY, [0, PULL_THRESHOLD], [0, 360])
  const spinnerScale = useTransform(pullY, [0, PULL_THRESHOLD], [0.5, 1])
  const spinnerOpacity = useTransform(pullY, [0, 40, PULL_THRESHOLD], [0, 0.5, 1])

  const progress = useTransform(pullY, [0, PULL_THRESHOLD], [0, 100])

  const doRefresh = async () => {
    setRefreshing(true)
    haptics.success()
    setRefreshCount(prev => prev + 1)

    await new Promise(resolve => setTimeout(resolve, 1500))

    setRefreshing(false)
    onGestureUpdate({
      type: 'pull-refresh',
      active: false,
      details: { refreshed: true }
    })
  }

  const bind = useDrag(
    ({ movement: [, my], active, cancel }) => {
      if (refreshing) {
        cancel()
        return
      }

      const pull = Math.max(0, Math.min(MAX_PULL, my * 0.6))
      pullY.set(pull)

      const isPastThreshold = pull >= PULL_THRESHOLD

      onGestureUpdate({
        type: 'pull-refresh',
        active,
        details: {
          pull: Math.round(pull),
          threshold: PULL_THRESHOLD,
          ready: isPastThreshold
        }
      })

      if (!active) {
        if (isPastThreshold) {
          doRefresh()
        }
        pullY.set(0)
      } else if (isPastThreshold && pull === PULL_THRESHOLD) {
        haptics.light()
      }
    },
    {
      axis: 'y',
      filterTaps: true,
      from: () => [0, pullY.get()],
      bounds: { top: 0 },
    }
  )

  return (
    <div className="pull-refresh-container" ref={containerRef}>
      <motion.div
        className="pull-refresh-spinner"
        style={{
          rotate: refreshing ? undefined : spinnerRotate,
          scale: spinnerScale,
          opacity: spinnerOpacity,
          y: useTransform(pullY, [0, MAX_PULL], [-20, 30])
        }}
        animate={refreshing ? { rotate: 360 } : undefined}
        transition={refreshing ? { duration: 1, repeat: Infinity, ease: 'linear' } : undefined}
      >
        <svg viewBox="0 0 24 24" className="spinner-icon">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      <motion.div
        {...bind()}
        className="pull-refresh-content touch-pan-x no-select"
        style={{ y: pullY }}
      >
        <div className="pull-refresh-items">
          {[1, 2, 3].map(i => (
            <div key={i} className="pull-refresh-item">
              <div className="pull-refresh-item-avatar" />
              <div className="pull-refresh-item-text">
                <div className="pull-refresh-item-title" />
                <div className="pull-refresh-item-subtitle" />
              </div>
            </div>
          ))}
        </div>

        <motion.div
          className="pull-refresh-progress-bar"
          style={{ scaleX: useTransform(progress, [0, 100], [0, 1]) }}
        />
      </motion.div>

      <div className="pull-refresh-status">
        {refreshing ? (
          <span className="status-refreshing">Refreshing...</span>
        ) : (
          <span className="status-hint">Pull down to refresh</span>
        )}
        {refreshCount > 0 && (
          <span className="refresh-count">Refreshed {refreshCount}x</span>
        )}
      </div>
    </div>
  )
}
