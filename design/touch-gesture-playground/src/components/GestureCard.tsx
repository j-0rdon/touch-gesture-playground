import { ReactNode } from 'react'
import './GestureCard.css'

interface GestureCardProps {
  title: string
  description: string
  icon: string
  children: ReactNode
}

export function GestureCard({ title, description, icon, children }: GestureCardProps) {
  return (
    <div className="gesture-card">
      <div className="gesture-card-header">
        <span className="gesture-card-icon">{icon}</span>
        <div className="gesture-card-info">
          <h2 className="gesture-card-title">{title}</h2>
          <p className="gesture-card-description">{description}</p>
        </div>
      </div>
      <div className="gesture-card-content">
        {children}
      </div>
    </div>
  )
}
