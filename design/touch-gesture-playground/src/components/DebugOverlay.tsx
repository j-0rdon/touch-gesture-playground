import type { GestureState } from '../App'
import './DebugOverlay.css'

interface DebugOverlayProps {
  gestureState: GestureState
}

export function DebugOverlay({ gestureState }: DebugOverlayProps) {
  return (
    <div className="debug-overlay">
      <div className="debug-header">
        <span className={`debug-status ${gestureState.active ? 'active' : ''}`} />
        <span className="debug-type">{gestureState.type}</span>
      </div>
      <div className="debug-details">
        {Object.entries(gestureState.details).map(([key, value]) => (
          <div key={key} className="debug-row">
            <span className="debug-key">{key}:</span>
            <span className="debug-value">
              {typeof value === 'number' ? value.toFixed(2) : String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
