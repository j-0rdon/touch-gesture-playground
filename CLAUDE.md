# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fox is a workspace containing design prototypes and product research materials. The main active project is a touch gesture playground - a React PWA demonstrating native-feeling touch interactions for tablet devices.

## Development Commands

All commands should be run from the `design/touch-gesture-playground` directory:

```bash
npm run dev      # Start Vite dev server
npm run build    # TypeScript build + Vite production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

### Touch Gesture Playground (`design/touch-gesture-playground/`)

A React 19 + TypeScript + Vite application demonstrating various touch gestures:

- **Key Libraries**: `@use-gesture/react` for gesture detection, `framer-motion` for animations, `@floating-ui/react-dom` for positioning
- **PWA Support**: Configured via `vite-plugin-pwa` for standalone mobile/tablet experience

**Component Structure** (`src/components/`):
- Each gesture demo is a self-contained component with its own CSS file
- Components receive an `onGestureUpdate` callback prop to report gesture state to the parent
- `GestureCard` wraps each demo with consistent styling
- `DebugOverlay` displays real-time gesture state for development

**Gesture Components**:
- `PressAndHold` / `PressHoldMenu` - Long press interactions with radial progress and context menus
- `SwipeCards` - Tinder-style card swiping
- `DragToReorder` - List reordering via drag
- `PinchToZoom` - Two-finger zoom and pan
- `PullToRefresh` - Pull-down refresh gesture
- `EdgeSwipePanel` / `RightSidebar` - Edge-swipe navigation panels
- `TwoFingerRotate` - Rotation gesture
- `ModalExample` - Draggable bottom sheet modal

**Utilities** (`src/utils/`):
- `haptics.ts` - Browser vibration API wrapper with preset patterns (light, medium, heavy, success, warning, error)

### Product Research (`product/research/`)

Contains strategic planning and research documents (non-code assets).
