/**
 * iOS-Style Drag to Reorder Component
 * ====================================
 *
 * This component replicates the native iOS press-hold-lift-drag reorder interaction.
 *
 * KEY CONCEPTS:
 *
 * 1. GESTURE PHASES (following iOS pattern):
 *    - idle: No interaction
 *    - pressing: Finger down, waiting for hold threshold (400ms)
 *    - lifted: Held long enough, item elevates with shadow (finger still down)
 *    - dragging: Lifted item being moved
 *    - dropping: Finger released, item animating to final position
 *
 * 2. WHY RAW POINTER EVENTS (not useDrag/useGesture):
 *    Libraries like use-gesture conflate "pressing" with "dragging". The iOS pattern
 *    requires the item to "lift" WHILE the finger is still held down (before any
 *    movement). Raw pointer events give us precise control over each phase.
 *
 * 3. THE DROP SEQUENCE (critical for smooth animation):
 *    - User lifts finger → enter "dropping" phase
 *    - Calculate exact offset for dropped item to land at target slot
 *    - Keep other items shifted during drop animation (using finalTargetIndex)
 *    - After 180ms animation → reset all state and reorder array atomically
 *    - Items are already visually in correct positions, so no visual jump
 *
 * 4. PERFORMANCE OPTIMISATIONS:
 *    - React.memo() on DraggableItem to prevent unnecessary re-renders
 *    - Stable callback references (handlers receive itemId, not inline arrows)
 *    - CSS transforms instead of framer-motion (avoids spring animation conflicts)
 *    - Conditional CSS transitions (animate during drag, instant on idle)
 */

import { useState, useRef, useCallback, useEffect, memo } from 'react'
import { haptics } from '../utils/haptics'
import type { GestureState } from '../App'
import './DragToReorder.css'

interface DragToReorderProps {
  onGestureUpdate: (state: GestureState) => void
}

const INITIAL_ITEMS = [
  { id: 1, label: 'First Item', color: '#6366f1' },
  { id: 2, label: 'Second Item', color: '#8b5cf6' },
  { id: 3, label: 'Third Item', color: '#ec4899' },
  { id: 4, label: 'Fourth Item', color: '#14b8a6' },
]

// Layout constants - must match CSS
const ITEM_HEIGHT = 44
const GAP = 8
const HOLD_DELAY_MS = 400 // Time finger must be held before item "lifts"

/**
 * Drag phases following iOS pattern:
 * - idle: no interaction
 * - pressing: finger down, waiting for hold threshold
 * - lifted: held long enough, item is elevated (finger still down)
 * - dragging: lifted + finger moving
 * - dropping: finger released, animating to final position
 */
type DragPhase = 'idle' | 'pressing' | 'lifted' | 'dragging' | 'dropping'

// Debug logging - set to true to diagnose gesture issues
const DEBUG = false
const log = (phase: string, message: string, data?: Record<string, unknown>) => {
  if (!DEBUG) return
  const timestamp = new Date().toISOString().split('T')[1].slice(0, -1)
  const dataStr = data ? ` | ${JSON.stringify(data)}` : ''
  console.log(`[${timestamp}] [DragReorder:${phase}] ${message}${dataStr}`)
}

/**
 * Parent container managing the list state and coordinating drag operations.
 *
 * State:
 * - items: The ordered list of items
 * - activeId: Which item is currently being dragged (null if none)
 * - phase: Current gesture phase
 * - dragOffset: Y offset in pixels from item's original position
 * - finalTargetIndex: Stored during "dropping" phase so other items stay shifted
 */
