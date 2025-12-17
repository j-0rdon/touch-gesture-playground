import { useState } from 'react'
import { GestureCard } from './components/GestureCard'
import { PressAndHold } from './components/PressAndHold'
import { PressHoldMenu } from './components/PressHoldMenu'
import { SwipeCards } from './components/SwipeCards'
import { DragToReorder } from './components/DragToReorder'
import { PinchToZoom } from './components/PinchToZoom'
import { PullToRefresh } from './components/PullToRefresh'
import { EdgeSwipePanel } from './components/EdgeSwipePanel'
import { RightSidebar } from './components/RightSidebar'
import { TwoFingerRotate } from './components/TwoFingerRotate'
import { ModalExample } from './components/ModalExample'
import { DebugOverlay } from './components/DebugOverlay'
import './App.css'

export interface GestureState {
  type: string
  active: boolean
  details: Record<string, unknown>
}

function App() {
  const [gestureState, setGestureState] = useState<GestureState>({
    type: 'none',
    active: false,
    details: {}
  })
  const [showDebug, setShowDebug] = useState(true)
  const [leftPanelOpen, setLeftPanelOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)

  const updateGestureState = (state: GestureState) => {
    setGestureState(state)
  }

  return (
    <div className="app">
      <EdgeSwipePanel isOpen={leftPanelOpen} onOpenChange={setLeftPanelOpen} />
      <RightSidebar isOpen={rightPanelOpen} onOpenChange={setRightPanelOpen} />

      <header className="header">
        <h1>Touch Gesture Playground</h1>
        <p className="subtitle">Experiment with native-feeling touch interactions</p>
        <button
          className="debug-toggle"
          onClick={() => setShowDebug(!showDebug)}
        >
          {showDebug ? 'Hide' : 'Show'} Debug
        </button>
      </header>

      <main className="gesture-grid">
        <GestureCard
          title="Press & Hold"
          description="Hold for 500ms to trigger action with radial progress"
          icon="👆"
        >
          <PressAndHold onGestureUpdate={updateGestureState} />
        </GestureCard>

        <GestureCard
          title="Context Menu"
          description="Long press to reveal a popover menu"
          icon="📋"
        >
          <PressHoldMenu onGestureUpdate={updateGestureState} />
        </GestureCard>

        <GestureCard
          title="Swipe Cards"
          description="Swipe left or right to dismiss cards"
          icon="👈👉"
        >
          <SwipeCards onGestureUpdate={updateGestureState} />
        </GestureCard>

        <GestureCard
          title="Drag to Reorder"
          description="Drag items to rearrange the list"
          icon="↕️"
        >
          <DragToReorder onGestureUpdate={updateGestureState} />
        </GestureCard>

        <GestureCard
          title="Pinch to Zoom"
          description="Use two fingers to zoom and pan"
          icon="🔍"
        >
          <PinchToZoom onGestureUpdate={updateGestureState} />
        </GestureCard>

        <GestureCard
          title="Pull to Refresh"
          description="Pull down to refresh content"
          icon="🔄"
        >
          <PullToRefresh onGestureUpdate={updateGestureState} />
        </GestureCard>

        <GestureCard
          title="Bottom Sheet Modal"
          description="Drag down to dismiss the modal"
          icon="📑"
        >
          <ModalExample onGestureUpdate={updateGestureState} />
        </GestureCard>

        <GestureCard
          title="Two-Finger Rotate"
          description="Use two fingers to rotate the element"
          icon="🔃"
        >
          <TwoFingerRotate onGestureUpdate={updateGestureState} />
        </GestureCard>
      </main>

      <footer className="footer">
        <p>Swipe from edges to reveal side panels (left & right)</p>
        <p className="hint">Best experienced on tablet devices</p>
      </footer>

      {showDebug && <DebugOverlay gestureState={gestureState} />}
    </div>
  )
}

export default App
