import { useState } from 'react'
import { useDrag } from '@use-gesture/react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { haptics } from '../utils/haptics'
import type { GestureState } from '../App'
import './SwipeCards.css'

interface SwipeCardsProps {
  onGestureUpdate: (state: GestureState) => void
}

const SWIPE_THRESHOLD = 100
const VELOCITY_THRESHOLD = 0.5

const INITIAL_CARDS = [
  { id: 1, color: '#6366f1', emoji: '🎨' },
  { id: 2, color: '#8b5cf6', emoji: '🎵' },
  { id: 3, color: '#ec4899', emoji: '🎮' },
  { id: 4, color: '#14b8a6', emoji: '📚' },
  { id: 5, color: '#f59e0b', emoji: '🎬' },
]

export function SwipeCards({ onGestureUpdate }: SwipeCardsProps) {
  const [cards, setCards] = useState(INITIAL_CARDS)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const dismissCard = (cardId: number, dir: 'left' | 'right') => {
    setDirection(dir)
    haptics.medium()
    setCards(prev => prev.filter(c => c.id !== cardId))

    setTimeout(() => setDirection(null), 300)
  }

  const resetCards = () => {
    setCards(INITIAL_CARDS)
    haptics.light()
  }

  return (
    <div className="swipe-cards-container">
      <div className="swipe-cards-stack">
        <AnimatePresence>
          {cards.length === 0 ? (
            <motion.button
              className="swipe-cards-reset"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={resetCards}
            >
              Reset Cards
            </motion.button>
          ) : (
            cards.slice(0, 3).map((card, index) => (
              <SwipeCard
                key={card.id}
                card={card}
                index={index}
                total={Math.min(cards.length, 3)}
                onDismiss={dismissCard}
                onGestureUpdate={onGestureUpdate}
                isTop={index === 0}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="swipe-cards-indicators">
        <span className={`swipe-indicator left ${direction === 'left' ? 'active' : ''}`}>
          ✗ NOPE
        </span>
        <span className={`swipe-indicator right ${direction === 'right' ? 'active' : ''}`}>
          ✓ LIKE
        </span>
      </div>
    </div>
  )
}

interface SwipeCardProps {
  card: { id: number; color: string; emoji: string }
  index: number
  total: number
  onDismiss: (id: number, dir: 'left' | 'right') => void
  onGestureUpdate: (state: GestureState) => void
  isTop: boolean
}

function SwipeCard({ card, index, total, onDismiss, onGestureUpdate, isTop }: SwipeCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5])

  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0])

  const bind = useDrag(
    ({ active, movement: [mx], velocity: [vx], direction: [dx] }) => {
      if (!isTop) return

      x.set(mx)

      onGestureUpdate({
        type: 'swipe-card',
        active,
        details: {
          x: Math.round(mx),
          velocity: vx.toFixed(2),
          direction: dx > 0 ? 'right' : 'left'
        }
      })

      if (!active) {
        const shouldDismiss =
          Math.abs(mx) > SWIPE_THRESHOLD ||
          Math.abs(vx) > VELOCITY_THRESHOLD

        if (shouldDismiss) {
          const dir = mx > 0 ? 'right' : 'left'
          onDismiss(card.id, dir)
        } else {
          x.set(0)
        }
      }
    },
    {
      from: () => [x.get(), 0],
      filterTaps: true,
      rubberband: true,
    }
  )

  const stackOffset = (total - 1 - index) * 8
  const stackScale = 1 - (total - 1 - index) * 0.05

  return (
    <motion.div
      {...(isTop ? bind() : {})}
      className={`swipe-card no-select ${isTop ? 'touch-pan-y' : ''}`}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        backgroundColor: card.color,
        zIndex: total - index,
      }}
      initial={{ scale: 0.8, y: 50, opacity: 0 }}
      animate={{
        scale: stackScale,
        y: stackOffset,
        opacity: 1,
      }}
      exit={{
        x: x.get() > 0 ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.2 }
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <span className="swipe-card-emoji">{card.emoji}</span>

      {isTop && (
        <>
          <motion.div className="swipe-card-stamp like" style={{ opacity: likeOpacity }}>
            LIKE
          </motion.div>
          <motion.div className="swipe-card-stamp nope" style={{ opacity: nopeOpacity }}>
            NOPE
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
