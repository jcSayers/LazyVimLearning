import { ref, computed } from 'vue'

export interface GameState {
  currentMode: 'normal' | 'insert' | 'visual'
  commandBuffer: string
  editorContent: string
  cursorPosition: number
  selectedText: string
  feedback: string
  feedbackType: 'success' | 'error' | 'info'
  score: number
  completedChallenges: string[]
}

const gameState = ref<GameState>({
  currentMode: 'normal',
  commandBuffer: '',
  editorContent: '',
  cursorPosition: 0,
  selectedText: '',
  feedback: '',
  feedbackType: 'info',
  score: 0,
  completedChallenges: [],
})

export const useVimGame = () => {
  // Load saved progress from localStorage
  const loadProgress = () => {
    const saved = localStorage.getItem('vimGameProgress')
    if (saved) {
      const progress = JSON.parse(saved)
      gameState.value.completedChallenges = progress.completedChallenges || []
      gameState.value.score = progress.score || 0
    }
  }

  // Save progress to localStorage
  const saveProgress = () => {
    localStorage.setItem('vimGameProgress', JSON.stringify({
      completedChallenges: gameState.value.completedChallenges,
      score: gameState.value.score,
    }))
  }

  // Change mode
  const setMode = (mode: 'normal' | 'insert' | 'visual') => {
    gameState.value.currentMode = mode
  }

  // Reset command buffer
  const clearCommandBuffer = () => {
    gameState.value.commandBuffer = ''
  }

  // Add character to command buffer
  const addToCommandBuffer = (char: string) => {
    gameState.value.commandBuffer += char
  }

  // Show feedback
  const setFeedback = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    gameState.value.feedback = message
    gameState.value.feedbackType = type
  }

  // Mark challenge as complete
  const completeChallenge = (challengeId: string, pointsEarned: number = 100) => {
    if (!gameState.value.completedChallenges.includes(challengeId)) {
      gameState.value.completedChallenges.push(challengeId)
      gameState.value.score += pointsEarned
      saveProgress()
      return true
    }
    return false
  }

  // Get current mode display
  const modeDisplay = computed(() => {
    switch (gameState.value.currentMode) {
      case 'insert':
        return '-- INSERT --'
      case 'visual':
        return '-- VISUAL --'
      default:
        return ''
    }
  })

  // Check if challenge is completed
  const isChallengeCompleted = (challengeId: string) => {
    return gameState.value.completedChallenges.includes(challengeId)
  }

  // Get overall progress percentage
  const totalChallenges = ref(0)
  const progressPercentage = computed(() => {
    if (totalChallenges.value === 0) return 0
    return Math.round((gameState.value.completedChallenges.length / totalChallenges.value) * 100)
  })

  // Reset all progress
  const resetProgress = () => {
    gameState.value.completedChallenges = []
    gameState.value.score = 0
    localStorage.removeItem('vimGameProgress')
  }

  // Initialize
  loadProgress()

  return {
    gameState,
    setMode,
    clearCommandBuffer,
    addToCommandBuffer,
    setFeedback,
    completeChallenge,
    modeDisplay,
    isChallengeCompleted,
    progressPercentage,
    totalChallenges,
    resetProgress,
    saveProgress,
  }
}