export function DragToReorder({ onGestureUpdate }: DragToReorderProps) {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [phase, setPhase] = useState<DragPhase>('idle')
  const [dragOffset, setDragOffset] = useState(0)
  const [finalTargetIndex, setFinalTargetIndex] = useState<number | null>(null)

  // Track pending drop timeout so we can cancel if user starts new gesture
  const dropTimeoutRef = useRef<number | null>(null)

  /**
   * Calculate which index an item would land at based on its drag offset.
   * Uses the item height + gap to determine slot boundaries.
   */
  const getTargetIndex = useCallback((currentIndex: number, offsetY: number): number => {
    const rawIndex = currentIndex + Math.round(offsetY / (ITEM_HEIGHT + GAP))
    return Math.max(0, Math.min(items.length - 1, rawIndex))
  }, [items.length])

  /**
   * Complete the reorder operation when user releases the dragged item.
   *
   * This is the most complex part - the sequence is critical:
   *
   * 1. Enter "dropping" phase with calculated drop offset
   *    - Dropped item animates to its target slot position
   *    - Other items stay shifted (using finalTargetIndex)
   *
   * 2. After animation (180ms), atomically:
   *    - Reset all drag state to idle
   *    - Reorder the items array
   *    - Because items were visually in correct positions, no jump occurs
   */
  const completeReorder = useCallback((itemId: number, finalOffset: number) => {
    // Cancel any pending drop timeout (prevents race conditions)
    if (dropTimeoutRef.current !== null) {
      clearTimeout(dropTimeoutRef.current)
      dropTimeoutRef.current = null
    }

    const currentIndex = items.findIndex(item => item.id === itemId)
    const newIndex = getTargetIndex(currentIndex, finalOffset)

    log('COMPLETE', '>>> Starting reorder completion', {
      itemId, currentIndex, newIndex, finalOffset,
      willMove: currentIndex !== newIndex
    })

    // STEP 1: Enter dropping phase
    // Store finalTargetIndex so other items know to stay shifted
    log('COMPLETE', '>>> Step 1: Entering dropping phase')
    setFinalTargetIndex(newIndex)
    setPhase('dropping')

    // Calculate exact offset for dropped item to land at target slot
    // This creates the smooth "snap to position" animation
    const dropOffset = (newIndex - currentIndex) * (ITEM_HEIGHT + GAP)
    setDragOffset(dropOffset)

    // Store reorder info to avoid stale closure in timeout
    const reorderInfo = { itemId, currentIndex, newIndex }

    // STEP 2: After drop animation completes, reset and reorder
    dropTimeoutRef.current = window.setTimeout(() => {
      dropTimeoutRef.current = null
      log('COMPLETE', '>>> Step 2: Resetting and reordering')

      // Batch all state updates - React handles this atomically
      setActiveId(null)
      setPhase('idle')
      setFinalTargetIndex(null)
      setDragOffset(0)

      // Reorder items using functional update to get latest state
      if (reorderInfo.currentIndex !== reorderInfo.newIndex) {
        setItems(prevItems => {
          // Re-find item by ID in case array changed
          const actualCurrentIndex = prevItems.findIndex(item => item.id === reorderInfo.itemId)
          if (actualCurrentIndex === -1) return prevItems

          const newItems = [...prevItems]
          const [removed] = newItems.splice(actualCurrentIndex, 1)
          const insertIndex = Math.min(reorderInfo.newIndex, newItems.length)
          newItems.splice(insertIndex, 0, removed)
          log('COMPLETE', 'Items reordered', { newOrder: newItems.map(i => i.id) })
          return newItems
        })
        haptics.medium()
      }
    }, 180) // Match CSS transition duration

    onGestureUpdate({
      type: 'drag-reorder',
      active: false,
      details: { phase: 'complete', fromIndex: currentIndex, toIndex: newIndex }
    })
  }, [items, getTargetIndex, onGestureUpdate])

  /**
   * Handle phase transitions from child items.
   * Centralises state management in the parent component.
   */
  const handlePhaseChange = useCallback((itemId: number, newPhase: DragPhase) => {
    log('PHASE', `Phase transition: ${phase} → ${newPhase}`, { itemId, activeId })

    if (newPhase === 'pressing') {
      setActiveId(itemId)
      setPhase('pressing')
      haptics.light()
      onGestureUpdate({
        type: 'drag-reorder',
        active: true,
        details: { phase: 'pressing', itemId }
      })
    } else if (newPhase === 'lifted') {
      setPhase('lifted')
      haptics.medium()
      onGestureUpdate({
        type: 'drag-reorder',
        active: true,
        details: { phase: 'lifted', itemId }
      })
    } else if (newPhase === 'dragging') {
      setPhase('dragging')
      onGestureUpdate({
        type: 'drag-reorder',
        active: true,
        details: { phase: 'dragging', itemId }
      })
    } else if (newPhase === 'idle') {
      // Gesture was cancelled (e.g., moved before lift threshold)
      onGestureUpdate({
        type: 'drag-reorder',
        active: false,
        details: { phase: 'cancelled' }
      })
      setActiveId(null)
      setPhase('idle')
      setDragOffset(0)
    }
  }, [phase, activeId, onGestureUpdate])

  /**
   * Handle drag movement - update offset and notify parent.
   */
  const handleDragMove = useCallback((itemId: number, offsetY: number) => {
    setDragOffset(offsetY)
    const currentIndex = items.findIndex(item => item.id === itemId)
    const targetIndex = getTargetIndex(currentIndex, offsetY)

    onGestureUpdate({
      type: 'drag-reorder',
      active: true,
      details: {
        phase: 'dragging',
        itemId,
        fromIndex: currentIndex,
        toIndex: targetIndex,
        offsetY: Math.round(offsetY)
      }
    })
  }, [items, getTargetIndex, onGestureUpdate])

  /**
   * Handle drag end - trigger the complete reorder sequence.
   */
  const handleDragEnd = useCallback((itemId: number, finalOffset: number) => {
    log('END', 'Drag ended', { itemId, finalOffset, phase })
    completeReorder(itemId, finalOffset)
  }, [completeReorder, phase])

  // Calculate values needed for item shifting
  const activeDraggedIndex = activeId !== null ? items.findIndex(i => i.id === activeId) : null

  // During dropping phase, use stored finalTargetIndex so items stay shifted
  // Otherwise calculate from current dragOffset
  const targetIndex = finalTargetIndex !== null
    ? finalTargetIndex
    : (activeDraggedIndex !== null ? getTargetIndex(activeDraggedIndex, dragOffset) : null)

  return (
    <div className="drag-reorder-container">
      <div className="drag-reorder-list">
        {items.map((item, index) => (
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            isActive={activeId === item.id}
            globalPhase={phase}
            dragOffset={activeId === item.id ? dragOffset : 0}
            // Pass stable callback references (not inline arrows) for memo to work
            onPhaseChange={handlePhaseChange}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            activeDraggedIndex={activeDraggedIndex}
            targetIndex={targetIndex}
            totalItems={items.length}
          />
        ))}
      </div>
    </div>
  )
}

