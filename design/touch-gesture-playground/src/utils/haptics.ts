export const haptics = {
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
  },
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20)
    }
  },
  heavy: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(30)
    }
  },
  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 50, 20])
    }
  },
  warning: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([20, 40, 20, 40, 20])
    }
  },
  error: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50])
    }
  }
}