interface DraggableItemProps {
  item: { id: number; label: string; color: string }
  index: number
  isActive: boolean
  globalPhase: DragPhase
  dragOffset: number
  onPhaseChange: (itemId: number, phase: DragPhase) => void
  onDragMove: (itemId: number, offsetY: number) => void
  onDragEnd: (itemId: number, finalOffset: number) => void
  activeDraggedIndex: number | null
  targetIndex: number | null
  totalItems: number
}

/**
 * Individual draggable item component.
 *
 * Uses raw Pointer Events for precise gesture control:
 * - pointerdown: Start hold timer
 * - pointermove: Track movement, cancel if moved before lift
 * - pointerup: Complete or cancel gesture
 * - pointercancel: Handle interruptions
 *
 * Wrapped in React.memo() to prevent re-renders when props haven't changed.
 * This is critical for preventing label flickering during drag.
 */
const DraggableItem = memo(function DraggableItem({
  item,
  index,
  isActive,
  globalPhase,
  dragOffset,
  onPhaseChange,
  onDragMove,
  onDragEnd,
  activeDraggedIndex,
  targetIndex,
}: DraggableItemProps) {
  // Refs for tracking gesture state (don't trigger re-renders)
  const holdTimerRef = useRef<number | null>(null)
  const phaseRef = useRef<DragPhase>('idle')        // Local phase tracking
  const startYRef = useRef<number>(0)               // Y position at gesture start
  const currentYRef = useRef<number>(0)             // Current Y position
  const pointerIdRef = useRef<number | null>(null)  // Track which pointer we're following
  const elementRef = useRef<HTMLDivElement>(null)   // DOM element reference

  const clearHoldTimer = useCallback(() => {
    if (holdTimerRef.current !== null) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
  }, [])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearHoldTimer()
  }, [clearHoldTimer])

  /**
   * POINTER DOWN: Start the hold timer for lift.
   *
   * iOS behaviour: finger touches down, slight visual feedback,
   * then after holding for HOLD_DELAY_MS the item "lifts" off the surface.
   */
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Block if another item is active or we're in dropping phase
    if ((globalPhase !== 'idle' && !isActive) || globalPhase === 'dropping') {
      log('DOWN', `Blocked - phase is ${globalPhase}`, { itemId: item.id })
      return
    }

    // Capture pointer to receive events even if finger moves outside element
    e.currentTarget.setPointerCapture(e.pointerId)
    pointerIdRef.current = e.pointerId
    startYRef.current = e.clientY
    currentYRef.current = e.clientY
    phaseRef.current = 'pressing'

    log('DOWN', `Pointer down on item ${item.id}`)
    onPhaseChange(item.id, 'pressing')

    // Start hold timer - if held long enough, item will "lift"
    clearHoldTimer()
    holdTimerRef.current = window.setTimeout(() => {
      if (phaseRef.current === 'pressing') {
        log('TIMER', `Hold threshold - LIFTING item ${item.id}`)
        phaseRef.current = 'lifted'
        onPhaseChange(item.id, 'lifted')
      }
    }, HOLD_DELAY_MS)

    e.preventDefault()
  }, [globalPhase, isActive, item.id, onPhaseChange, clearHoldTimer])

  /**
   * POINTER MOVE: Track movement during drag.
   *
   * Key behaviours:
   * - If still "pressing" and moved >10px, cancel (user probably wants to scroll)
   * - If "lifted", transition to "dragging" on first movement
   * - If "dragging", report offset to parent
   */
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerId !== pointerIdRef.current) return

    currentYRef.current = e.clientY
    const offsetY = currentYRef.current - startYRef.current
    const absOffset = Math.abs(offsetY)

    // If still pressing (not yet lifted), movement cancels the gesture
    // This allows normal scrolling if user didn't intend to drag
    if (phaseRef.current === 'pressing') {
      if (absOffset > 10) {
        log('MOVE', `Movement cancelled gesture for item ${item.id}`)
        clearHoldTimer()
        phaseRef.current = 'idle'
        onPhaseChange(item.id, 'idle')
        if (elementRef.current) {
          elementRef.current.releasePointerCapture(e.pointerId)
        }
        pointerIdRef.current = null
      }
      return
    }

    // Transition from lifted to dragging on first movement
    if (phaseRef.current === 'lifted') {
      phaseRef.current = 'dragging'
      onPhaseChange(item.id, 'dragging')
    }

    // Report drag offset to parent
    if (phaseRef.current === 'dragging') {
      onDragMove(item.id, offsetY)
    }

    e.preventDefault()
  }, [item.id, onPhaseChange, onDragMove, clearHoldTimer])

  /**
   * POINTER UP: Complete or cancel the gesture.
   *
   * - If was "dragging" → complete reorder at final offset
   * - If was "lifted" but didn't move → drop in place (offset 0)
   * - If was still "pressing" → just a tap, cancel
   */
  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (e.pointerId !== pointerIdRef.current) return

    clearHoldTimer()

    const finalPhase = phaseRef.current
    const finalOffset = currentYRef.current - startYRef.current

    log('UP', `Pointer up on item ${item.id}`, { finalPhase, finalOffset })

    if (elementRef.current) {
      elementRef.current.releasePointerCapture(e.pointerId)
    }
    pointerIdRef.current = null

    if (finalPhase === 'dragging') {
      phaseRef.current = 'idle'
      onDragEnd(item.id, finalOffset)
    } else if (finalPhase === 'lifted') {
      // Lifted but didn't move - drop in place
      phaseRef.current = 'idle'
      onDragEnd(item.id, 0)
    } else {
      // Was just a tap, cancel
      phaseRef.current = 'idle'
      onPhaseChange(item.id, 'idle')
    }

    e.preventDefault()
  }, [item.id, clearHoldTimer, onDragEnd, onPhaseChange])

  /**
   * POINTER CANCEL: Gesture was interrupted (e.g., system gesture, alert).
   */
  const handlePointerCancel = useCallback((e: React.PointerEvent) => {
    if (e.pointerId !== pointerIdRef.current) return

    log('CANCEL', `Pointer cancelled for item ${item.id}`)
    clearHoldTimer()
    phaseRef.current = 'idle'
    pointerIdRef.current = null
    onPhaseChange(item.id, 'idle')
  }, [item.id, clearHoldTimer, onPhaseChange])

  // ============================================
  // VISUAL STATE CALCULATIONS
  // ============================================

  // This item's visual phase (non-active items are always "idle" visually)
  const itemPhase = isActive ? globalPhase : 'idle'
  const isLifted = itemPhase === 'lifted' || itemPhase === 'dragging'
  const isDropping = itemPhase === 'dropping'

  // Include 'dropping' so non-active items stay shifted during drop animation
  const isDragging = globalPhase === 'lifted' || globalPhase === 'dragging' || globalPhase === 'dropping'

  /**
   * Calculate Y translation for this item.
   *
   * - Active/dropping item: follows dragOffset
   * - Non-active items: shift up/down to make room for dragged item
   */
  let translateY = 0
  if (isLifted || isDropping) {
    translateY = dragOffset
  } else if (activeDraggedIndex !== null && targetIndex !== null && isDragging) {
    // Shift logic: items between original and target positions need to move
    if (activeDraggedIndex < index && targetIndex >= index) {
      // Dragged item moving DOWN past this item → shift UP
      translateY = -(ITEM_HEIGHT + GAP)
    } else if (activeDraggedIndex > index && targetIndex <= index) {
      // Dragged item moving UP past this item → shift DOWN
      translateY = ITEM_HEIGHT + GAP
    }
  }

  // Scale: slight shrink on press, enlarge when lifted
  let scale = 1
  if (itemPhase === 'pressing') {
    scale = 0.99  // Subtle press feedback
  } else if (isLifted) {
    scale = 1.03  // Lifted appearance
  }

  const transform = `translateY(${translateY}px) scale(${scale})`

  // Only animate during active drag/drop (CSS handles this via .animate class)
  // Non-active items snap instantly on idle to prevent visual glitches
  const shouldAnimate = isActive || isDragging || isDropping

  return (
    <div
      ref={elementRef}
      className={`drag-item no-select ${itemPhase} ${isLifted ? 'is-lifted' : ''} ${isDropping ? 'is-dropping' : ''} ${shouldAnimate ? 'animate' : ''}`}
      style={{
        '--item-color': item.color,
        '--translate-y': `${translateY}px`,
        '--scale': scale,
        transform,
        zIndex: isLifted ? 100 : 1,
      } as React.CSSProperties}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <div className="drag-item-handle">
        <span>⋮⋮</span>
      </div>
      <span className="drag-item-label">{item.label}</span>
      <div className="drag-item-indicator" />
    </div>
  )
})
